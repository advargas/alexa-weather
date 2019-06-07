# Alexa Skill My Weather
Alexa Skill to get the weather by city.

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Skill Architecture
Each skill consists of two basic parts, a front end and a back end.
The front end is the voice interface, or VUI.
The voice interface is configured through the voice interaction model.
The back end is where the logic of your skill resides.

### Backend AWS Lambda

The AWS Lambda handles all defined intents, for testing purposes, the weather information is requested through the OpenWeatherMap API:
[https://openweathermap.org/api](https://openweathermap.org/api)

The Weather API invocation requires a **city** and an **API Key**: 
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}

The API Key should be defined as an Environment variable of the AWS Lambda. 

## Invocation name and intents
To invoke this Alexa Skill please say:

``
alexa open my weather in {city}
``

``
alexa open my weather for {city}
``

---

## Additional Resources

### Community
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!
* [Hackster.io](https://www.hackster.io/amazon-alexa) - See what others are building with Alexa.

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.
* [Codecademy: Learn Alexa](https://www.codecademy.com/learn/learn-alexa) - Learn how to build an Alexa Skill from within your browser with this beginner friendly tutorial on Codecademy!

### Documentation
* [Official Alexa Skills Kit Node.js SDK](https://www.npmjs.com/package/ask-sdk) - The Official Node.js SDK Documentation
*  [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation
