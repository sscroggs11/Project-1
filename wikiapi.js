// wikiapi.js, created by Adam Parent, 10 May 2022.

var cityName = "";
var cityNameURL = "";
var cityNameText = document.getElementById('city-name-text');
var wikiText = document.getElementById('wiki-text');

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

async function searchWikipedia() {
  const endpoint = "https://gentle-brushlands-07400.herokuapp.com/http://api.geonames.org/wikipediaSearchJSON?maxRows=1&username=arparent&q=" + cityNameURL;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  console.log(json);
  cityNameText.textContent = json.geonames[0].title;
  wikiText.textContent = json.geonames[0].summary + "  ";
  var wikiLink = document.createElement("a");
  wikiLink.textContent = json.geonames[0].title + " on Wikipedia👆";
  wikiLink.setAttribute("href", ("http://" + json.geonames[0].wikipediaUrl));
  wikiLink.setAttribute("target", "_blank");
  wikiText.append(wikiLink);
  return json;
}
