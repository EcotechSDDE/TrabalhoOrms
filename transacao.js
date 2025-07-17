const { sequelize } = require('./models');

// Importe os modelos necessários
const Usuario = sequelize.models.Usuario;
const Pedido = sequelize.models.Pedido;

async function realizarOperacoes() {
  const t = await sequelize.transaction();

  try {
    await Usuario.create({ nome: 'João' }, { transaction: t });
    await Pedido.create({ usuarioId: 1, total: 100 }, { transaction: t });

    await t.commit();
    console.log('Transação concluída com sucesso!');
  } catch (error) {
    await t.rollback();
    console.error('Erro na transação:', error);
  }
}

realizarOperacoes();

// node transacao.js