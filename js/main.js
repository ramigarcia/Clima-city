const API = {
  key: '8a1c8c7ff6f6d031cce659541f59819a',
  url: 'https://api.openweathermap.org/data/2.5/weather',
}

const city = document.getElementById('city')
const date = document.getElementById('date')
const tempImage = document.getElementById('tempImage')
const temp = document.getElementById('temp')
const weather = document.getElementById('weather')
const range = document.getElementById('range')

function updateImages(data){
  const temp = toCelsius(data.main.temp)
  let src = './images/temp-mid.png'
  if (temp > 26){
    src = './images/temp-high.png'
  }else if (temp < 20){
    src = './images/temp-low.png'
  }
  tempImage.src = src
}

async function search(query){
  try{
    const response = await fetch(`${API.url}?q=${query}&appid=${API.key}&lang=es`)
    const data = await response.json()
    city.innerHTML = `${data.name}, ${data.sys.country}`
    date.innerHTML = (new Date ()).toLocaleDateString()
    temp.innerHTML = `${toCelsius(data.main.temp)}`
    weather.innerHTML = `${data.weather[0].description}`
    range.innerHTML = `min ${toCelsius(data.main.temp_min)}c / max ${toCelsius(data.main.temp_max)}c`
    window.h1.innerHTML = ''
    updateImages(data)
    // console.log(data)
  }
  catch(err){
    window.h1.innerHTML = `No pudimos encontrar (${searchBox.value})`
    city.innerHTML = ''
    date.innerHTML = ''
    temp.innerHTML = ''
    weather.innerHTML = ''
    range.innerHTML = ''
    console.log(err)
  tempImage.src = ''
  }
}

function toCelsius(kelvin){
  return Math.round(kelvin - 273.15)
}

function onSubmit(event){
  event.preventDefault()
  search(searchBox.value)
}

const searchForm = document.getElementById('searchForm')
const searchBox = document.getElementById('searchBox')

searchForm.addEventListener('submit', onSubmit, true)
