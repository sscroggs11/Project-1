/* Fetch API */
var clientID= "nkyJu8Y-bgOpyEvKdevXhji09H6_azi1OlFzFM9W0-Y";



function loadImage() {
  var cityUrl = "https://api.unsplash.com/search/photos?query=" + cityNameURL + "&page=1&per_page=1&client_id=" + clientID;
  console.log(cityUrl);
    fetch(cityUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            var imageElement = document.querySelector('#showimage');
            imageElement.src=data.results[0].urls.regular;
        });

}


//"https://api.unsplash.com/search/photos?query=seattle&per_page=1&client_id=nkyJu8Y-bgOpyEvKdevXhji09H6_azi1OlFzFM9W0-Y

//"https://api.unsplash.com/search/photos?query=coffee&per_page=20&client_id=nkyJu8Y-bgOpyEvKdevXhji09H6_azi1OlFzFM9W0-Y"

