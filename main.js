(function(){
    let salaPkm = document.querySelector('.sala-pokemon');
    let options = document.getElementById('options');
    let input = document.getElementById('selecionar');
    let pkmSelected = document.getElementById('img-selected');
    let btn = document.getElementById('btn');
    let loader = document.getElementById('loader');
    let listaPkm = [];



    // MAIN
    traerPkms(1, 100);

    input.addEventListener('click',()=>{
        input.value = "";
    })

    input.addEventListener('change', ()=>{
        loader.classList.add('mostrar')

        let selecion = input.value;
        actualizarSelecion(selecion);
        if(validarSelecion(selecion)){
            btn.style.opacity = 0.7;
        }else{
            btn.style.opacity = 1;
        }
        loader.classList.remove('mostrar')
    })

    btn.onclick = ()=> {
        let pokemon = getPokemon(input.value);
        if(pokemon != false && !validarSelecion(input.value)){
            btn.style.opacity = 1;
            addPkm(pokemon);
            setDisable(input.value, 'disable');
        }
        else{
            btn.style.opacity = 0.7;
        }
    }
    
})();
