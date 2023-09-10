
const modal = document.querySelector('#bigger-carousel');

// Abre o modal
document.querySelector('[data-toggle="modal"]').addEventListener('click', () => {
    
    modal.style.display = 'block';
    
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 100)

    document.querySelector('body').style.overflow = 'hidden';
    
});


// Fecha o modal
document.querySelector('.modal-close').addEventListener('click', () => {
    
    modal.style.opacity = "0";

    document.querySelector('video').pause() // Pausa o vídeo caso seja fechado em execução

    setTimeout(() => {
        modal.style.display = 'none';
    }, 100)
    
    document.querySelector('body').style.overflow = 'auto';
});



