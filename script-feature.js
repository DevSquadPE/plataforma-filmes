
// consumo API: 

const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false`)
.then(res => {
  if (!res.ok) {
    throw new Error('Erro na solicitação da API');
  }
 return res.json();
})

.then((data) => {
  const filmes = data.results;
  renderizarListaDeFilmes(filmes);
})

.catch((error) => console.error(error))

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