// models/Produto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a instância do Sequelize que configuramos

const Produto = sequelize.define('Produto', {
    // Define os atributos do modelo (colunas da tabela)
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false // O nome não pode ser nulo
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL(10, 2) para números com 2 casas decimais (ex: 123.45)
        allowNull: false // O preço não pode ser nulo
    }
}, {
    // Opções adicionais do modelo
    tableName: 'produtos', // Nome da tabela no banco de dados (o Sequelize pluraliza por padrão, mas é bom ser explícito)
    timestamps: true // Adiciona automaticamente as colunas createdAt e updatedAt
});

module.exports = Produto; // Exporta o modelo Produto