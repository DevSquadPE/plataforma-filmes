function renderizarListaDeFilmes(filmes) {
    return `
    <li class="movielist ${card-content}">
            <span class="cardSlide">#${card-slider}</span>
            <span class="cardtitle">${card-title}</span>
            <span class="titlecategory">${title-category}</span>

            <div class="detail">
            <ol class="types">
            ${listaFilmes.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${listaFilmes.photo}"
                     alt="${listaFilmes.name}">
            </div>
        </li>
        `
}
