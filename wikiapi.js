// wikiapi.js, created by Adam Parent, 10 May 2022.

var cityName = "";
var cityNameURL = "";
var cityNameText = document.getElementById('city-name-text');
var wikiText = document.getElementById('wiki-text');
var leftChild = document.getElementById('left-child');
var lastCityText = document.getElementById('last-city');

//This function takes the city name, parses out the spaces and formats it for use in a URL
function prepCityNameforURL(){
  cityNameArr = cityName.split(" ");
  cityNameURL = "";
  for(var i = 0; i < cityNameArr.length; i++){
    cityNameURL = cityNameURL.concat(cityNameArr[i]);
    if((i + 1) < cityNameArr.length){
      cityNameURL = cityNameURL.concat("%20");
    }
  }
}

//This function queries the wikipedia API and returns the results
async function searchWikipedia() {
  const endpoint = "https://gentle-brushlands-07400.herokuapp.com/http://api.geonames.org/wikipediaSearchJSON?maxRows=1&username=arparent&q=" + cityNameURL;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  cityNameText.textContent = json.geonames[0].title;        //Populate the city name
  wikiText.textContent = json.geonames[0].summary + "  ";   //Populate the city summary
  var wikiLink = document.createElement("a");
  wikiLink.textContent = json.geonames[0].title + " on Wikipedia👆";  
  wikiLink.setAttribute("href", ("http://" + json.geonames[0].wikipediaUrl));
  wikiLink.setAttribute("target", "_blank");
  wikiText.append(wikiLink);                                //Create and append a link to the wiki article
  var lastCity = localStorage.getItem("lastCity");
  if(lastCity != json.geonames[0].title){                   //Compare current city to last searched in local storage, if different display last city
    lastCityText.textContent = "Last city searched: " + lastCity;
  }
  localStorage.setItem("lastCity", json.geonames[0].title); //Update last city
}
