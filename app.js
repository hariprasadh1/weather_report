const express= require('express');
const https = require('https');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({
   extended : true
 }))

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html")

});

app.post("/",function(req,res){

  console.log(req.body.cityName)

  const query = req.body.cityName;

  const appKey="5580fdc6a2f7f9dcb6aa49dfcb422f2b"

  const unit="imperial"


  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;

    https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>Temparature in "+query +" "+temp+" degree fahrenheit </h1>")
      res.write("<p>Climatic Condition :"+weatherDescription+"</p>")
      res.write("<img src="+iconUrl+">")
      res.send()
    })
      })
  })


app.listen(3000,function(){
  console.log("Server is in working condtion")
})
