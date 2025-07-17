const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
});

const Perfil = sequelize.define('Perfil', {
  bio: DataTypes.TEXT,
});

const Produto = sequelize.define('Produto', {
  nome: DataTypes.STRING,
});

const Aluno = sequelize.define('Aluno', { nome: DataTypes.STRING });
const Curso = sequelize.define('Curso', { titulo: DataTypes.STRING });

Usuario.hasOne(Perfil);
Perfil.belongsTo(Usuario);

Usuario.hasMany(Produto);
Produto.belongsTo(Usuario);

Aluno.belongsToMany(Curso, { through: 'AlunoCurso' });
Curso.belongsToMany(Aluno, { through: 'AlunoCurso' });

(async () => {
  await sequelize.sync({ force: true });
  console.log("Banco sincronizado com sucesso!");
})();