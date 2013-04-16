node-smspilot
=============
How to use this
```js
var SMS=require("SMSPilot.js")
var sms=new SMS("XXXXXXXXXXXXYYYYYYYYYYYYZZZZZZZZXXXXXXXXXXXXYYYYYYYYYYYYZZZZZZZZ")
sms.text("Hello world!")
sms.to(79081231212)
sms.from("example.com")
sms.send()
```
