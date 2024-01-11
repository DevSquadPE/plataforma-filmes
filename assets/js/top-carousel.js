const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true`;


// PEGA O TOTAL DE SLIDERS (CAROUSELS)
let totalSliders = 0;

async function mostVotedFilmsCarousel() {
    const carouselItems = document.querySelector('#carousel-items');

    carouselItems.innerHTML = "";

    const req = await fetch(URL);
    const res = await req.json();

    res.results.map(movie =>

        carouselItems.innerHTML += `
        <div class="carousel-item" style="background-image: url(${IMAGE_URL}/${movie.backdrop_path});">
        
            <div class="movie-details">     
                <h1>🎞️ ${movie.title}</h1>
                <p>${movie.overview}</p>
        
                <a href="#" class="btn" data-target="modal" data-modal-target="bigger-modal" key="${movie.id}">&#9654 Ver trailler</a>
            </div>
        </div>
        `
    );

    // Atualiza a qtd de itens no carousel
    totalSliders = document.querySelectorAll('.carousel-item').length;

};

mostVotedFilmsCarousel();


let currentSlide = 0;

// Define altura dos botões controladorres
document.querySelector('#carousel-controls').style.height = `${document.querySelector('#carousel').clientHeight}px`;


// FUNÇÕES PARA VOLTAR/AVANÇAR DE SLIDE
function goPrev() {
    // Decrementa posição -> volta para o slide anterior
    currentSlide--;

    // Verificação para quando estiver no 1º Slide mandar para o último
    if (currentSlide < 0) {
        currentSlide = totalSliders - 1;
    }

    // Função para atualizar a margem
    updateMargin();
};


function goNext() {
    // Incrementa posição -> Avança para o próximo slide
    currentSlide++;

    // Faz a conta para saber se avança para o próximo ou se volta para o 0
    if (currentSlide > (totalSliders - 1)) {
        currentSlide = 0;
    }

    // Função para atualizar a margem
    updateMargin();

};


// ATUALIZA A MARGIN e faz o processo de troca acontecer
function updateMargin() {

    // Referência de largura => 1 carousel/slider
    let slideItemWidth = document.querySelector('.carousel-item').clientWidth;

    // Define a nova margem a ser setada
    let newMargin = (currentSlide * slideItemWidth);

    document.querySelector('#carousel-items').style.marginLeft = `-${newMargin}px`;
};


// Passa os sliders/carolsels a cada 3seg de forma automática
// setInterval(goNext, 5000);