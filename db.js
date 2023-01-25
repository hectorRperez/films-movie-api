const Sequelize = require('sequelize');

const FilmModel = require('./models/films');
const UserModel = require('./models/user')

const sequelize = new Sequelize('peliculas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => { console.log('Tablas sincronizadas'); })

module.exports = {
    Film,
    User
}