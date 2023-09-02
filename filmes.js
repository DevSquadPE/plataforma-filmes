const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
async function getGenresID() {
  const url = "https://api.themoviedb.org/3/genre/tv/list?api_key=" + API_KEY;
  fetch(url)
    .then((res) => res.json())
    .then((c) => console.log(c));
}

async function getLanguages() {
  const url =
    "https://api.themoviedb.org/3/configuration/languages?api_key=" + API_KEY;
  fetch(url)
    .then((res) => res.json())
    .then((c) => console.log(c.find((i) => i.name == "Português")));
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
  const moviesContainer = document.querySelectorAll(".movies-container");
  console.log(genres);

  const createImageURL = (url) => {
    if (!url) return "";
    return IMAGE_URL + url;
  };

  for (let i = 0; i < genres.length; i++) {
    for (const movie of genres[i].list) {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");
      movieCard.style.backgroundImage = `url(${createImageURL(
        movie.poster_path
      )})`;

      const movieRating = document.createElement("div");
      movieRating.classList.add("movie-rating");
      movieRating.innerHTML = `<span class="filled" style="width:${convertRating(
        movie.vote_average
      )}"></span><span class="unfilled"></span>`;

      const movieTitle = document.createElement("span");
      movieTitle.classList.add("movie-title");
      movieTitle.innerText = movie.title;

      movieCard.appendChild(movieRating);
      movieCard.appendChild(movieTitle);
      moviesContainer[i].appendChild(movieCard);
    }
  }
}

const movieWrapper = document.querySelectorAll(".movie-wrapper");

let pressed = false;
let startX;
let x;

function addSliderListeners() {
  movieWrapper.forEach((slider) => {
    const moviesContainer = slider.querySelector(".movies-container");

    slider.addEventListener("mousedown", (e) => {
      pressed = true;
      startX = e.offsetX - moviesContainer.offsetLeft;
      slider.style.cursor = "grab";
    });
    slider.addEventListener("mouseup", () => {
      slider.style.cursor = "grab";
      pressed = false;
    });
    slider.addEventListener("mousemove", (e) => {
      if (!pressed) return;
      e.preventDefault();
      x = e.offsetX;

      moviesContainer.style.left = move() + "px";
      if (parseInt(moviesContainer.style.left) > 0)
        moviesContainer.style.left = "0px";
      if (parseInt(moviesContainer.style.left) < -4548)
        moviesContainer.style.left = "-4548px";
    });
  });
}

const move = () => {
  const slides = parseInt((x - startX) / 300);
  if (slides == 0) return 0;
  return slides * 300;
};

const convertRating = (rating) => {
  return `${(rating / 10) * 150}px`;
};

fetchByGenre().then(renderByGenre).then(addSliderListeners);
