// wikiapi.js, created by Adam Parent, 10 May 2022.

var cityName = "Salt Lake City";  //To be pulled from either input or Sam's API after validation - should be pre-trimmed
// const wikiUsername = "arparent";  //Required for API - registered username for Adam Parent.
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

function getWikiApi() {
    var wikiApiURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvsection=0&titles=" + cityNameURL;   //Build the URL
    console.log(wikiApiURL);
    fetch(wikiApiURL)
      .then(function (response) {
        if (response.status < 200 || response.status >= 400) {                  //Check Status - if not in 300 range, return error message.
          wikiText.textContent = "Response Error Code: " + response.status;     //Todo - See if API returns any status messages, append if provided.
        }                                                                       //Todo - If no data available, "summary not available" message instead.
        return response.json();
      })
      .then(function (data) {
        // wikiText.textContent = data.geonames[0].summary;                           //If no error, populate text with result.
        console.log(data);
      });
}

prepCityNameforURL();
getWikiApi();

async function searchWikipedia(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvsection=0&titles=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  console.log(json);
  return json;
}
searchWikipedia('seattle')