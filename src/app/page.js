"use client"
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';
import Spinner from './components/spinner'; 

export default function Home() {
  // declare variables
  const [input , setInput] = useState('');
  const [parameters , setParameters] = useState(
    {temp : '',
    feelsLike:'',
    wind :'',
    humidity:'',
    summary:'',
    lowTemp:'',
    highTemp :'',
    city:''
   });
  const [error , setError] = useState(false);
  const [show , setShow] = useState(false);
  const [isLoading , setIsLoading] = useState(false);

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: `${input}`,
          limit: 5,
          appid: '6e65a6b80661f81d2e592ae68a18c37c',
        }
      });
      const factors = response.data.main;
      setIsLoading(false);
      setShow(true);
      setParameters({
        temp : Math.ceil(factors.temp - 273.15),
        feelsLike: Math.ceil(factors.feels_like - 273.15),
        wind :response.data.wind.speed,
        humidity:factors.humidity,
        summary:response.data.weather[0].main,
        lowTemp : Math.ceil(factors.temp_min - 273.15),
        highTemp : Math.ceil(factors.temp_max - 273.15),
        city:response.data.name
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
            placeholder="City"
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
        <div className={styles.spinner}>
          {isLoading && <Spinner/>}
        </div>        
        {show && (
        <div className={styles.infoContainer}>
          <div className={styles.mainInfo}>
            <p>{parameters.city}</p>
            <p className={styles.temperature}>{parameters.temp} °C</p>
            <p style={{marginBottom :'5px'}}>{parameters.summary}</p>
            <p>
              H: {parameters.highTemp}<span className={styles.sign}>°C</span>&nbsp; 
              L: {parameters.lowTemp}<span className={styles.sign}>°C</span>
            </p>
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
