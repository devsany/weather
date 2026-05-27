"use client";
import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [showData, setShowData] = useState(false);
  const [input, setInput] = useState("");
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d60a7af300334da4981153347262205&q=${input || "London"}&aqi=yes`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-screen bg-sky-100">
        <h1 className="text-2xl font-bold text-sky-700">Loading Weather...</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 text-white border border-white/30">
          {/* Location */}
          <input
            className="bg-transparent w-45 mr-3 pl-1 rounded-md text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter city name  "
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setRefresh((prev) => !prev)}
          >
            Refresh
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{weather.location.name}</h1>

            <p className="text-sm text-white/80">
              {weather.location.region}, {weather.location.country}
            </p>

            <p className="text-xs mt-1 text-white/70">
              {weather.location.localtime}
            </p>
          </div>

          {/* Weather Icon */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={`https:${weather.current.condition.icon}`}
              alt="weather icon"
              className="w-28 h-28"
            />

            <h2 className="text-6xl font-bold mt-2">
              {weather.current.temp_c}°
            </h2>

            <p className="text-xl mt-2 font-medium">
              {weather.current.condition.text}
            </p>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-sm text-white/70">Feels Like</p>
              <h3 className="text-2xl font-bold">
                {weather.current.feelslike_c}°C
              </h3>
            </div>

            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-sm text-white/70">Humidity</p>
              <h3 className="text-2xl font-bold">
                {weather.current.humidity}%
              </h3>
            </div>

            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-sm text-white/70">Wind Speed</p>
              <h3 className="text-2xl font-bold">
                {weather.current.wind_kph} kph
              </h3>
            </div>

            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-sm text-white/70">UV Index</p>
              <h3 className="text-2xl font-bold">{weather.current.uv}</h3>
            </div>
          </div>

          {/* Air Quality */}
          <div className="mt-6 bg-white/20 rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-3">Air Quality</h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/70">CO</p>
                <p>{weather.current.air_quality.co}</p>
              </div>

              <div>
                <p className="text-white/70">O₃</p>
                <p>{weather.current.air_quality.o3}</p>
              </div>

              <div>
                <p className="text-white/70">PM2.5</p>
                <p>{weather.current.air_quality.pm2_5}</p>
              </div>

              <div>
                <p className="text-white/70">PM10</p>
                <p>{weather.current.air_quality.pm10}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
