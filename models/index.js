const Sequelize = require('sequelize');
const User = require('./user');
const Pet = require('./pet');
const PetWalk = require('./petWalk');
// const PetMedicine = require('./petMedicine');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize; //첫번째 코드 모듈 자체를 전달

db.User = User;
db.Pet = Pet;
// db.PetWalk = PetWalk;
// db.PetMedicine = PetMedicine;

User.init(sequelize);
Pet.init(sequelize);
// PetWalk.init(sequelize);
// PetMedicine.init(sequelize);

User.associate(db);
Pet.associate(db);
// PetWalk.associate(db);
// PetMedicine.associate(db);


module.exports = db;