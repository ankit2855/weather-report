// jshint esversion:6
const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
    });

 app.post("/", function(req, res){

const cityname=req.body.cityName;
const unit="metric";
const appkey="188214956b3009ce5eedf10b462c1a11";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units="+unit+"&appid="+appkey;

      https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
          const weatherdata = JSON.parse(data);
          const temp = weatherdata.main.temp;
    const temp2 = weatherdata.weather[0].description;

    const icon = weatherdata.weather[0].icon;
    const pathoficon = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
    res.write("<h1> The temperature in "+cityname+" is "  +temp+" degree celcius </h1>");
    res.write("<p>The weather is currently "  +temp2+ "</p>");
    res.write("<img src ="+ pathoficon+">");
      res.send();

  });

});
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server has been started at port 3000.");
});
