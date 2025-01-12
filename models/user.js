const Sequelize = require('sequelize');
const { associate } = require('./pet');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(35),
                allowNull: false
            }
        },{
            sequelize,
            timestamps: false,
            paranode: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.User.hasMany(db.Pet, {foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade'})
    }
};



