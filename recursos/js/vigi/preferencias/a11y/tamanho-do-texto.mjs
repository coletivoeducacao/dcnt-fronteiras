import Preferencia from "../preferencia.mjs";

export default class TamanhoDoTexto extends Preferencia {
    static get nome()   { return 'tamanhoDoTexto' }
    static get padrao() { return 1 }

    static aoMudar(valorNovo, valorAntigo) {
        document.documentElement.style.setProperty("font-size", `${valorNovo}em`);
    }
}

TamanhoDoTexto.inicializar();
