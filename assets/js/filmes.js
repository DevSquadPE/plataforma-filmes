const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
async function getGenresID() {
  const url = "https://api.themoviedb.org/3/genre/tv/list?api_key=" + API_KEY;
  fetch(url)
    .then((res) => res.json())
    .then((c) => console.log(c));
}

const genres = [
  { id: 28, name: "Ação", list: [] },
  { id: 12, name: "Aventura", list: [] },
  { id: 16, name: "Animação", list: [] },
  { id: 35, name: "Comédia", list: [] },
  { id: 80, name: "Policial", list: [] },
  { id: 99, name: "Documentário", list: [] },
  { id: 18, name: "Drama", list: [] },
  { id: 10751, name: "Família", list: [] },
  { id: 14, name: "Fantasia", list: [] },
  { id: 36, name: "Histórico", list: [] },
  { id: 27, name: "Terror", list: [] },
  { id: 10402, name: "Musical", list: [] },
  { id: 9648, name: "Mistério", list: [] },
  { id: 10749, name: "Romance", list: [] },
  { id: 878, name: "Ficção Científica", list: [] },
  { id: 10770, name: "Filmes para TV", list: [] },
  { id: 53, name: "Thriller", list: [] },
  { id: 10752, name: "Guerra", list: [] },
  { id: 37, name: "Ocidental", list: [] },
];

async function fetchByGenre() {
  await Promise.all(
    genres.map(async (genre) => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`;
      return fetch(url)
        .then((res) => res.json())
        .then((i) => (genre.list = i.results));
    })
  );
}

async function renderByGenre() {
  const mainContainer = document.querySelector("#main-container");
  const createImageURL = (url) => {
    if (!url) return "";
    return IMAGE_URL + url;
  };

  for (let i = 0; i < genres.length; i++) {
    const genreContainer = document.createElement("div");
    genreContainer.className = "container";
    genreContainer.innerHTML += ` <h1>${genres[i].name}</h1>`;

    const moviesSlider = document.createElement("div");
    moviesSlider.className = "movies-slider";

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.title = "Next";
    nextButton.className = "nextBtn";
    nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="2em" viewBox="0 0 320 512">
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
  </svg>`;

    const prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.title = "Preview";
    prevButton.className = "prevBtn";
    prevButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="2em" viewBox="0 0 320 512">
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
  </svg>`;

    const moviesWrapper = document.createElement("div");
    moviesWrapper.className = "movies-wrapper";

    mainContainer.appendChild(genreContainer);
    genreContainer.append(prevButton, nextButton, moviesSlider);

    for (const movie of genres[i].list) {
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.style.backgroundImage = `url(${createImageURL(
        movie.poster_path
      )})`;

      const movieRating = document.createElement("div");
      movieRating.className = "movie-rating";
      movieRating.innerHTML = `<span class="filled" style="width:${convertRating(
        movie.vote_average
      )}"></span><span class="unfilled"></span>`;

      const movieTitle = document.createElement("span");
      movieTitle.className = "movie-title";
      movieTitle.innerText = movie.title;

      movieCard.append(movieRating, movieTitle);
      moviesWrapper.appendChild(movieCard);
    }
    moviesSlider.appendChild(moviesWrapper);

    const sliderWidth = moviesSlider.getBoundingClientRect().width;

    nextButton.addEventListener("click", () => {
      moviesSlider.scrollLeft += sliderWidth;
    });
    prevButton.addEventListener("click", () => {
      moviesSlider.scrollLeft -= sliderWidth;
    });
  }
}

const convertRating = (rating) => {
  return `${((rating / 10) * 150) / 10}rem`;
};

fetchByGenre().then(renderByGenre);
