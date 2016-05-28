var Sequelize = require('sequelize');
module.exports = function(sequelize) {
    return sequelize.define('note', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        content:{
            type: Sequelize.STRING
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
        tableName:'tbl_note',
        createdAt:'gmtCreate',
        updatedAt:'gmtModified'
    });
}
