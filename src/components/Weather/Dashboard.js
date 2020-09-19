import React , {Component} from 'react';
import axios from 'axios';
import CurrentWeather from './dashboardcomponents/CurrentWeather';
//import DailyWeather from './dashboardcomponents/DailyWeather';
import HourlyWeather from './dashboardcomponents/HourlyWeather';
import DailyWeather from './dashboardcomponents/DailyWeather';
class Dashboard extends Component{
    state = {
        userPositon :{
            latitude : 25,
            longitude : 30
        },
        current : {

        },
        hourly :{

        },
        daily : []

    }
    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                let pos = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  }
                  console.log(pos)
                  this.setState({userPositon:pos})
                  console.log(this.state.userPositon)
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.userPositon.latitude}&lon=${this.state.userPositon.longitude}&units=metric&appid=4ac5e4d2c1f5ac4c8792922f04512c0f`)
                .then(response=>{
                   // console.log(response)
                    let cur_weather = {
                        mintemp : response.data.current.dew_point,
                        temp : response.data.current.temp,
                        maxtemp : response.data.current.feels_like,
                        curicon : response.data.current.weather[0].icon,
                        curmain : response.data.current.weather[0].main


                    }
                    this.setState({current:cur_weather})
                    console.log(this.state.current)
                    let dailyWeather = [
                        response.data.daily
                    ]
                    this.setState({daily:dailyWeather})
                    console.log(this.state.daily)
                })
         })
        }
        
    }


    render(){
        return(
           <div>
              <CurrentWeather  weather = {this.state.current}/>
             <DailyWeather weatherDaily={this.state.daily} name='padhumna'/>
               <HourlyWeather  />
            </div>

        )
    }
}
export default Dashboard;