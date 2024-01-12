import React, { useContext, useEffect, useState } from "react";
import { ValueContext } from "../context/ValueContext";
import styles from "./CurrentWeather.module.css";
import kelvinToCelsius from "../convertTemp/kelvinToCelsius";
import { FaLocationDot, FaTemperatureFull } from "react-icons/fa6";
import CelsiusToFahrenheit from "../convertTemp/CelsiusToFahrenheit";
import { FiSunrise } from "react-icons/fi";
import { LuSunset } from "react-icons/lu";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaCompass,
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import Section from "../section/Section";

function CurrentWeather() {
  const [weatherData, setWeatherData] = useState("");
  const { value, setValue, changeUnit, setChangeUnit } =
    useContext(ValueContext);

  const fetchTheWeatherDataFromAnApi = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=3e76c30f3dc702a4cb4d52e789f2f00c`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTheWeatherDataFromAnApi();
  }, [value]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChangeUnit = () => {
    setChangeUnit(!changeUnit);
  };
  return (
    <>
    <Section>
      <div className={styles.inputAndChangeField}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Enter city name"
          onChange={handleChange}
          value={value}
          spellCheck="false"
        />
        <div className={styles.unitButton}>
          <button className={styles.btn} onClick={handleChangeUnit}>
            Change Unit
          </button>
        </div>
      </div>
      {weatherData && weatherData.main && (
        <div className={styles.main}>
          <div className={styles.sunsetAndSunrise}>
            <p className={styles.temp}>
              <FaLocationDot />
              {weatherData.name}
            </p>
            <p className={styles.temp}>
              <FiSunrise /> Sunrise:
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className={styles.temp}>
              <LuSunset /> Sunset:
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
          <div className={styles.image}>
            <img
              src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="icon"
              className={styles.weatherImage}
            />
            <p className={styles.weatherTitle}>
              {weatherData.weather[0].description}
            </p>
          </div>
          <div className={styles.weatherInfoContainer}>
            <div>
              <p className={styles.temp}>
                <FaTemperatureFull /> Temperature:
                {changeUnit
                  ? kelvinToCelsius(weatherData.main.temp).toFixed(2) + "°C"
                  : CelsiusToFahrenheit(
                      kelvinToCelsius(weatherData.main.temp)
                    ).toFixed(2) + "°F"}
              </p>
              <p className={styles.temp}>
                <FaTemperatureHigh /> Max_Temp:
                {changeUnit
                  ? kelvinToCelsius(weatherData.main.temp_max).toFixed(2) + "°C"
                  : CelsiusToFahrenheit(
                      kelvinToCelsius(weatherData.main.temp_max)
                    ).toFixed(2) + "°F"}
              </p>
              <p className={styles.temp}>
                <FaTemperatureLow /> Min_Temp:
                {changeUnit
                  ? kelvinToCelsius(weatherData.main.temp_min).toFixed(2) + "°C"
                  : CelsiusToFahrenheit(
                      kelvinToCelsius(weatherData.main.temp_min)
                    ).toFixed(2) + "°F"}
              </p>
              <p className={styles.temp}>
            
                <WiHumidity className={styles.humidity} />
                Humidity: {weatherData.main.humidity}%
              </p>
              <p className={styles.temp}>
                {" "}
                <FaWind />
                Wind speed: {weatherData.wind.speed}Km/h
              </p>
              <p className={styles.temp}>
                <FaCompass />
                Wind Direction: {weatherData.wind.deg}Deg
              </p>
            </div>
          </div>
        </div>
      )}
      </Section>
    </>
  );
}

export default CurrentWeather;
