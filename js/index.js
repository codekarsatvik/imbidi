$(document).ready(() => {
  getMovies("India");
  $('#searchForm').on('submit', (e) => {

    let searchText = $('#searchText').val();

    getMovies(searchText);
    e.preventDefault();
  });
});
function getMovies(searchText){
  // console.log(searchText);
  axios.get('http://www.omdbapi.com/?apikey=a74dd11d&s='+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
        <div class="card col-md-2" >
<img src="${movie.Poster}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${movie.Title}</h5>
  <p class="card-text">Released : ${movie.Year}</p>
  <a  onclick="getMovie('${movie.imdbID}')" class="btn btn-primary" data-target="#myModal" data-toggle ="modal">DETAILS</a>

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

function getMovie(id){
  let movieId = id;

  axios.get('http://www.omdbapi.com/?apikey=a74dd11d&i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="card ">
        <img src="${movie.Poster}" class="card-img-top modal" alt="...">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>



            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>

            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>

              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

          </div>

      `;

      $('#myModal').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
