import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface IWeatherConditions {
  [key: string]: string;
}

const weatherConditions: IWeatherConditions = {
  Sunny: "Ensolarado",
  "Partly cloudy": "Parcialmente nublado",
  Cloudy: "Nublado",
  "Light rain": "Chuva fraca",
  "Moderate rain": "Chuva moderada",
  "Heavy rain": "Chuva forte",
  Thunderstorm: "Tempestade",
  Mist: "Neblina",
  Fog: "Nevoeiro",
};

interface WeatherData {
  city: string;
  region: string;
  country: string;
  temperature: number;
  condition: string;
  wind: number;
  humidity: number;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData>();

  const handleInputChange = (event: any) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const apiKey = "3d2adf4558d54bd2815235320232103";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

    axios
      .get(url)
      .then((response: any) => {
        const data = response.data;

        const weatherData: WeatherData = {
          city: data?.location?.name,
          region: data?.location?.region,
          country: data?.location?.country,
          temperature: data?.current?.temp_c,
          condition:
            weatherConditions[data?.current?.condition.text] ||
            "Não identificado",
          wind: data?.current?.wind_kph,
          humidity: data?.current?.humidity,
        };

        setWeather(weatherData as WeatherData);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Previsão do tempo</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      {weather
        ? weather && (
            <div className="weather-data">
              <h2>
                {weather.city}, {weather.region}, {weather.country}
              </h2>
              <p>Temperatura: {weather.temperature} °C</p>
              <p>Condição: {weather.condition}</p>
              <p>Vento: {weather.wind} km/h</p>
              <p>Umidade: {weather.humidity}%</p>
            </div>
          )
        : "Ainda sem busca"}
    </div>
  );
}

export default App;
