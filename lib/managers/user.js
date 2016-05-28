var md5 = require('md5');
var UserManager = module.exports = {};

UserManager.regist = function*(user) {
	if(!user.account) {
		this.throw('账户不能为空!');
	}
	if(!user.password) {
		this.throw('密码不能为空!');
	}
	var exist = yield this.daos.user.findOne({
		where:{
			account:user.account
		}
	});
	if(exist) this.throw('注册失败，该用户已存在！');
	// md5
	user.password = md5(user.password);
	user.isOnline = -1;
    return yield this.daos.user.create(user);
}

// 登录
UserManager.login = function*(user) {
	if(!user.account) {
		this.throw('账户不能为空!');
	}
	if(!user.password) {
		this.throw('密码不能为空!');
	}
	var user = yield this.daos.user.findOne({
		where:{
			account:user.account,
			password:md5(user.password)
		}
	});
	if(!user) return;
	yield this.daos.user.update({isOnline:1},{
		where:{
			id:user.id
		}
	})
	return this.session.user = user;
}

// 注销
UserManager.logout = function*(user) {
	this.session.user = null;
	return yield this.daos.user.update({isOnline:-1},{
		where:{
			id:user.id
		}
	});
}

// 获取在线用户列表
UserManager.getOnlineUsers = function*(){
	return yield this.daos.user.findAll({
		where:{
			isOnline:1
		}
	})
}
