// https://api.openweathermap.org/data/2.5/weather?q=Agra&appid=f6775ad13fe942a80033db661e536138

import React, { useEffect, useState } from "react";
import "./style.css";
import Weathercard from "./weathercard";


const Temp = () => {
  const [seachValue, setSearchValue] = useState("Agra");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {

      console.log(process.env)
    
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${seachValue}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={seachValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temp card */}

      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
