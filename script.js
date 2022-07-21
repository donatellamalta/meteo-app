// Take all the necessary elements from the page
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');


// This is <html> tag
const rootElement = document.documentElement;

// Try to retrieve position
window.navigator.geolocation.getCurrentPosition(onSuccess, onError); 

// Function to execute if an error occur
function onError(error) {
  console.error(error);
  weatherLocation.innerText = 'You should activate geolocalization';
}

// Function to execute if everything is ok
function onSuccess(position) {
  console.log(position);

  // Prepare data for the API   --> https://openweathermap.org/current
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = 'a77e301fc8bf9aeb3b7983bac3d4e3cb';
  const language = 'en';
  const units = 'metric';
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather';

  // Construct the address, included the query string!
  const apiUri = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;
  
  // Call our external service
  fetch(apiUri) //it takes time, so we need to wait the response ("promise")
    .then(function (response) {
      // trasfor the response in a more readable format
      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);

      // Extract information needed
      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // Prepare right suggestion
      const suggestion = getSuggestion(iconCode);

      // Insert these data where we want to show them
      weatherLocation.innerText = locationName;
      weatherTemperature.innerText = `${temperature}°`;
      weatherIcon.alt = description;
      weatherIcon.src = `images/${iconCode}.png`; //substitute the default image in the html with the correct one
      suggestionParagraph.innerHTML = suggestion;

      // Rimuoviamo la classe 'js-loading'
      rootElement.classList.remove('js-loading');
    });
}


// Function to get the right suggestion
function getSuggestion(iconCode) {
  const suggestions = {
    '01d': 'Remember the sunscreen!',
    '01n': 'Goodnight!',
    '02d': 'Today the sun comes and goes...',
    '02n': 'Beware of werewolves...',
    '03d': 'Perfect light for taking pictures!',
    '03n': 'Sleep well :)',
    '04d': 'What a gray sky :(',
    '04n': 'You can\'t even see the moon!',
    '09d': 'Bring an umbrella',
    '09n': 'Cover up!',
    '10d': 'Bring an umbrella',
    '10n': 'Cover up!',
    '11d': 'Watch out for lightning!',
    '11n': 'Lightning lights up the night!',
    '13d': 'Go out and build a snowman!',
    '13n': 'Perfect night to stay under the duvet!',
    '50d': 'Turn on the fog lights!',
    '50n': 'Drive carefully!',
  }

  return suggestions[iconCode];
}