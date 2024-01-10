let openModal = document.querySelectorAll('.openModal');


openModal.forEach(btnOpen => {

    btnOpen.addEventListener('click', event => {

        const currentOpenModal = event.currentTarget.getAttribute('data-modal-target');
        const currentModal = document.querySelector(`#${currentOpenModal}`);

        currentModal.style.display = 'block';

        setTimeout(() => {
            currentModal.style.opacity = "1";
        }, 100)

        document.querySelector('body').style.overflow = 'hidden';

    });

});


let modalClose = document.querySelectorAll('.modal-close');

modalClose.forEach(btnClose => {

    btnClose.addEventListener('click', e => {
        const currentOpenModal = e.currentTarget.getAttribute('data-modal-target');
        const currentModal = document.querySelector(`#${currentOpenModal}`);

        currentModal.style.opacity = "0";

        document.querySelector('video').pause() // Pausa o vídeo caso seja fechado em execução

        setTimeout(() => {
            currentModal.style.display = 'none';
        }, 100)

        document.querySelector('body').style.overflow = 'auto';

    });

});