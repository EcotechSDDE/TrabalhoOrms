// server.js

const express = require('express');
const bodyParser = require('body-parser'); // Middleware para processar dados de formulário
const path = require('path'); // Módulo nativo do Node.js para lidar com caminhos de arquivos

// Importa o modelo Produto
const Produto = require('./models/Produto');

// Importa a instância do Sequelize para testar a conexão
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a variável de ambiente ou 3000

// --- Configurações do Express ---

// Configura o EJS como motor de template
app.set('view engine', 'ejs');
// Define o diretório onde as views EJS estão localizadas
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados de formulários HTML (URLEncoded)
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta 'public' (CSS, JS do cliente, imagens, etc.)
// Ainda não temos essa pasta, mas já deixaremos configurado.
app.use(express.static(path.join(__dirname, 'public')));

// --- Rotas da Aplicação ---

// Rota HOME (Listar Produtos)
app.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll(); // Busca todos os produtos no banco de dados
        res.render('index', { produtos: produtos }); // Renderiza a view 'index.ejs' e passa os produtos
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao carregar a página inicial.');
    }
});

// Rota para exibir o formulário de cadastro de novo produto
app.get('/produtos/novo', (req, res) => {
    res.render('novo_produto'); // Renderiza a view 'novo_produto.ejs'
});

// Rota para cadastrar um novo produto (POST)
app.post('/produtos', async (req, res) => {
    try {
        const { nome, preco } = req.body; // Pega 'nome' e 'preco' do corpo da requisição
        await Produto.create({ nome, preco }); // Cria um novo produto no banco de dados
        res.redirect('/'); // Redireciona para a página inicial (lista de produtos)
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).send('Erro ao cadastrar o produto.');
    }
});

// Rota para exibir o formulário de edição de produto
app.get('/produtos/editar/:id', async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do produto da URL
        const produto = await Produto.findByPk(id); // Busca o produto pelo ID
        if (produto) {
            res.render('editar_produto', { produto: produto }); // Renderiza a view e passa o produto
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar produto para edição:', error);
        res.status(500).send('Erro ao carregar a página de edição.');
    }
});

// Rota para atualizar um produto (PUT/POST, geralmente POST com método _method para PUT)
// Por simplicidade, vamos usar POST e simular um PUT.
app.post('/produtos/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco } = req.body;
        const produto = await Produto.findByPk(id);
        if (produto) {
            // Atualiza os campos do produto
            produto.nome = nome;
            produto.preco = preco;
            await produto.save(); // Salva as alterações no banco de dados
            res.redirect('/'); // Redireciona para a página inicial
        } else {
            res.status(404).send('Produto não encontrado para atualização.');
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro ao atualizar o produto.');
    }
});

// Rota para excluir um produto (POST/DELETE, geralmente POST com método _method para DELETE)
// Por simplicidade, vamos usar POST e simular um DELETE.
app.post('/produtos/excluir/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (produto) {
            await produto.destroy(); // Exclui o produto do banco de dados
            res.redirect('/'); // Redireciona para a página inicial
        } else {
            res.status(404).send('Produto não encontrado para exclusão.');
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).send('Erro ao excluir o produto.');
    }
});


// --- Inicialização do Servidor ---

// Sincroniza o modelo com o banco de dados e inicia o servidor
// O { force: false } significa que não vamos recriar a tabela se ela já existir.
// Se fosse { force: true }, ele droparia a tabela e a criaria novamente (útil para desenvolvimento).
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco de dados:', err);
    });