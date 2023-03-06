"use client"
import { useState } from "react";

export default function Home() {
  const [temp , setTmp] = useState(null);
  const [minTemp , setMinTemp] = useState('');
  const [maxTemp , setMaxTemp] =useState('');
  const [error , setError] =useState(false);

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
