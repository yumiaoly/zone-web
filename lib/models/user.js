var Sequelize = require('sequelize');
module.exports = function(sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nick: {
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        },
        account:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        isOnline:{
            type: Sequelize.INTEGER,
            field:'is_online'
        },
        gmtModified:{
            type: Sequelize.DATE,
            field:'gmt_modified'
        },
        gmtCreate:{
            type: Sequelize.DATE,
            field:'gmt_create'
        }
    },{
        freezeTableName:true,
        tableName:'tbl_user',
        createdAt:'gmtCreate',
        updatedAt:'gmtModified'
    });
}
