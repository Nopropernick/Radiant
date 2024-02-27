import { useEffect, useState } from 'react';
import './App.css'
import Temperature from './components/Temperature'
import Highlights from './components/Highlights'
function App() {
  const [city, setCity]= useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null)
  useEffect(()=>{
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=512565fc29a343ec92a190634242702&q=${city}&aqi=no`;
    
  fetch(apiURL)
  .then((response)=>{
    if(!response.ok){
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data)=>{
    console.log(data)
    setWeatherData(data)
  })
  .catch((e)=>{
    console.log(e)
  })
  },[city])

  return (
    <div className='bg-black h-screen flex justify-center'>
      <div className='mt-40 w-1/5 h-1/3'>
      {weatherData && (
          <Temperature 
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime
            }}
          />
        )}
      </div>

      <div className=' mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h1 className='text-slate-200 text-2xl col-span-2' >Today's Highlights</h1>
        {weatherData && (
    <>
      <Highlights
        stats={{
          title: "Wind Status",
          value: weatherData.current.wind_mph,
          unit: "mph",
          direction: weatherData.current.wind_dir
        }}
      />
      <Highlights
        stats={{
          title: "Humidity",
          value: weatherData.current.humidity,
          unit: "%"
        }}
      />
      <Highlights
        stats={{
          title: "Visibility",
          value: weatherData.current.vis_miles,
          unit: "%"
        }}
      />
      <Highlights
        stats={{
          title: "Air Pressure",
          value: weatherData.current.pressure_mb,
        }}
      />
    </>
  )}
      </div>
    </div>
  )
}

export default App
