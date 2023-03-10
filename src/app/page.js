"use client"
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function Home() {
  // declare variables
  const [input , setInput] = useState('');
  const [temp , setTemp] = useState('');
  const [feelsLike , setFeelLikes] = useState('');
  const [wind , setWind] = useState('');
  const [humidity , SetHumidity] = useState('');
  const [summary , setSummary] = useState('');
  const [city , setCity] =useState('');
  const [error , setError] = useState(false);
  const [show , setShow] = useState(false);

  const getLocation = async () => {
    try {
      const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: `${input}`,
          limit: 5,
          appid: '6e65a6b80661f81d2e592ae68a18c37c',
        }
      });

      const data = response.data[0];
      await getWeather(data.lat, data.lon , data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeather = async (lat, lon , name) => {
    try {
      const response = await axios.get(`https://dark-sky.p.rapidapi.com/${lat},${lon}`, {
        params: { units: 'auto', lang: 'en' },
        headers: {
          'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
          'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
        }
      });
      setShow(true);
      const factors = response.data.currently;
      setCity(name);
      setTemp(Math.ceil(factors.temperature));
      setFeelLikes(Math.ceil(factors.apparentTemperature));
      setWind(factors.windSpeed);
      SetHumidity(factors.humidity);
      setSummary(factors.summary);
      setError(false);
    } catch (error) {
      setShow(false);
      setError(true);
      console.error(error);
    }
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      getLocation();
    }
  };


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Weather App</h1>
        </div>
        <div>
          <input 
          type="text"
          placeholder="city"
          className={styles.input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={handleKeypress}
          />
          <button
          className={styles.button}
          onClick={getLocation}
          >
            Search
        </button>
        </div>
        {show && (
        <div className={styles.infoContainer}>
          <div className={styles.mainInfo}>
            <p>{city}</p>
            <p className={styles.temperature}>{temp} °C</p>
            <p>{summary}</p>
          </div>
          <div className={styles.extraInfo}>
            <div className={styles.border}>
              <p className={styles.infoTitle}>Feels Like</p>
              <p className={styles.infoText}>{feelsLike}<span className={styles.sign}>°C</span></p>
            </div>
            <div className={styles.border} style={{marginLeft :'10px' , marginRight : '10px'}}>
              <p className={styles.infoTitle}>Humidity</p>
              <p className={styles.infoText}>{humidity}<span className={styles.sign}>%</span></p>
            </div>
            <div className={styles.border}>
              <p className={styles.infoTitle}>Wind Speed</p>
              <p className={styles.infoText}>{wind}<span className={styles.sign}>km/h</span></p>
            </div> 
          </div>       
        </div>)}
        {error && (
          <div className={styles.error}>
            <p>Couldn't find weather results.</p>          
          </div>)}
      </div>
    </main>
  )
}
