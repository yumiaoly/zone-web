var IndexController = module.exports = {};

IndexController.index = function*(){
	yield this.render('index/index');
	// if(!this.session.user){
	// 	this.redirect('/login');
	// }
	// var onLineUsers = yield this.managers.user.getOnlineUsers();
	// yield this.render('index/index',{user:this.session.user,onLineUsers:onLineUsers});
}

IndexController.login = function*() {
    yield this.render('index/login',{});
}


IndexController.doLogin = function*(){
	var reqBody = this.request.body;
	var user = yield this.managers.user.login({
		account:reqBody.account,
		password:reqBody.password
	});
	if(user){
		this.redirect('/');
	}else{
		this.throw('账号不存在或密码错误');
	}
}

IndexController.doLogout = function*(){
	if(!this.session.user) {
		this.throw('操作失败，该用户已注销');
	}
	var rs = yield this.managers.user.logout(this.session.user);
	this.redirect('/login');
}


IndexController.regist = function*(){
	yield this.render('index/regist',{});
}	

// 注册
IndexController.doRegist = function*(){
	var reqBody = this.request.body;
	var rs = yield this.managers.user.regist({
		account:reqBody.account,
		name:reqBody.name,
		password:reqBody.password,
		nick:reqBody.nick
	});
	if(rs){
		this.redirect('/login');
	}else{
		this.throw('系统异常，注册失败');
	}
}	
