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
        <div class="card-movie" key="${index}">
       
       <h3> ${movie.title} </h3>
        
        <div> Lorem Ipsum </div>
        
        </div>
    `

});


// Testando mudança de 'imagem '
let header = document.querySelector('header a');


let cardMovie = document.querySelectorAll('.card-movie');

cardMovie.forEach((e) => {

   
    e.addEventListener('click', (e) => {

        let dadosFilme = movies[e.currentTarget.getAttribute('key')]

        // console.log(dadosFilme)
        
        header.innerHTML = dadosFilme.title;

        // Configurações modal
        document.querySelector('.modal-title h5').innerHTML = dadosFilme.title
        document.querySelector('.modal-body video source').setAttribute('src', dadosFilme.video);

        document.querySelector('.modal-body video').load();

    })
})

