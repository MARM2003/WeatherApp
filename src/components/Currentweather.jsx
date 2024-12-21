import { useState } from 'react';
import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import clearImage from "../assets/clear.png";
import cloudImage from "../assets/cloud.png";
import mistImage from "../assets/mist.png";
import rainImage from "../assets/rain.png";
import snowImage from "../assets/snow.png";
import notfoundImage from "../assets/404.png";

const Currentweather = () => {
    const [cityname, setCityname] = useState("");
    const [weatherdata, setweatherdata] = useState(null);
    const [imagefill, setImgfill] = useState(null);
    const API_key = "write your api key";

    //get weather data function
    const getWeatherdata = async () => {

        if (!cityname) {
            console.log("City name is empty, please provide a valid city.");
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}`);

            const data = await response.json();
            setweatherdata(data);
            console.log(data);
            //false data enter
            if (data.cod === '404') {
                setImgfill(notfoundImage);
                return;
            }
            //finding image
            if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
                console.log(data.weather[0].main);
                switch (data.weather[0].main) {
                    case "Clouds":
                        setImgfill(cloudImage);
                        break;
                    case "Clear":
                        setImgfill(clearImage);
                        break;
                    case "Rain":
                        setImgfill(rainImage);
                        break;
                    case "Mist":
                        setImgfill(mistImage);
                        break;
                    case "Snow":
                        setImgfill(snowImage);
                        break;
                    case "404":
                        setImgfill(notfoundImage);
                        break;
                    default:
                        setImgfill(null);
                }
            } else {
                console.log("Error fetching data", error);
                setImgfill(notfoundImage)
            }



        }
        catch (error) {
            console.log("error fetching data", error);

        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#5bcec17e' }}>
                <div className=" conatiner h-75 w-75 p-5" >

                    <div>
                        <label htmlFor="">Enter City Name</label>
                        <input type="text" className='ms-2 ' value={cityname} onChange={(e) => { setCityname(e.target.value) }} />
                        <span className='p-3'><IoIosSearch onClick={getWeatherdata} style={{ height: "35px", width: "30px" }} /></span>

                    </div>
                    <div className='d-flex'>

                        <img src={imagefill} className='w-25 h-50' alt="" />

                        <div className='ms-5 mt-5'>

                            {weatherdata && weatherdata.weather && (<p className='fw-bold'>Weather Description: {weatherdata.weather[0].description}</p>)}
                            {
                                weatherdata && weatherdata.main && (<p className='fw-bold'>{(weatherdata.main.temp - 273.15).toFixed(2)}<sup> °</sup>C</p>)
                            }

                            {
                                weatherdata && weatherdata.wind && (<p className='fw-bold'><FaWind /> {weatherdata.wind.speed}m/s Wind Speed</p>)
                            }

                            {
                                weatherdata && weatherdata.main && (<p className='fw-bold'><WiHumidity />{weatherdata.main.humidity}% Humidity</p>)
                            }
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Currentweather;