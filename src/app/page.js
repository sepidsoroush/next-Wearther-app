"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // declare variables
  const [city , setCity] = useState('');
  const [temp , setTmp] = useState(null);
  const [minTemp , setMinTemp] = useState('');
  const [maxTemp , setMaxTemp] =useState('');
  const [error , setError] =useState(false);

  const getWeather = () =>{
    const options = {
      method: 'GET',
      url: 'https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D',
      params: {units: 'auto', lang: 'en'},
      headers: {
        'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
        'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
    })
      .catch(function (error) {
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
         />
        <button>
          Search
        </button>
      </div>
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
        {error && (
        <div>
          <p>Couldn't find weather results.</p>          
        </div>)}
      </div>
    </main>
  )
}
