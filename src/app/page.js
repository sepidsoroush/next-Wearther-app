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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.");
    }
    }
    function showPosition(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log('Your latitude is :'+lat+' and longitude is '+long);
    }

  return (
    <main>
      <div>
        <h1>Weather App</h1>
      </div>
      
      {/* <div>
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
