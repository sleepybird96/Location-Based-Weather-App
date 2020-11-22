const APIKEY = '47ae1f9397984156de1427b9ab3c9c06'

const elInput = document.querySelector('input')
const elSearch = document.querySelector('#search')
const elCity = document.querySelector('#city')
const elIcon = document.querySelector('#icon')
const elStatus = document.querySelector('#status')
const elTemp = document.querySelector('#temp')

function printWeatherData(data){

  if(data.weather === undefined){
    elCity.textContent = 'Fail to load'
    elIcon.src = 'fail.png'
    elStatus.textContent = '도시 이름을 찾을 수 없습니다.'
    elTemp.textContent = '영어로 제대로 입력해주세요 :)'
  }

  elCity.textContent = data.name
  elIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  elStatus.textContent = data.weather[0].description
  elTemp.textContent = `${data.main.temp}ºC`
}

function getDataByLocating(la, lon){
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lon}&units=metric&appid=47ae1f9397984156de1427b9ab3c9c06`

  fetch(URL).then(function(resp){
    return resp.json();
  })
  .then(function(json){
    printWeatherData(json);
  })
}

function failLocating(){
  elCity.textContent = '위치 정보를 불러오는데 실패했습니다.'
  elIcon.src = 'fail.png'
  elStatus.textContent = 'Fail to load'
  elTemp.textContent = '정보공유가 싫으시면 검색을 이용해주세요 :)'
}

function getDataBySearching(city){
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=47ae1f9397984156de1427b9ab3c9c06`

  fetch(URL).then(function(resp){
    return resp.json();
  })
  .then(function(json){
    printWeatherData(json);
  })
}

navigator.geolocation.getCurrentPosition(function (position){
  const latitude = String(position.coords.latitude)
  const longitude = String(position.coords.longitude)
  getDataByLocating(latitude, longitude);
}, failLocating);

elSearch.onclick = function(){
  getDataBySearching(elInput.value.toLowerCase())
  elInput.value = ''
}

elInput.addEventListener('keydown', function(){
  if(window.event.keyCode === 13){ 
    getDataBySearching(elInput.value.toLowerCase())
    elInput.value = ''
  }
});