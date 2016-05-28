
var NoteController = require('../controllers/note');
module.exports = function(router) {
    router.get('/notes/', NoteController.index);
    router.get('/notes/add', NoteController.add);
    router.post('/notes/create', NoteController.create);
}
