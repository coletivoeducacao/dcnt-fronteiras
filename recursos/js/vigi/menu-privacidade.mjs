import GA from './preferencias/privacidade/ga.mjs';

const tab = document.getElementById('menu-privacidade-tab');
const form = document.getElementById('menu-privacidade-form');
const botaoGA = form.querySelector('#botao-ga');

tab.addEventListener('show.bs.tab', event => {
    botaoGA.checked = GA.valor;
});

// Botão de alternância para Google Analytics
botaoGA.addEventListener('change', event => {
    GA.valor = event.target.checked;
});

/**
 * Botão reset
 */
form.querySelector('button[type="reset"]')
    .addEventListener('click', () => {
        GA.esquecer();
    }
)