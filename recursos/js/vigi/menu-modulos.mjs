import { abrir, exibirAba } from "./menu.mjs"
import { exibirSlide } from "./modulos.mjs"

// Usada para saber se temos um slide especifico para ser exibido.
let exibindoAula = null;

export const carousel = document.getElementById('modulosCarrosselMenu');

document.addEventListener('click', function(event) {
    const btnMenuModulo = event.target.closest(':is(a,button)[data-vigi-menu-modulo]');
    const btnMenuAula = event.target.closest(':is(a,button)[data-vigi-menu-aula]');

    if (btnMenuModulo) {
        event.preventDefault();
        const moduloIndex = btnMenuModulo.getAttribute('data-vigi-menu-modulo') || null;
        if (btnMenuAula) {
            const aulaIndex = btnMenuAula.getAttribute('data-vigi-menu-aula') || 0;
            exibirAula(moduloIndex, aulaIndex)
        } else {
            exibirModulo(moduloIndex);
        }
    }
});

carousel.addEventListener('slide.bs.carousel', event => {
    const conteudo = carousel.closest('#menu-conteudo');
    if (conteudo) {
        conteudo.scrollTop = 0;
    }
});

const aba = document.querySelector('#menu-modulos-tab');
aba.addEventListener('show.bs.tab', event => {
    if (exibindoAula === null) {
        exibirSlide(carousel, 0);
    }
})
aba.addEventListener('click', event => {
    exibirSlide(carousel, 0);
})

export function exibirModulo(moduloIndex) {
    exibirSlide(carousel, 0);
    exibirAba('modulos');
    abrir();
    if (moduloIndex) {
        carousel.querySelector(`.seletor-modulos > button:nth-child(${moduloIndex})`)?.focus({focusVisible: true});
    }
}

export function exibirAula(moduloIndex, aulaIndex = null) {
    exibindoAula = true;
    exibirSlide(carousel, moduloIndex);
    exibirAba('modulos');
    abrir();
    exibindoAula = null;
    if (aulaIndex) {
        const primeiroTopico = carousel.querySelector(`.carousel-item:nth-child(${1 + +moduloIndex}) .aula-${aulaIndex} h2`);
        primeiroTopico?.focus({focusVisible: true});
        primeiroTopico?.scrollIntoView();
    }
}

export function getIndexPorNome(nome) {
    const slide = carousel.querySelector(`.slide-${nome}`);
    return Array.prototype.indexOf.call(slide.parentElement.children, slide);
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'l':
            event.preventDefault();
            exibirAula(getIndexPorNome('luana'));
            break;

        case 't':
            event.preventDefault();
            exibirAula(getIndexPorNome('thiago'));
            break;

        case 'm':
            event.preventDefault();
            exibirAula(getIndexPorNome('mariana'));
            break;

        case 'p':
            event.preventDefault();
            exibirAula(getIndexPorNome('pedro'));
            break;

        default:
            break;
    }
});