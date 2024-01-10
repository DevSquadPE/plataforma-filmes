// PEGA O TOTAL DE SLIDERS (CAROUSELS)
let totalSliders = document.querySelectorAll('.carousel-item').length;


// SLIDE QUE INICIA = 0
let currentSlide = 0;

// Largura total do Carousel -> Pega a largura total do dispositivo e multiplica pelo total de sliders
document.querySelector('#carousel-items').style.width = `calc(100vw * ${totalSliders})`;

// Define altura dos botões controladorres
document.querySelector('#carousel-controls').style.height = `${document.querySelector('#carousel').clientHeight}px`;


// FUNÇÕES PARA VOLTAR/AVANÇAR DE FOTO
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
setInterval(goNext, 3000);