
// consumo API: 

const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";




try {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false`)
.then(res => {
  if (!res.ok) {
    throw new Error('Erro na solicitação da API');
  }
 return res.json();
})

.then((data) => {
  data.results.forEach(filme => {
    var cardWrapper = document.createElement("div");
cardWrapper.className = "card-wrapper";
var slider = document.querySelector(".card-slider");

var cardArticle = document.createElement("article");
cardArticle.className = "card";
var img = document.createElement("img");
img.className = "img-poster";
img.src = `https://image.tmdb.org/t/p/original/${filme.poster_path}`

var content = document.createElement("div");
content.className = "card-content";

var category = document.createElement("div")
category.className = "card-category";

var star = "★";

var titleCategory = document.createElement("p");
titleCategory.className = ("title-category"); 
titleCategory.textContent = filme.vote_average + star;

var titleCard = document.createElement("h3");
titleCard.className = "card-title";
titleCard.textContent = filme.title; 

cardWrapper.appendChild(cardArticle);
slider.appendChild(cardWrapper);
content.appendChild(category);
content.appendChild(titleCard);
category.appendChild(titleCategory);
category.appendChild(titleCard);
cardArticle.appendChild(img);
cardArticle.appendChild(content);

  })

}) 

} catch (error) {
  console.error(error);
}

//Cards - criação de divs



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

// slide função botão: 

 const slide = [...document.querySelectorAll('.card-slider')];
 const nextBtn = document.getElementById('nextBtn');
 const prevBtn = document.getElementById('prevBtn'); 

slide.forEach((item) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width; 

  nextBtn.addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })

  prevBtn.addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })

})