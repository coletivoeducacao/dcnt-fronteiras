const html = document.querySelector('html[data-vigi-type="inicio"]');

if (html) {
    window.addEventListener('scroll', eDeslocado, false);
    window.addEventListener('DOMContentLoaded', eDeslocado, false);
}

function eDeslocado() {
    if (html.scrollTop > html.clientHeight * .25) {
        html.classList.add('deslocado');
    } else {
        html.classList.remove('deslocado')
    }
}