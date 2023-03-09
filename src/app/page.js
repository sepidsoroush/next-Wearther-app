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
        console.log(location);
      })
      .catch(function(error){
        console.log(error);
      })
  }
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var lat = position.coords.latitude;
  //     var long = position.coords.longitude;
  //     console.log('Your latitude is: '+lat+' and longitude is '+long);
  //     getWeather(lat , long);
  //   });
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  // }
  // const getWeather =(lat , long)=>{     
  //   const options = {
  //     method: 'GET',
  //     url: `https://dark-sky.p.rapidapi.com/${lat},${long}`,
  //     params: {units: 'auto', lang: 'en'},
  //     headers: {
  //       'X-RapidAPI-Key': '67b0005738msh9b550b5382f8820p1c3047jsn0e767ce79729',
  //       'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
  //     }
  //   };
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }
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
