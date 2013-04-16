var http = require("http"),
	util=require('util'),
	EventEmitter=require('events').EventEmitter;
var SMSPilot=function(apikey){
	this.apikey=apikey;
	this.storage={};
}
util.inherits(SMSPilot, EventEmitter);
SMSPilot.prototype.set=function(name,val){
	if(typeof val!="undefined")this.storage[name]=val;
	return this.storage[name];
}
/* <Short-hand> */
SMSPilot.prototype.id=function(id){this.set("id",id)}
SMSPilot.prototype.to=function(to){this.set("to",to)}
SMSPilot.prototype.text=function(text){this.set("text",text)}
SMSPilot.prototype.from=function(from){this.set("from",from)}
SMSPilot.prototype.send_datetime=function(send_datetime){this.set("send_datetime",send_datetime)}
/* </Short-hand> */
SMSPilot.prototype.send=function(){
	var self=this;
	var data=JSON.stringify({
		apikey: this.apikey,
		send: [
			{
				id:this.set("id"),
				from:this.set("from"), 
				to:this.set("to"), 
				text:this.set("text"),
				send_datetime:this.set("send_datetime")
			}
		]
	});
	var request=http.request({
			host: 'smspilot.ru',
			port: 80,
			path: '/api2.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(data, 'utf8'),
			}
		}, 
		function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk){
				var response=JSON.parse(chunk);
				if(typeof response.error!="undefined")
					self.emit("error",response);
				else
					self.emit("sent",response);
			});
		}
	);
	request.on('error', function(e){
		throw new Error(e);
	});
	request.end(data);
}
module.exports=SMSPilot;
