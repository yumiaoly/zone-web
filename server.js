var koa = require('koa');
var path = require('path');
var staticServer = require('koa-static-server');
var Router = require('koa-router')
var Boom = require('boom');
var csrf = require('koa-csrf');
var session = require('koa-session');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 7777 });
var app = new koa();
var fs = require('fs');
var _ = require('lodash');
var bodyParser = require('koa-body-parser');

app.wss = wss;

app.keys = ['session secret']

app.use(require('./lib/middlewares/error'));

app.use(session(app))

app.use(bodyParser());

wss.on('connection', function connection(ws) {
 ws.on('message', function(message) {
    message = JSON.parse(message);
    console.log(wss.clients.length)
    if(message.to && message.from){

    wss.clients.forEach(function(client) {
        client.send(JSON.stringify({
            msg:message.msg,
            to:message.to,
            from:message.from
        }));
      });
     }
    });
});


// csrf(app)

// app.use(csrf.middleware)

require('xtpl/lib/koa')(app,{
    views:path.join(__dirname, '/lib/views')
});





app.use(staticServer({
    rootDir: path.join(__dirname, '/public'),
    rootPath: '/public'
}));

app.use(require('./lib/middlewares/sequelize')({
	modelDir:path.join(__dirname, 'lib/models')
}));


app.use(require('./lib/middlewares/manager')({
    managerDir:path.join(__dirname, 'lib/managers')
}));



var router = new Router();

var routersFiles = fs.readdirSync(path.join(__dirname, 'lib/routers'));
_.each(routersFiles,function(filename){
    require(path.join(__dirname,'lib/routers',filename))(router)
});

app.use(router.routes())
    .use(router.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    }));


app.listen(9000);


console.log('server start at ', 9000)
