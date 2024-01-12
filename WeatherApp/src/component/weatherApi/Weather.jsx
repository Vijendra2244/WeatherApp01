import styles from "./Weather.module.css";
import CurrentWeather from "../curretnweather/CurrentWeather";
import FiveDaysForcast from "../daysforcast/FiveDaysForcast";
import Section from "../section/Section";

function Weather() {
  return (
    <Section>
      <div className={styles.mainContainer}>
        <CurrentWeather />
        <FiveDaysForcast />
      </div>
    </Section>
  );
}

export default Weather;
