
var IndexController = require('../controllers/index');
module.exports = function(router) {
    router.get('/', IndexController.index);
    router.get('/login', IndexController.login);
    router.get('/regist', IndexController.regist);
    
    router.post('/login', IndexController.doLogin);
    router.post('/logout', IndexController.doLogout);
    router.post('/regist', IndexController.doRegist);
}
