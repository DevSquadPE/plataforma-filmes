let listMovies = document.querySelector('section.list-movies');

let movies = [
    {
        id: 1,
        title: 'Balloons',
        video: 'assets/videos/balloons.mp4'

    },
    {
        id: 2,
        title: 'Traffic',
        video: 'assets/videos/traffic.mp4'
    }
]

movies.map((movie, index) => {

    listMovies.innerHTML += ` 
        <div class="card-movie" key="${index}" data-target="modal" data-modal-target="smaller-modal">
       
                <h3> ${movie.title} </h3>             
                <div> Lorem Ipsum </div>
            
        </div>
    `
});



let cardMovie = document.querySelectorAll('.card-movie');

cardMovie.forEach((e) => {

   
    e.addEventListener('click', (e) => {

        let dadosFilme = movies[e.currentTarget.getAttribute('key')]

        // console.log(dadosFilme)
        
        // FILMES DO CAROUSEL MAIOR -> MODAL MAIOR
        document.querySelector('.modal-title h5').innerHTML = dadosFilme.title; 
        document.querySelector('.modal-body video source').setAttribute('src', dadosFilme.video);
        document.querySelector('.modal-body video').load();


        // FILMES DO CAROUSEL MENOR -> MODAL MENOR
        // document.getElementById('smaller-modal').style.display = 'block'; // Abre o modal menor
        document.querySelector('.watch-movie-title').innerHTML = dadosFilme.title; 
        document.querySelector('.modal-header video source').setAttribute('src', dadosFilme.video);

        document.querySelector('.modal-header video').load();

    })
})


