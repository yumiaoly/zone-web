var NoteManager = module.exports = {};

NoteManager.queryByPagination = function*() {
    return yield this.daos.note.findAll();
}

NoteManager.create = function*(note) {
    return yield this.daos.note.create(note);
}
