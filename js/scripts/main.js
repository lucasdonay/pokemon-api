// scripts do slide principal
var slide_hero = new Swiper('.slide-hero', {
  effect: 'fade',
  pagination: {
    el: '.slide-hero .main-area .area-explore .swiper-pagination',
  },
});

// Instanciando variveis

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details-pokemon');
const countPokemon = document.getElementById('js-count-pokemons');
const btnDropdownSelect = document.querySelector('.js-open-select-custom');
const areaPokemons = document.getElementById('js-list-pokemons');
const btnLoadMore = document.getElementById('js-btn-load-more');
const rolaTop = document.getElementById('retornar-top');

// Script dropdown

rolaTop.addEventListener('click', () => {
  let sectionPokemons = document.querySelector('.s-all-info-pokemons');
  let scrollTop = sectionPokemons.offsetTop;
  window.scrollTo({
    top: scrollTop + 290,
    behavior: 'smooth',
  });
});

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
});

if (btnCloseModal) {
  btnCloseModal.addEventListener('click', closeDetailsPokemon);
}

// Function pra transforma primeira letra em maiuscula

function maiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function que lista os pokemons obtendo da api
function listaPokemons(urlApi) {
  axios({
    method: 'GET',
    url: urlApi,
  }).then((response) => {
    const { results, count, next } = response.data;

    countPokemon.innerText = 'Total de ' + count;

    results.forEach((pokemon) => {
      let urlApiDetails = pokemon.url;

      axios({
        method: 'GET',
        url: `${urlApiDetails}`,
      }).then((response) => {
        const { id, name, sprites, types } = response.data;

        const infoCard = {
          nome: name,
          code: id,
          tipo: types[0].type.name,
          tipos: types[1].type.name,
          image: sprites.other.dream_world.front_default,
        };

        createCards(
          infoCard.nome,
          infoCard.code,
          infoCard.tipo,
          infoCard.tipos,
          infoCard.image,
        );

        const cardPokemon = document.querySelectorAll(
          '.js-open-details-pokemon',
        );
        cardPokemon.forEach((card) => {
          card.addEventListener('click', openDetailsPokemon);
        });
      });
    });
  });
}

listaPokemons('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');

// Function criar os cards depois de listados
function createCards(nome, code, tipo, tipos, imagePok) {
  let card = document.createElement('button');
  card.classList = `card-pokemon ${tipo} js-open-details-pokemon`;
  card.setAttribute('code-pokemon', code);
  areaPokemons.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imageSrc = document.createElement('img');
  imageSrc.setAttribute('src', imagePok);
  imageSrc.className = 'thumb-img';
  image.appendChild(imageSrc);

  let infoCardPokemon = document.createElement('div');
  card.appendChild(infoCardPokemon).classList = 'info';

  let infoTextPokemon = document.createElement('div');
  infoCardPokemon.appendChild(infoTextPokemon).classList = 'text';

  let codePokemon = document.createElement('span');
  codePokemon.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  infoTextPokemon.appendChild(namePokemon).textContent = maiuscula(nome);

  let iconPokemon = document.createElement('div');
  iconPokemon.classList = 'icon';
  infoCardPokemon.appendChild(iconPokemon);

  let srcIconPokemon = document.createElement('img');
  srcIconPokemon.setAttribute('src', `/img/icon-types/${tipo}.svg`);
  iconPokemon.appendChild(srcIconPokemon);

  let srcIconPokemon2 = document.createElement('img');
  srcIconPokemon2.setAttribute('src', `/img/icon-types/${tipos}.svg`);
  iconPokemon.appendChild(srcIconPokemon2);
}

// Script Ver mais pokemons + 10

let countPagination = 10;

btnLoadMore.addEventListener('click', showMorePokemons);
function showMorePokemons() {
  listaPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`,
  );

  countPagination = countPagination + 9;

  rolaTop.style.opacity = 1;
}

//Script pra abrir e fechar modal

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');

  let codePokemon = this.getAttribute('code-pokemon');
  let imgPokemon = this.querySelector('.thumb-img');
  let iconPokemon = this.querySelector('.info .icon img');
  let namePokemon = this.querySelector('.info h3').textContent;
  let codigoPokemon = this.querySelector('.info span').textContent;

  const modalDetails = document.getElementById('js-modal-details');
  const imgPokemonModal = document.getElementById('js-image-pokemon-modal');
  const iconPokemonModal = document.getElementById('js-icon-pokemon-modal');
  const namePokemonModal = document.getElementById('js-name-pokemon-modal');
  const codigoPokemonModal = document.getElementById('js-code-pokemon-modal');

  imgPokemonModal.setAttribute('src', imgPokemon.getAttribute('src'));
  modalDetails.setAttribute('type-pokemon-modal', this.classList[1]);
  iconPokemonModal.setAttribute('src', iconPokemon.getAttribute('src'));

  const heightPokemon = document.getElementById('js-height-pokemon');
  const weightPokemon = document.getElementById('js-weight-pokemon');
  namePokemonModal.textContent = namePokemon;
  codigoPokemonModal.textContent = codigoPokemon;

  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`,
  }).then((response) => {
    let data = response.data;

    let infoPokemon = {
      mainAbilitis: maiuscula(data.abilities[0].ability.name),
      types: data.nome,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
      stats: data.stats,
      urlType: data.types[0].type.url,
    };

    heightPokemon.textContent = infoPokemon.height;
    weightPokemon.textContent = infoPokemon.weight;
  });
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

