
// consumo API: 
const API_KEY = "60231c33f3cd21e8fdceb8cf48a2e7fb";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

try {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro na solicitação da API');
      }
      return res.json();
    })

    .then((data) => {

      let slider = document.querySelector(".card-slider"); // engloba todos os sliders
      slider.innerHTML = "";
      data.results.forEach(filme => {
        slider.innerHTML += `
          <div class="card-wrapper">     
              <article class="card" data-target="modal" data-modal-target="smaller-modal" key="${filme.id}">
              
                  <img class="img-poster" src="https://image.tmdb.org/t/p/original/${filme.poster_path}" alt="${filme.title}" />
                  
                  <div class="card-content">
                      <div class="card-category">
                          <p class="title-category">${filme.vote_average + '★'}</p>
                          <h3 class="card-title">${filme.title}</h3>
                      </div>
                  </div>
              
                </article>   
          </div>
        `;
      });

    });

} catch (error) {
  console.error(error);
};


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

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.card-slider');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  let isAnimating = false;

  nextBtn.addEventListener('click', () => {
    const cardWrapper = slider.querySelector('.card-wrapper');
    const cardWidth = cardWrapper.offsetWidth;

    if (!isAnimating && slider.scrollLeft + slider.clientWidth < slider.scrollWidth) {
      isAnimating = true;
      slider.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  });

  prevBtn.addEventListener('click', () => {
    const cardWrapper = slider.querySelector('.card-wrapper');
    const cardWidth = cardWrapper.offsetWidth;

    if (!isAnimating && slider.scrollLeft > 0) {
      isAnimating = true;
      slider.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  });

  slider.addEventListener('scroll', () => {
    isAnimating = false;
  });
});
