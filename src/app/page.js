"use client"
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function Home() {
  // declare variables
  const [input , setInput] = useState('');
  const [parameters , setParameters] = useState(
    {temp : '',
    feelsLike:'',
    wind :'',
    humidity:'',
    summary:'',
    city:''
   });
  const [error , setError] = useState(false);
  const [show , setShow] = useState(false);
  const [isLoading , setIsLoading] = useState(false);

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
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
      setIsLoading(false);
      const response = await axios.get(`https://dark-sky.p.rapidapi.com/${lat},${lon}`, {
        params: { units: 'auto', lang: 'en' },
        headers: {
          'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
          'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
        }
      });
      setShow(true);
      const factors = response.data.currently;
      setParameters({
        temp : Math.ceil(factors.temperature),
        feelsLike: Math.ceil(factors.apparentTemperature),
        wind :factors.windSpeed,
        humidity:factors.humidity,
        summary:factors.summary,
        city:name
     });
      setError(false);
    } catch (error) {
      setIsLoading(false);
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
        {isLoading}
        {show && (
        <div className={styles.infoContainer}>
          <div className={styles.mainInfo}>
            <p>{parameters.city}</p>
            <p className={styles.temperature}>{parameters.temp} °C</p>
            <p>{parameters.summary}</p>
          </div>
          <div className={styles.extraInfo}>
            <div className={styles.border}>
              <p className={styles.infoTitle}>Feels Like</p>
              <p className={styles.infoText}>{parameters.feelsLike}<span className={styles.sign}>°C</span></p>
            </div>
            <div className={styles.border} style={{marginLeft :'10px' , marginRight : '10px'}}>
              <p className={styles.infoTitle}>Humidity</p>
              <p className={styles.infoText}>{parameters.humidity}<span className={styles.sign}>%</span></p>
            </div>
            <div className={styles.border}>
              <p className={styles.infoTitle}>Wind Speed</p>
              <p className={styles.infoText}>{parameters.wind}<span className={styles.sign}>km/h</span></p>
            </div> 
          </div>       
        </div>)}
        {error && (
          <div className={styles.error}>
            <p>Coudln&apos;t find weather.</p>          
          </div>)}
      </div>
    </main>
  )
}
