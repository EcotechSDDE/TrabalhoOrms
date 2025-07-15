// config/database.js

const { Sequelize } = require("sequelize");

// Cria uma nova instância do Sequelize
const sequelize = new Sequelize("trabalhoorms_db", "root", "Gabriel07!", {
  host: "localhost",
  dialect: "mysql", // Especifica o dialeto do banco de dados
  port: 3306, // Porta padrão do MySQL
  logging: false, // Defina como true para ver as queries SQL no console
  dialectOptions: {
    decimalNumbers: true, // Força o retorno de números decimais como números JavaScript em vez de strings
  },
});

// Testa a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

// Chama a função de teste
testConnection();

module.exports = sequelize; // Exporta a instância do sequelize para uso em outros arquivos
