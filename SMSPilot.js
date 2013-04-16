var http = require("http");
var SMSPilot=function(apikey){
  this.apikey=apikey;
}
SMSPilot.prototype.to=function(to){this.to=to;}
SMSPilot.prototype.text=function(text){this.text=text;}
SMSPilot.prototype.from=function(from){this.from=from;}
SMSPilot.prototype.send=function(fn){
	var data=JSON.stringify({
		apikey: this.apikey,
		send: [
			{from:this.from, to:this.to, text:this.text}
		]
	});
	var request=http.request({
			host: 'smspilot.ru',
			port: 80,
			path: '/api2.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': data.length,
			}
		}, 
		function(res) {
			if(typeof fn=="function")fn();
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);
			});
		}
	);
	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});
	request.end(data);
}
module.exports=SMSPilot;
