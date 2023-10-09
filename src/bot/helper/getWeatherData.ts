import axios from 'axios';

const getWeatherData = async (city: string) => {
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${process.env.WEATHER_API_KEY}`;
  try {
    const data = await axios.get(weatherUrl);
    const weatherData = data.data;
    const weatherMessage = `The weather in ${city} is as follows:
      Temperature: ${weatherData.current.temp_c}°C
      Condition: ${weatherData.current.condition.text}
      Wind Speed: ${weatherData.current.wind_kph} km/h
      Humidity: ${weatherData.current.humidity}%
      Feels like: ${weatherData.current.feelslike_c}°C
      `;
    const conditionImg = weatherData.current.condition.icon.slice(2);
    // console.log('weather message:', weatherMessage);
    // console.log('conditionImg:', conditionImg);
    return { weatherMessage, conditionImg };
  } catch (error) {
    if (error.response.status === 400) {
      return 'Invalid city name';
    }
    console.log(error.message);
  }
};

export default getWeatherData;
