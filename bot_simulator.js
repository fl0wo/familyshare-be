var request = require('request');

var headers = {
  'Authorization': 'Bearer 8f7f4d105a040fd3dc3ebe5188657221b9f17915fc66c962ec6444f2ca9af3953a160353b427c7b766b90f9826a2f15f35394adb8883c58ef0aa07f357d9bb876421fbe9a95b45e025aa8c76ab33514d2b91b306968e830a10c22297d7220e5aef25d9f2ee66eb1026688762256f7945a5a1dd54047a87df652bf72c6e87cb52d05090ed55df2f5e1d9812ef5be9bd853a5fb2a0a337048000d915d09e68cc481ecbd45ae44b434f5e132c97d0c94f0ec6ed782c4523309f6eda6fbfaa2736e6',
  'Content-Type': 'application/x-www-form-urlencoded'
};

let startX = 45.50277703374562;
let startY = 12.261095921498931;
let step =    0.0001;

async function simulate() {

  var dataString = 'who=bimbo1&lat=' +
    startX
    + '&long=' +
    startY + '';

  var options = {
    url: 'http://localhost:3000/positions/',
    method: 'PATCH',
    headers: headers,
    body: dataString
  };

  let angle = Math.random() * 360;
  let radians = angle * Math.PI / 180.0;

  startX = startX + (Math.cos(radians) * step)
  startY = startY + (Math.sin(radians) * step)

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("inserito => ",startX, startY);
    }
  }

  await request(options, callback);
}

setInterval(simulate,1000);