document.addEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    closeDetailsPokemon();
  }
});

//Script pra listar o tipos de pokemons no left-container

const areaTypes = document.getElementById('js-type-area');
const mobileTypes = document.querySelector('.dropdown-select');

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type',
}).then((response) => {
  const { results } = response.data;

  results.forEach((type, index) => {
    if (index < 18) {
      const itemType = document.createElement('li');
      areaTypes.appendChild(itemType);

      const buttonType = document.createElement('button');
      buttonType.classList = `type-filter ${type.name}`;
      buttonType.setAttribute('code-type', index + 1);
      itemType.appendChild(buttonType);

      const iconType = document.createElement('div');
      iconType.classList = 'icon';
      buttonType.appendChild(iconType);

      const srcType = document.createElement('img');
      srcType.setAttribute('src', `/img/icon-types/${type.name}.svg`);
      iconType.appendChild(srcType);

      const spanIcon = document.createElement('span');
      buttonType.appendChild(spanIcon).textContent = maiuscula(type.name);

      // Mobile

      let mobileItemType = document.createElement('li');
      mobileTypes.appendChild(mobileItemType);

      let mobileButtonType = document.createElement('button');
      mobileButtonType.classList = `type-filter ${type.name}`;
      mobileButtonType.setAttribute('code-type', index + 1);
      mobileItemType.appendChild(mobileButtonType);

      let mobileIconType = document.createElement('div');
      mobileIconType.classList = 'icon';
      mobileButtonType.appendChild(mobileIconType);

      let mobileSrcType = document.createElement('img');
      mobileSrcType.setAttribute('src', `/img/icon-types/${type.name}.svg`);
      mobileIconType.appendChild(mobileSrcType);

      let mobileSpanIcon = document.createElement('span');
      mobileButtonType.appendChild(mobileSpanIcon).textContent = maiuscula(
        type.name,
      );
    }

    const allTypes = document.querySelectorAll('.type-filter');

    allTypes.forEach((btn) => {
      btn.addEventListener('click', filterByTypes);
    });
  });
});

function filterByTypes() {
  const idPokemon = this.getAttribute('code-type');

  const allTypes = document.querySelectorAll('.type-filter');
  const areaPokemons = document.getElementById('js-list-pokemons');
  const btnLoadMore = document.getElementById('js-btn-load-more');
  const removeActive = document.querySelector('.select-custom');

  allTypes.forEach((type) => {
    type.classList.remove('active');
  });

  this.classList.add('active');
  removeActive.classList.remove('active');

  areaPokemons.innerHTML = '';
  btnLoadMore.style.display = 'none';

  const sectionPokemons = document.querySelector('.s-all-info-pokemons');
  const scrollTop = sectionPokemons.offsetTop;

  window.scrollTo({
    top: scrollTop + 290,
    behavior: 'smooth',
  });

  let countPagination = 10;
  if (idPokemon) {
    axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
    }).then((response) => {
      const { pokemon } = response.data;

      const countPokemon = document.getElementById('js-count-pokemons');
      countPokemon.textContent = pokemon.length;

      pokemon.forEach((poke) => {
        const { url } = poke.pokemon;

        axios({
          method: 'GET',
          url: `${url}`,
        }).then((response) => {
          const { id, name, sprites, types } = response.data;

          const infoCard = {
            nome: name,
            code: id,
            tipo: types[0].type.name,
            tipos: types[1].type.name,
            image: sprites.other.dream_world.front_default,
          };

          if (infoCard.image) {
            createCards(
              infoCard.nome,
              infoCard.code,
              infoCard.tipo,
              infoCard.tipos,
              infoCard.image,
            );
          }

          const cardPokemon = document.querySelectorAll(
            '.js-open-details-pokemon',
          );
          cardPokemon.forEach((card) => {
            card.addEventListener('click', openDetailsPokemon);
          });

          const selected = document.getElementById('selected');

          selected.textContent = infoCard.tipos;
        });
      });

      // more statements
    });
  } else {
    areaPokemons.innerHTML = '';
    btnLoadMore.style.display = 'block';
    listaPokemons('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }
}

// filtrar os pokemons

const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

btnSearch.addEventListener('click', searchPokemon);

inputSearch.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    searchPokemon();
  }
});
function searchPokemon() {
  let valueInput = inputSearch.value;
  valueInput.toLowerCase();

  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`,
  })
    .then((response) => {
      const { id, name, sprites, types } = response.data;
      const countPokemon = document.getElementById('js-count-pokemons');
      areaPokemons.innerHTML = '';
      btnLoadMore.style.display = 'none';
      countPokemon.textContent = 1;
      const infoCard = {
        nome: name,
        code: id,
        tipo: types[0].type.name,
        tipos: types[1].type.name,
        image: sprites.other.dream_world.front_default,
      };

      if (infoCard.image) {
        createCards(
          infoCard.nome,
          infoCard.code,
          infoCard.tipo,
          infoCard.tipos,
          infoCard.image,
        );
      }

      const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
      cardPokemon.forEach((card) => {
        card.addEventListener('click', openDetailsPokemon);
      });
    })
    .catch((error) => {
      if (error.response) {
        areaPokemons.innerHTML = '';
        btnLoadMore.style.display = 'none';
        countPokemon.textContent = 0;
        alert('nenhum resultado');
      }
    });
}
