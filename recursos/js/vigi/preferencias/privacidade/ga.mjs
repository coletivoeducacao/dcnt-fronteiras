import Preferencia from "../preferencia.mjs";
import { setValorDoCookie } from "../../cookies.mjs";
import { gTagID } from "../../gtag/gtag-config.mjs";

export default class GA extends Preferencia {
    static get nome()   { return 'GA' }
    static get padrao() { return null }

    static aoMudar(valorNovo, valorAntigo) {
        gtag('consent', 'update', {'analytics_storage': valorNovo ? 'granted' : 'denied'});
        if (!valorNovo) {
            setValorDoCookie('_ga', null, -1);
            setValorDoCookie(`_ga_${gTagID.split('-')[1]}`, null, -999);
        }
    }
}

// Não precisa inicializar. Módulo google-analytics faz esse trabalho.
