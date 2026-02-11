import { Carousel } from "../bootstrap/bootstrap.min.mjs";

const modulosCarrossel = document.querySelectorAll('.modulos-carrossel');

modulosCarrossel.forEach(moduloCarrossel => {
    //const seletor = document.getElementsByClassName('seletor-modulos');
    //const botoesAulas = seletor.querySelectorAll('button');
    const inner = moduloCarrossel.querySelector('.carousel-inner');
    
    moduloCarrossel.addEventListener('slid.bs.carousel', event => {
        //event.relatedTarget
        //event.to
        const botoes = inner.querySelectorAll('.carousel-item button');
        if (event.to === 0) {
            botoes[event.from - 1].focus();
        } else {
            event.relatedTarget.querySelector('button').focus();
        }
    })
});

export function exibirSlide(elemCarrossel, index) {
    const hidden = !elemCarrossel.checkVisibility?.() || false;
    const carrossel = Carousel.getOrCreateInstance(elemCarrossel);
    if (hidden) {
        elemCarrossel.classList.remove('slide'); // Remover classe "slide" remove animação de transição
    }
    carrossel.to(index);
    if (hidden) {
        elemCarrossel.classList.add('slide');
    }
}