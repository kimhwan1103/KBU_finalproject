// const Sequelize = require('sequelize');

// module.exports = class PetWalk extends Sequelize.Model {
//     static init(sequelize) {
//       return super.init({
//           petKind: {
//               type: Sequelize.STRING(10),
//               allowNull: false,
//           },
//           petName: {
//               type: Sequelize.STRING(20),
//               allowNull: false
//           },
//           petAge: {
//               type: Sequelize.INTEGER,
//               allowNull: false
//           },
//           petWeight: {
//               type: Sequelize.FLOAT,
//               allowNull: false
//           }
//       }, {
//         sequelize,
//         timestamps: false,
//         modelName: 'PetWalk',
//         tableName: 'petwalk',
//         paranoid: false,
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//       });
//     }

