/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/
 'use strict';

const Alexa = require('alexa-sdk');
const Axios = require('axios');

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const SKILL_NAME = 'My Weather';
const GET_FACT_MESSAGE = "Right now, the weather in {city} is {description}, with a temperature of {temp} celsius degrees, humidity {humidity}% and winds at {wind} meters per second.";
const NO_FACT_MESSAGE = 'Sorry, we could not get your location';
const NO_WEATHER_INFO = 'Sorry, we could not find weather information for {city}';
const HELP_MESSAGE = 'You can say my weather in, or, for the city... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {

  'LaunchRequest': function () {
    this.emit('GetWeatherIntent');
  },

  'GetWeatherIntent': function () {

    let self = this;

    console.log('The filled slots: ' + JSON.stringify(this.event.request.intent.slots));

    if (this.event.request.intent.slots.city) {
      let city = this.event.request.intent.slots.city.value;

      Axios.get(WEATHER_URL + '?q=' + city + '&units=metric&appid=' + process.env.WEATHER_API_KEY)      
        .then(function(response) {
          console.log('Get weather OK: ' + JSON.stringify(response.data));

          let weatherText = SKILL_NAME + ': ' + getWeatherText(city, response.data);
          self.response.cardRenderer(SKILL_NAME, weatherText);
          self.response.speak(weatherText);
          self.emit(':responseReady');

        })
        .catch(function(error) {
          let noWeatherText = SKILL_NAME + ': ' + NO_WEATHER_INFO.replace("{city}", city);
          self.response.cardRenderer(SKILL_NAME, noWeatherText);
          self.response.speak(noWeatherText);
          self.emit(':responseReady');
        });

    } else {
        let errorMessage = SKILL_NAME + ': ' + NO_FACT_MESSAGE;
        this.response.cardRenderer(SKILL_NAME, NO_FACT_MESSAGE);
        this.response.speak(errorMessage);
        this.emit(':responseReady');
    }
  },

  'SessionEndedRequest': function () {
  },

  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },

  'AMAZON.StopIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },

  'AMAZON.FallbackIntent': function () {
    this.response.speak(NO_FACT_MESSAGE);
    this.emit(':responseReady');
  },
};

function getWeatherText(city, data) {
  let weatherText = GET_FACT_MESSAGE;
  weatherText = weatherText.replace("{city}", data.name);
  weatherText = weatherText.replace("{description}", data.weather[0].description);
  weatherText = weatherText.replace("{temp}", data.main.temp);
  weatherText = weatherText.replace("{humidity}", data.main.humidity);
  weatherText = weatherText.replace("{wind}", data.wind.speed);
  return weatherText;
  
}

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
