import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('');
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    const fetchWeather = async () => {
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
            const response = await axios.get(url);
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
        }
    };

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
    };

    return (
        <div className="weather-container">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
            <button onClick={fetchWeather}>Get Weather</button>
            <button onClick={toggleUnit}>Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</button>
            {weather && (
                <div>
                    <h3>Weather in {weather.name}</h3>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
