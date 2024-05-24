
async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const widget = document.querySelector("#weatherWidget")
  widget.style.display = "none"

  document.querySelector("#citySelect").addEventListener("change", async evt => {
    try {
      evt.target.setAttribute("disabled", "disabled")
      widget.style.display = "none"
      const info = document.querySelector(".info")
      info.textContent = "Fetching weather data..."
      let city = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`

      const res = await axios.get(url)
      widget.style.display = "block"
      info.textContent = ""
      evt.target.removeAttribute("disabled")

      console.log(res)
      let {data} = res
      //current Day Data
      document.querySelector("#apparentTemp div:nth-child(2)").textContent = `${data.current.apparent_temperature}`
      document.querySelector("#todayDescription").textContent = descriptions.find(d=>d[0]===data.current.weather_description)[1]
      document.querySelector("#todayStats div:nth-child(1)").textContent =`${data.current.temperature_max}°/${data.current.temperature_min}` 
      document.querySelector("#todayStats div:nth-child(2)").textContent = `Precipitation: ${data.current.precipitation_probability*100}%`
      document.querySelector("#todayStats div:nth-child(3)").textContent = `Humidity: ${data.current.humidity}`
      document.querySelector("#todayStats div:nth-child(4)").textContent = `Wind: ${data.current.wind_speed}m/s`


      data.forecast.daily.forEach((day,idx)=>{
        let card = document.querySelectorAll(".next-day")[idx]
        
        let weekDay = card.children[0]
        let apparant = card.children[1]
        let minMax = card.children[2]
        let precipt = card.children[3]
        weekDay.textContent = day.date
        apparant.textContent = descriptions.find(d=>d[0]===day.weather_description)[1]
        minMax.textContent  = `${day.temperature_max}°/${day.temperature_min}°`
        precipt.textContent = `${day.precipitation_probability*100}%`
      })
      //Location
      document.querySelector("#location div:nth-child(1)").textContent = data.location.city
      document.querySelector("#location div:nth-child(2)").textContent = data.location.country
    }
    catch (err) {
      console.log("Promise rejected with an err.message -->",err.message)
    }
  })



  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
