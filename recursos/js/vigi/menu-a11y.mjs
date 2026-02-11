import Tema from './preferencias/a11y/tema.mjs';
import TamanhoDoTexto from './preferencias/a11y/tamanho-do-texto.mjs';
import AutoExibir from './preferencias/a11y/auto-exibir.mjs';

const tab = document.getElementById('menu-acessibilidade-tab');
const form = document.getElementById('menu-acessibilidade-form');

// Atualiza valores do menu
tab.addEventListener('show.bs.tab', event => {
    form.querySelector(`input[name="tema"][value="${Tema.valor}"]`).checked = true;
    form.querySelector(`input[name="tamanhoDoTexto"][value="${TamanhoDoTexto.valor}"]`).checked = true;
    form.querySelector('input[name="autoExibir"]').checked = AutoExibir.valor;
});

/**
 * Tema
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (Tema.valor === 'auto') {
        Tema.aoMudar(Tema.valor, Tema.valor);
    }
});

form.querySelectorAll('input[name="tema"]').forEach(radio => {
    radio.addEventListener('click', () => {
        Tema.valor = radio.value;
    })
})

/**
 * Tamanho do texto
 */
form.querySelectorAll('input[name="tamanhoDoTexto"]').forEach(radio => {
    radio.addEventListener('click', () => {
        TamanhoDoTexto.valor = radio.value
    })
});

/**
 * Exibir conteúdos ocultos automaticamente
 */
form.querySelector('input[name="autoExibir"]')
    .addEventListener('change', event => {
        AutoExibir.valor = event.target.checked;
    });

/**
 * Botão reset
 */
form.querySelector('button[type="reset"]')
    .addEventListener('click', () => {
        Tema.esquecer();
        TamanhoDoTexto.esquecer();
        AutoExibir.esquecer();
    }
)
