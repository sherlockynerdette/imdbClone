const BaseUrl = "https://api.themoviedb.org/3";
const apiKey = "f4cc839699ef6e8730f8846861205b87";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const categoryTitle = document.getElementById("category-title");
const searchForm = document.getElementById("search-form");

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${BaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
	const movies = jsonResponse.results;

    displayMovies(movies);
}

async function searchMovies(query) {
    const response = await fetch(`${BaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`);
    const jsonResponse = await response.json();
	const movies = jsonResponse.results;

    displayMovies(movies);
}



function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => 
				`<div class="movie-card">
	            <img src="${imageBaseUrl}${movie.poster_path}"/>
	            <p>⭐${movie.vote_average}</p>
	            <h1>${movie.title}</h1>
	        </div>`
    ).join("");
}


function handleSearchFormSubmit(event) {
    categoryTitle.innerHTML = "Search Results";
    event.preventDefault();
    const searchQuery = searchInput.value; 
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}


searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();
