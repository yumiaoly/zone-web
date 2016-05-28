var fs = require('fs');
var path = require('path');
var _ = require('lodash');
module.exports = (config) => {
    return function*(next) {
        if (!this.managers) {
            this.managers = {};
            if(config.managerDir){
                var managers = fs.readdirSync(config.managerDir);
                _.each(managers, (fileName) => {
                    var name = fileName.replace('.js', '');
                    var manager = require(path.join(config.managerDir, name));
                    this.managers[name] = {};
                    _.mapKeys(manager,(fn,fnName) => {
                        this.managers[name][fnName] = fn.bind(this);
                    });
                    
                });
            }
            
        }
        yield next;
    }
}
