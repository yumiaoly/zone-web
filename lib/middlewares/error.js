module.exports = function*(next) {
    try {
        yield * next;
    } catch (e) {
        var status = e.status || 500;
        var message = e.message || '服务器错误';
        this.body = {
            'status': status,
            'message': message
        };

        // if (e instanceof JsonError) { // 错误是 json 错误
        //     this.body = {
        //         'status': status,
        //         'message': message
        //     };
        //     if (status == 500) {
        //         // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
        //         this.app.emit('error', e, this);
        //     }
        //     return;
        // }

        // this.status = status;
        // // 根据 status 渲染不同的页面
        // if (status == 403) {
        //     this.body = yield this.render('error/404', { 'err': e });
        // }
        // if (status == 404) {
        //     this.body = yield this.render('error/404', { 'err': e });
        // }
        // if (status == 500) {
        //     this.body = yield this.render('error/500', { 'err': e });
        //     // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
        //     this.app.emit('error', e, this);
        // }
    }
}
