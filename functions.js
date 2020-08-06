
async function traerPkms(inicio, fin){
    for(let i=inicio; i<=fin; i++){
       await traer(i);
       actualizarOptions();
    }
}

async function traer(id){
    let objeto = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); 
    let dato = await objeto.json()
    listaPkm.push(dato);      
}

function actualizarSelecion(dato) {
    let pokemon = getPokemon(dato);
    if(pokemon != false){
        let url = pokemon.sprites.other.dream_world.front_default;
        pkmSelected.src = url;
    }
}

function actualizarOptions() {
    let fragmento = document.createDocumentFragment();
    listaPkm.forEach(element=>{
        let option = document.createElement('option');
        option.className = element.id;          
        option.innerHTML = element.name;
        option.value = element.name;
        fragmento.appendChild(option);
    })
    options.innerHTML = "";
    options.appendChild(fragmento);
}


function addPkm(pokemon ){
    let fragment = document.createDocumentFragment();
    let url_card = 'card.html';
    let card = document.createElement('div');
    card.className = "card";
    let urlPkm = pokemon.sprites.other.dream_world.front_default;
    let nombre = pokemon.name;
    ajax(url_card).then(resp => {
        card.innerHTML = resp;
        card.children[0].children[0].children[0].src = urlPkm;
        card.children[0].children[1].children[0].innerHTML = nombre;
        card.children[0].children[1].children[1].children[0].onclick = eliminarCard;

        for(let i=0; i< pokemon.types.length; i++){
            let habilidad = document.createElement('div');
            habilidad.className = pokemon.types[i].type.name;
            habilidad.innerHTML = pokemon.types[i].type.name;
            fragment.appendChild(habilidad);
        }
        card.children[0].children[1].children[2].appendChild(fragment);
        salaPkm.appendChild(card);
    })
    .catch(err => console.log(err))
}


function ajax(url){
    return new Promise((reg, res)=>{
        let lista;
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function(){
            if(xhr.status === 200){
                reg(xhr.response);
            }
        }
        xhr.send();
    })  
}


function getPokemon(dato){
    for(let i=0; i< listaPkm.length; i++){
        if(listaPkm[i].name === dato){
            let ret = listaPkm[i];
            return ret;
        }
    }
    return false;
}

function validarSelecion(dato){
    let disable = 'disable';
    for(let i=0; i< options.children.length; i++){
        if(options.children[i].value === dato){
            if(options.children[i].classList.contains(disable)){
                return true;
            }
        }
    }
    return false;
}


function setDisable(dato, nuevaClas){
    for(let i=0; i< options.children.length; i++){
        if(options.children[i].value === dato){
            options.children[i].classList.toggle(nuevaClas);
        }
    }
}

function eliminarCard(event){
    let card = event.target.parentNode.parentNode.parentNode.parentNode;
    setDisable(card.children[0].children[1].children[0].innerHTML, "disable");
    card.remove();
}