const Sequelize = require('sequelize');
const { associate } = require('./pet');

module.exports = class PetMedicine extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            medicineName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            medicineDate: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'PetMedicine',
            timestamps: false,                
            tableName: 'petmedicine',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.PetMedicine.belongsTo(db.Pet, { foreignKey: 'petId', targetKey: 'id' });
    }
}
