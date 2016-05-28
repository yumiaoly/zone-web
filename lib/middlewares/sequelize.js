var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cfg = require('../config/config').dbConfig;
module.exports = function(config) {
    return function*(next) {
        if (!this.sequelize) {
            this.sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);
            this.daos = {};
            if (config.modelDir) {
                var models = fs.readdirSync(config.modelDir);
                _.each(models, (fileName) => {
                    var modelName = fileName.replace('.js', '');
                    this.daos[modelName] = require(path.join(config.modelDir, modelName))(this.sequelize);
                });
            }
        }
        yield next;
    }
}
