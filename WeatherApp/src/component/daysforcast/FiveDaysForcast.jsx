import React, { useContext, useEffect, useState } from "react";
import { ValueContext } from "../context/ValueContext";
import styles from "./FiveDaysForcast.module.css";
import kelvinToCelsius from "../convertTemp/kelvinToCelsius";
import CelsiusToFahrenheit from "../convertTemp/CelsiusToFahrenheit";
import Section from "../section/Section";

function FiveDaysForcast() {
  const [forecastData, setForecastData] = useState([]);
  const { value, setValue, changeUnit, setChangeUnit } =
    useContext(ValueContext);
  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=3e76c30f3dc702a4cb4d52e789f2f00c`
      );
      const data = await response.json();
      setForecastData(data.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchForecast();
  }, [value]);
  const getUniqueDates = () => {
    const uniqueDates = [
      ...new Set(forecastData.map((item) => item.dt_txt.split(" ")[0])),
    ];
    return uniqueDates;
  };
  return (
    <>
      <Section>
        {forecastData && forecastData.length > 0 && (
          <>
            <div className={styles.forecastContainer}>
              {getUniqueDates().map((date) => {
                const dailyData = forecastData.find((item) =>
                  item.dt_txt.includes(date)
                );
                return (
                  <div key={date} className={styles.forecastItem}>
                    <p>{new Date(date).toLocaleDateString()}</p>
                    <img
                      src={`https://openweathermap.org/img/w/${dailyData.weather[0].icon}.png`}
                      alt="icon"
                    />
                    <p>
                      {changeUnit
                        ? kelvinToCelsius(dailyData.main.temp).toFixed(2) + "°C"
                        : CelsiusToFahrenheit(
                            kelvinToCelsius(dailyData.main.temp)
                          ).toFixed(2) + "°F"}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Section>
    </>
  );
}

export default FiveDaysForcast;
