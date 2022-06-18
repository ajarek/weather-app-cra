import { fetchData } from "./fetchData"
import { Input } from "./input"
import { Message } from "./message"
import { ChartJS } from "./chart"
import { Map } from "./map"
import {debounce} from './debounce'

const APPID = "96d145cbc67ffa8619b24c37dd8a0cab"

class App {
  constructor() {
    this.container = document.querySelector("#root")
    this.query = "Kołobrzeg"
    this.data = null
    this.hasError = null
    this.fetchWeatherDebounced = debounce(300)(this.fetchWeather)
    this.fetchWeather()
  }

  fetchWeather() {
    fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&appid=${APPID}&units=metric`
    ).then((data) => this.setData(data))
  }

  onInput(event) {
    this.query = event.target.value
    this.fetchWeather()
    this.render()
  }

  setData(data) {
    if (data.message) {
      this.hasError = data.message
    }
    this.data = data
    console.log(this.data)
    this.render()
  }

  transformData(data) {
    
    if (data && !this.hasError) {
      const dataTemp = data.list.map((item) => {
        const date = item.dt_txt
        const temp = item.main.temp
        const likely = item.main.feels_like
        return {date, temp , likely}
      })
      return dataTemp
    }
  }
  
  render() {
    this.container.style.maxWidth = "768px"
    this.container.style.margin = '0 auto'
    this.container.innerHTML = ""
    const input = new Input("Enter the city", this.query, (event) =>this.onInput(event))
   
    const lat = this.data && this.data.city && this.data.city.coord && this.data.city.coord.lat
    const lng = this.data && this.data.city && this.data.city.coord && this.data.city.coord.lon
    const name = this.data && this.data.city && this.data.city.name
    const mapElement = new Map(lng, lat, name)
    // this.container.appendChild()

    const transformedData = this.transformData(this.data)
        const chartElement = new ChartJS(transformedData)

    if (this.hasError) {
      const messageElement = new Message(this.hasError)
      this.container.appendChild(messageElement.render())
      this.hasError = null
    }
  
    this.container.append(input.render(),mapElement.render(), chartElement.render())
  }
}

const app = new App()
app.render()

