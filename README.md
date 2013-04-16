node-smspilot
=============
Пример использования
```js
var SMS=require("SMSPilot.js")
var sms=new SMS("XXXXXXXXXXXXYYYYYYYYYYYYZZZZZZZZXXXXXXXXXXXXYYYYYYYYYYYYZZZZZZZZ")// Ваш API-key
sms.text("Hello world")// Текст СМС
sms.to(79081231212) // Получатель СМС
sms.from("example.com") // Имя отправителя
sms.send()// Отправка СМС
/* Когда СМС отправлено, объект посылает событие "sent"
* Первым аргументом в функцию передается ответ с сервера, который содержит такую информацию, как
* Баланс
*/
sms.on("sent",function(response){
  console.log("SMS sent. Your balance is "+response.balance)  
})
sms.on("error",function(err){
  throw new Error(err);
})
```
Пример ответа сервера на удачную отправку
```js
{
  "send":
    [
      {
        "id":"0",
        "server_id":"26784107",
        "from":"example.com",
        "to":"79081231212",
        "text": "Hello world",
        "zone":"1",
        "parts":"1",
        "credits":"1",
        "status":"0",
        "error":"0",
        "send_datetime":"","country":"RU"
      }
    ],
  "server_packet_id":"10847201",
  "balance":"146"
}
```
