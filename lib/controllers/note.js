var NoteController = module.exports = {};
var Mock = require('../mocks/note');
NoteController.index = function*() {
	// var notes = yield this.managers.note.queryByPagination();
    // yield this.render('note/list',{
    // 	notes
    // });
    this.body = {
    	success:true,
    	value:{
    		items:Mock.listData
    	}
    }
}



NoteController.add = function*(){
	yield this.render('note/add',{
		csrf:this.csrf
	});
}

NoteController.create = function*(){
	var reqBody = this.request.body;
	var res = yield this.managers.note.create({
		title:reqBody.title,
		content:reqBody.content
	});
	this.body = res;
}
