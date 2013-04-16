var http = require("http"),
	util=require('util'),
	EventEmitter=require('events').EventEmitter;
var SMSPilot=function(apikey){
	this.apikey=apikey;
}
util.inherits(SMSPilot, EventEmitter);
SMSPilot.prototype.set=function(name,val){
	if(typeof val!="undefined")this.storage[name]=val;
	return this.storage[name];
}
/* <Short-hand> */
SMSPilot.prototype.to=function(to){this.set("to",to)}
SMSPilot.prototype.text=function(text){this.set("text",text)}
SMSPilot.prototype.from=function(from){this.set("from",from)}
/* </Short-hand> */
SMSPilot.prototype.send=function(){
	var self=this;
	var data=JSON.stringify({
		apikey: this.apikey,
		send: [
			{from:this.set("from"), to:this.set("to"), text:this.set("text")}
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
			self.emit("sent");
			res.setEncoding('utf8');
			res.on('data', function(chunk){
				var response=JSON.stringify(chunk);
				if(typeof json.error!="undefined")
					self.emit("error",response);
				else
					self.emit("ready",response);
			});
		}
	);
	request.on('error', function(e){
		self.emit("error",e);
		throw new Error(e);
	});
	request.end(data);
}
module.exports=SMSPilot;
