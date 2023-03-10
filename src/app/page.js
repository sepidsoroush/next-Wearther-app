"use client"
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function Home() {
  // declare variables
  const [city , setCity] = useState('');
  const [temp , setTemp] = useState('');
  const [feelsLike , setFeelLikes] = useState('');
  const [wind , setWind] = useState('');
  const [humidity , SetHumidity] = useState('');
  const [summary , setSummary] = useState('');
  const [error , setError] = useState(false);
  const [show , setShow] = useState(false);
  const [location , setLocation] = useState({lat : null , lon : null});


  const getLocation = ()=>{
    const cities = {
      method : 'GET',
      url : `http://api.openweathermap.org/geo/1.0/direct` ,
      params :{q : `${city}` , limit : 5 , appid : '6e65a6b80661f81d2e592ae68a18c37c'}
    }
    axios
      .request(cities)
      .then(function(response){
        const data = response.data[0];
        setLocation({lat : data.lat , lon : data.lon});
        getWeather(location.lat , location.lon);
        setCity(data.name);

      })
      .catch(function(error){
        console.log(error);
      })
  }

  const getWeather =(lat , lon)=>{   
    const options = {
      method: 'GET',
      url: `https://dark-sky.p.rapidapi.com/${lat},${lon}`,
      params: {units: 'auto', lang: 'en'},
      headers: {
        'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
        'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(function (response) {
        setShow(true);
        const data = response.data.currently;
        setTemp(Math.ceil(data.temperature));
        setFeelLikes(Math.ceil(data.apparentTemperature));
        setWind(data.windSpeed);
        SetHumidity(data.humidity);
        setSummary(data.summary);
        setError(false);
      }).catch(function (error) {
        setShow(false);
        setError(true);
        console.error(error);
      });
  }
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
          onChange={event => setCity(event.target.value)}
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
