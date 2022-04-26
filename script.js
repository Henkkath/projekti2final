let teatteri = ""                       //globaalimuuttuja kun ei muutakaan keksitty :D

function loadMovies() {                 //lataa leffojen tiedot finnkino APIsta
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      deleteMovieList("leffaLista");
      const movieList = createMovieList("leffaLista");
      const xmlDoc = xhttp.responseXML;
      const shows = xmlDoc.getElementsByTagName("Show");
      const showsArray = Array.from(shows); 
      showsArray.forEach((show) => {
          const listItem = document.createElement("li");                                      //Tekee li-elementin
          const movieName = show.getElementsByTagName("Title")[0].innerHTML;                  //Hakee xml tiedostosta leffojen nimet      
          const movieTime = show.getElementsByTagName("dttmShowStartUTC")[0].innerHTML;          //Hakee xml tiedostosta esitysajat
          const date2 = new Date(movieTime);
          const img = document.createElement("img")                                           //Tekee img-elementin
          const movieImg = show.getElementsByTagName("EventSmallImagePortrait")[0].innerHTML; //Hakee xml tiedostosta oikeat kuvat
          img.src = movieImg;
          listItem.innerHTML = movieName + " " + date2.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});                      //Elokuvan nimi + esitysaika
          movieList.appendChild(listItem);  //Lisää movieListiin li-elementin
          movieList.appendChild(img);       //Lisää movieListiin img-elementin
      })
    }
    xhttp.open("GET", "https://www.finnkino.fi/xml/schedule?area=" + teatteri, true);
    xhttp.send();                           //Lähettää XMLHttpRequest pyynnön
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
           document.getElementById("main").appendChild(movieList);
           return movieList;
  };
