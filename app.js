const express = require("express");
const https = require("https");
// install body-parser in terminal: npm i body-parser
const bodyParser = require("body-parser");
//create app constant, equal to a new instance of express
const app = express();

// let the app to use the bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //send index.html to the browser
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  // console.log(req.body.cityName);//cityName is in the index.html
  const query = req.body.cityName;
  const apiKey = "ddba42ee5e3bbe601f18cfefc7240a6b";
  const unit = "metric";
  //GET LIVE DATA USING API
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&id=2172797&appid=" +
    apiKey +
    "&units=" +
    unit;

  //MAKE HTTPS GET REQUEST TO GET THE DATA
  https.get(url, function (response) {
    console.log(response.statusCode);

    //  hold of the data from the response
    response.on("data", function (data) {
      // parse the data we get back into an actual javascript object
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      // get the specific pieces of data that we are interested in
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      //INPUT ICON
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //https://openweathermap.org/weather-conditions

      res.write("<p>the weather is currently " + weatherDescription + "</p>");
      res.write("<h1>the temprature is " + temp + " degree celcius.</h1>");
      res.write("<img src =" + imageURL + ">");

      res.send();
      // const object = {
      //   name: "su",
      //   favoriteFood: "Ramen",
      // };
      // // JSON.stringify(Object); // turn a js object into a string
      // console.log(JSON.stringify(object));
      // // {"name":"su","favoriteFood":"Ramen"}
    });
  });
  // res.send("hello");
});
