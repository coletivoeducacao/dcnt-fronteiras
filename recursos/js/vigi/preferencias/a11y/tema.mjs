import Preferencia from "../preferencia.mjs";
import { gTagConfig } from '../../gtag/gtag-config.mjs';

export default class Tema extends Preferencia {
    static get nome()   { return 'tema' }
    static get padrao() { return 'auto' }

    static aoMudar(valorNovo, valorAntigo) {
        this.#aplicarTema(valorNovo);
    }

    /**
     * Altera o atributo "data-bs-theme" do elemento <html>.
     * @param {string} valorNovo auto, light, dark ou highcontrast
     */
    static #aplicarTema(valor) {
        if (valor === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', valor)
        }
    }

    static getNomeDoTema() {
        if ( this.valor === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            return this.valor;
        }
    }

    static inicializar() {
        this.aoMudar(this.valor, this.padrao);
        gTagConfig['preferencia' + this.nome.charAt(0).toUpperCase() + this.nome.slice(1)] = this.getNomeDoTema();
    }
}

Tema.inicializar();
