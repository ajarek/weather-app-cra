import { fetchData } from "./fetchData.js"
import { Input } from "./input.js"
import { Button } from "./button.js"
import { Message } from "./message.js"
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
    this.render()
  }

  render() {
    this.container.innerHTML = ""
    const input = new Input("Enter the city", this.query, (event) =>this.onInput(event))
    const button = new Button("Get the weather", () => this.fetchWeather())

    const weather = document.createElement("div")
    if (this.data && !this.hasError) {
      const dataTemp = this.data.list.map((item) => {
        const date = item.dt_txt
        const temp = item.main.temp
        return `<div class="day">${date}</div><div class="temp">${temp}℃</div>`
      })
      weather.innerHTML = dataTemp
    }

    if (this.hasError) {
      const messageElement = new Message(this.hasError)
      this.container.appendChild(messageElement.render())
      this.hasError = null
    }
    this.container.append(input.render(), button.render(), weather)
  }
}
const app = new App()
app.render()
