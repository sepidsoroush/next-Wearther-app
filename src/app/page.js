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
