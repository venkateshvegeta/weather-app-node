
const searchform = document.getElementById('search-form')
const searchField = document.getElementById('search-field-id')
const forecast = document.querySelector('#forecast')
const errorMsg = document.querySelector('#error-msg')
searchform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchField.value  
    errorMsg.textContent='Loading...'
    forecast.textContent=''
    fetch('http://localhost:3000/weather?location='+location).then( (response) => {
    response.json().then((data) => {
        if(data.error){
            errorMsg.textContent = data.error
         } else {
        const searchedLocation = data.searchedLocation;
        const forecastlocation = data.forecastlocation;
        const forecastdata = data.report;
        forecast.textContent=forecastlocation
        errorMsg.textContent=forecastdata
         }
        
    })
})
})