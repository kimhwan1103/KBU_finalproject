const Sequelize = require('sequelize');

module.exports = class Pet extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        petKind: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        petName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        petAge: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        petWeight: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Pet',
      tableName: 'pet',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Pet.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
