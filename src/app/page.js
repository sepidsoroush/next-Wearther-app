"use client"
import { useState } from "react";
import axios from "axios";

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
        setTemp(data.temperature);
        setFeelLikes(data.apparentTemperature);
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
    <main>
      <div>
        <h1>Weather App</h1>
      </div>
      <div>
        <input 
        type="text"
        placeholder="city"
        onChange={event => setCity(event.target.value)}
         />
        <button
        onClick={getLocation}
        >
          Search
      </button>
      </div>
      {show && (
      <div>
        <div>
          <p>{city}</p>
          <p>{temp} °C</p>
          <p>{summary}</p>
        </div>
        <div>
          <p>Feels Like:</p>
          <p>{feelsLike} °C</p>
        </div>
        <div>
          <p>Humidity:</p>
          <p>{humidity}%</p>
        </div>
        <div>
          <p>Wind Speed:</p>
          <p>{wind}km/h</p>
        </div>        
      </div>)}
      {error && (
        <div>
          <p>Couldn't find weather results.</p>          
        </div>)}
    </main>
  )
}
