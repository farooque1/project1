$(document).ready(function(){
  $("#searchForm").on("submit",function(e){
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function getMovies(searchText){
  axios.get("http://www.omdbapi.com/?apikey=e0620bd4&s="+searchText)
    .then(function(response){	
		let movies = response.data.Search;
		let output = "";
	  
      //console.log(response);
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-4">
            <div class="well text-center">
              <img src="${movie.Poster}" class="img-thumbnail"/>
           <a  href="#"><h5>${movie.Title}</h5></a>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem("movieId", id);
  window.location = "movieinfo.html";
  return false;
}

function getMovieDetails(){
  let id = sessionStorage.getItem("movieId");
  axios.get("http://www.omdbapi.com/?apikey=e0620bd4&i="+id)
    .then(function(response){
      let details = response.data;

      let output ="";
        output =` <div class="row">
          <div class="col-md-4">
            <img src="${details.Poster}" class="img-thumbnail"/>
          </div>
		  
          <div class="col-md-8">
            <h3>${details.Title}</h3>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${details.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${details.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${details.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${details.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${details.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${details.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${details.Actors}</li>
            </ul>
          </div>
        </div>
        
		
		<div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${details.Plot}
            <hr>
            <a href="http://imdb.com/title/${details.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $("#movieinfo").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
