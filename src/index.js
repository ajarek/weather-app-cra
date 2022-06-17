import { fetchData } from "./fetchData.js"
import { Input } from "./input.js"
import { Button } from "./button.js"
import { Message } from "./message.js"
import { ChartJS } from "./chart.js"
const APPID = "96d145cbc67ffa8619b24c37dd8a0cab"

class App {
  constructor() {
    this.container = document.querySelector("#root")
    this.query = "Kołobrzeg"
    this.data = null
    this.hasError = null
  }

  fetchWeather() {
    fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&appid=${APPID}&units=metric`
    ).then((data) => this.setData(data))
  }

  onInput(event) {
    this.query = event.target.value
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
  onClick() {
    this.fetchWeather()
    this.render()
}
  render() {
    this.container.innerHTML = ""
    const input = new Input("Enter the city", this.query, (event) =>this.onInput(event))
    const button = new Button("Get the weather", () => this.onClick())

    const transformedData = this.transformData(this.data)
        const chartElement = new ChartJS(transformedData)

    if (this.hasError) {
      const messageElement = new Message(this.hasError)
      this.container.appendChild(messageElement.render())
      this.hasError = null
    }
    this.container.append(input.render(), button.render(), chartElement.render())
  }
}
const app = new App()
app.render()
