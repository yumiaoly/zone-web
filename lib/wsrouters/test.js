module.exports = function(router) {

    router.get('/test', function*(next) {
    	var self = this;
    	var ws = this.websocket;
    	
        ws.on('message', function(message) {
        	message = JSON.parse(message);
        	if(message.to && message.from){
        	ws.clients.forEach(function each(client) {
			    client.send(JSON.stringify({
            		msg:message.msg,
            		to:message.to,
            		from:message.from
            	}));
			  });
        	 }
        });
        // yielding `next` will pass the context (this) on to the next ws middleware
        yield next;
    });
}
