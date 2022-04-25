let teatteri = ""
function loadMovies() {                 //lataa leffojen tiedot finnkino APIsta
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      deleteMovieList("leffaLista");
      const movieList = createMovieList("leffaLista");
      const xmlDoc = xhttp.responseXML;
      const shows = xmlDoc.getElementsByTagName("Show");
      const showsArray = Array.from(shows); 
  
      showsArray.forEach((show) => {
  
          const listItem = document.createElement("li");
          const movieName = show.getElementsByTagName("Title")[0].innerHTML;
          const movieTime = show.getElementsByTagName("dttmShowStart")[0].innerHTML;
          const img = document.createElement("img")
          const movieImg = show.getElementsByTagName("EventSmallImagePortrait")[0].innerHTML;
          img.src = movieImg;
          listItem.innerHTML = movieName + " " + movieTime;
          movieList.appendChild(listItem);
          movieList.appendChild(img);
      })
    }
    xhttp.open("GET", "https://www.finnkino.fi/xml/schedule?area=" + teatteri, true);
    xhttp.send();
}

function leffa (teatteriId){
teatteri = teatteriId;
  }
function deleteMovieList(movieListName){                    //poistaa leffat uudella haulla
const movieList = document.getElementById(movieListName)   
    if (movieList !== null ){
        movieList.remove();
      }
  };
function createMovieList(movieListName){                    //tekee leffalistan
const movieList = document.createElement("ul");
    movieList.id = movieListName;
           document.getElementById("demo").appendChild(movieList);
           return movieList;
  };
