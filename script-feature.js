// function StarsFromAPI() {
//     var rating = RatingFromAPI();
//     $(".icon-star").removeClass("active"); 
//     $(".icon-star[data-rating='" + rating + "']").prevAll().addBack().addClass("active");
//   }

const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const URL = "https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt&sort_by=popularity.desc&include_adult=false"


// hover setas - cards populares:

let cards = document.querySelectorAll('.container');
let buttons = document.querySelectorAll('.buttonPrev');

cards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    buttons.forEach((button) => {
      button.style.opacity = '1';
    });
  });

  card.addEventListener('mouseout', () => {
    buttons.forEach((button) => {
      button.style.opacity = '0';
    });
  });
});

