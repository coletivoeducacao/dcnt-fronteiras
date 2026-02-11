
import { getValorDoCookie, setValorDoCookie } from '../cookies.mjs'
import { gTagConfig } from '../gtag/gtag-config.mjs';

export default class Preferencia {
    /**
     * Nome da preferência.
     */
    static get nome() { return '' }

    /**
     * Valor padrão
     */
    static get padrao() { return null }

    /**
     * Carrega o valor salvo no cookie pela primeira vez.
     * 
     * Também adiciona a preferência como um parametro de evento no Google Analytics.
     * 
     * Deve ser executado logo após a definição da classe.
     */
    static inicializar() {
        this.aoMudar(this.valor, Preferencia.padrao);
        gTagConfig['preferencia' + this.nome.charAt(0).toUpperCase() + this.nome.slice(1)] = this.valor;
    }

    static get valor() {
        const preferencias = this.getTodasAsPreferencias();
        return Object.hasOwn(preferencias,this.nome) ? preferencias[this.nome] : this.padrao;
    };

    static set valor(valor) {
        let preferencias = this.getTodasAsPreferencias();
        const valorAntigo = this.valor;
        preferencias[this.nome] = valor;
        this.aoMudar(preferencias[this.nome], valorAntigo);
        setValorDoCookie('vigi_preferencias', JSON.stringify(preferencias));
        return valor;
    }

    static getTodasAsPreferencias() {
        const json = getValorDoCookie('vigi_preferencias')
        if (json) {
            return JSON.parse(json);
        } else {
            return {};
        }
    }

    /**
     * Esquece preferência do usuário removendo-a do cookie.
     */
    static esquecer() {
        const preferencias = this.getTodasAsPreferencias();
        if (Object.hasOwn(preferencias,this.nome)) {
            const valorAntigo = preferencias[this.nome];
            const resultado = delete preferencias[this.nome];
            setValorDoCookie('vigi_preferencias', JSON.stringify(preferencias));
            this.aoMudar(this.padrao, valorAntigo);
            return resultado;
        }
        return false;
    }

    /**
     * Essa preferência está salva no cookie?
     * @returns {Boolean}
     */
    static isDefinida() {
        const preferencias = this.getTodasAsPreferencias();
        return preferencias.hasOwn(this.nome);
    }

    /**
     * Executa ao mudar de valor.
     */
    static aoMudar(valorNovo, valorAntigo) {
        // Implementar ao extender
    }
}