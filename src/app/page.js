"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // declare variables
  const [city , setCity] = useState('');
  const [temp , setTemp] = useState(null);
  const [minTemp , setMinTemp] = useState('');
  const [maxTemp , setMaxTemp] =useState('');
  const [error , setError] =useState(false);


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log('Your latitude is: '+lat+' and longitude is '+long);
      getWeather(lat , long);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  const getWeather =(lat , long)=>{     
    const options = {
      method: 'GET',
      url: `https://dark-sky.p.rapidapi.com/${lat},${long}`,
      params: {units: 'auto', lang: 'en'},
      headers: {
        'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
        'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <main>
      <div>
        <h1>Weather App</h1>
      </div>
      <button
        onClick={getWeather}
        >
          Search
        </button>
      {/* <div>
        <input 
        type="text"
        placeholder="city"
        onChange={event => setCity(event.target.value)}
         />
        
      </div> */}
      {/* {temp && (
      <div>
        <div>
          <p>Temperature:</p>
          <p>{temp} °C</p>
        </div>
        <div>
          <p>Min Temperature:</p>
          <p>{minTemp} °C</p>
        </div>
        <div>
          <p>Max Temperature:</p>
          <p>{maxTemp} °C</p>
        </div>        
      </div>)}
      {error && (
        <div>
          <p>Couldn't find weather results.</p>          
        </div>)} */}
    </main>
  )
}
