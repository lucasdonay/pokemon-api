"use strict";var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),btnCloseModal=document.querySelector(".js-close-modal-details-pokemon"),countPokemon=document.getElementById("js-count-pokemons"),btnDropdownSelect=document.querySelector(".js-open-select-custom"),areaPokemons=document.getElementById("js-list-pokemons"),btnLoadMore=document.getElementById("js-btn-load-more"),rolaTop=document.getElementById("retornar-top");function maiuscula(e){return e.charAt(0).toUpperCase()+e.slice(1)}function listaPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=e.data,o=t.results,e=t.count;t.next;countPokemon.innerText="Total de "+e,o.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,o=t.id,n=t.name,e=t.sprites,t=t.types,e={nome:n,code:o,tipo:t[0].type.name,tipos:t[1].type.name,image:e.other.dream_world.front_default};createCards(e.nome,e.code,e.tipo,e.tipos,e.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function createCards(e,t,o,n,a){var i=document.createElement("button");i.classList="card-pokemon ".concat(o," js-open-details-pokemon"),i.setAttribute("code-pokemon",t),areaPokemons.appendChild(i);var c=document.createElement("div");c.classList="image",i.appendChild(c);var s=document.createElement("img");s.setAttribute("src",a),s.className="thumb-img",c.appendChild(s);c=document.createElement("div");i.appendChild(c).classList="info";s=document.createElement("div");c.appendChild(s).classList="text";i=document.createElement("span");i.textContent=(t<10?"#00":t<100?"#0":"#").concat(t),s.appendChild(i);i=document.createElement("h3");s.appendChild(i).textContent=maiuscula(e);e=document.createElement("div");e.classList="icon",c.appendChild(e);c=document.createElement("img");c.setAttribute("src","/img/icon-types/".concat(o,".svg")),e.appendChild(c);c=document.createElement("img");c.setAttribute("src","/img/icon-types/".concat(n,".svg")),e.appendChild(c)}rolaTop.addEventListener("click",function(){var e=document.querySelector(".s-all-info-pokemons").offsetTop;window.scrollTo({top:e+290,behavior:"smooth"})}),btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")}),btnCloseModal&&btnCloseModal.addEventListener("click",closeDetailsPokemon),listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");var countPagination=10;function showMorePokemons(){listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9,rolaTop.style.opacity=1}function openDetailsPokemon(){document.documentElement.classList.add("open-modal");var e=this.getAttribute("code-pokemon"),t=this.querySelector(".thumb-img"),o=this.querySelector(".info .icon img"),n=this.querySelector(".info h3").textContent,a=this.querySelector(".info span").textContent,i=document.getElementById("js-modal-details"),c=document.getElementById("js-image-pokemon-modal"),s=document.getElementById("js-icon-pokemon-modal"),m=document.getElementById("js-name-pokemon-modal"),l=document.getElementById("js-code-pokemon-modal");c.setAttribute("src",t.getAttribute("src")),i.setAttribute("type-pokemon-modal",this.classList[1]),s.setAttribute("src",o.getAttribute("src"));var d=document.getElementById("js-height-pokemon"),r=document.getElementById("js-weight-pokemon");m.textContent=n,l.textContent=a,axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){e=e.data,e={mainAbilitis:maiuscula(e.abilities[0].ability.name),types:e.nome,weight:e.weight,height:e.height,abilities:e.abilities,stats:e.stats,urlType:e.types[0].type.url};d.textContent=e.height,r.textContent=e.weight})}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}btnLoadMore.addEventListener("click",showMorePokemons),document.addEventListener("keyup",function(e){"Escape"===e.code&&closeDetailsPokemon()});var areaTypes=document.getElementById("js-type-area"),mobileTypes=document.querySelector(".dropdown-select");function filterByTypes(){var e=this.getAttribute("code-type"),t=document.querySelectorAll(".type-filter"),o=document.getElementById("js-list-pokemons"),n=document.getElementById("js-btn-load-more"),a=document.querySelector(".select-custom");t.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),a.classList.remove("active"),o.innerHTML="",n.style.display="none";a=document.querySelector(".s-all-info-pokemons").offsetTop;window.scrollTo({top:a+290,behavior:"smooth"});e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;document.getElementById("js-count-pokemons").textContent=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,o=t.id,n=t.name,e=t.sprites,t=t.types,e={nome:n,code:o,tipo:t[0].type.name,tipos:t[1].type.name,image:e.other.dream_world.front_default};e.image&&createCards(e.nome,e.code,e.tipo,e.tipos,e.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),document.getElementById("selected").textContent=e.tipos})})}):(o.innerHTML="",n.style.display="block",listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"))}axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var o,n,a;t<18&&(n=document.createElement("li"),areaTypes.appendChild(n),(a=document.createElement("button")).classList="type-filter ".concat(e.name),a.setAttribute("code-type",t+1),n.appendChild(a),(o=document.createElement("div")).classList="icon",a.appendChild(o),(n=document.createElement("img")).setAttribute("src","/img/icon-types/".concat(e.name,".svg")),o.appendChild(n),n=document.createElement("span"),a.appendChild(n).textContent=maiuscula(e.name),a=document.createElement("li"),mobileTypes.appendChild(a),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),a.appendChild(n),(t=document.createElement("div")).classList="icon",n.appendChild(t),(a=document.createElement("img")).setAttribute("src","/img/icon-types/".concat(e.name,".svg")),t.appendChild(a),a=document.createElement("span"),n.appendChild(a).textContent=maiuscula(e.name)),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByTypes)})})});var btnSearch=document.getElementById("js-btn-search"),inputSearch=document.getElementById("js-input-search");function searchPokemon(){var e=inputSearch.value;e.toLowerCase(),axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){var t=e.data,o=t.id,n=t.name,a=t.sprites,e=t.types,t=document.getElementById("js-count-pokemons");areaPokemons.innerHTML="",btnLoadMore.style.display="none",t.textContent=1;a={nome:n,code:o,tipo:e[0].type.name,tipos:e[1].type.name,image:a.other.dream_world.front_default};a.image&&createCards(a.nome,a.code,a.tipo,a.tipos,a.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})}).catch(function(e){e.response&&(areaPokemons.innerHTML="",btnLoadMore.style.display="none",countPokemon.textContent=0,alert("nenhum resultado"))})}btnSearch.addEventListener("click",searchPokemon),inputSearch.addEventListener("keyup",function(e){"Enter"===e.code&&searchPokemon()});