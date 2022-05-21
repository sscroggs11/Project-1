// wikiapi.js, created by Adam Parent, 10 May 2022.

var cityName = "Tukwila";  //To be pulled from either input or Sam's API after validation - should be pre-trimmed
var cityNameText = document.getElementById('city-name-text');       //Todo - Create this element in HTML.
var wikiText = document.getElementById('wiki-text');                //Todo - Create this element in HTML.
var cityNameURL = "";
var cityNameDisplay = "";

function prepCityNameforURL(){
  cityNameArr = cityName.split(" ");
  cityNameURL = "";
  cityNameDisplay = "";
  for(var i = 0; i < cityNameArr.length; i++){
    cityNameURL = cityNameURL.concat(cityNameArr[i]);
    cityNameDisplay = cityNameDisplay.concat(cityNameArr[i]);
    if((i + 1) < cityNameArr.length){
      cityNameURL = cityNameURL.concat("%20");
      cityNameDisplay = cityNameDisplay.concat(" ");
    }
  }
  cityNameText.textContent = cityNameDisplay;
  console.log(cityNameURL);
  console.log(cityNameDisplay);
}

async function searchWikipedia(searchQuery) {
  // const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  var headers = { 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'}
  const endpoint = `https://gentle-brushlands-07400.herokuapp.com/http://api.geonames.org/wikipediaSearchJSON?maxRows=1&username=arparent&q=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  console.log(json);
  wikiText.textContent = json.geonames[0].summary;                           //If no error, populate text with result.
  return json;
}

prepCityNameforURL();
searchWikipedia(cityNameDisplay);