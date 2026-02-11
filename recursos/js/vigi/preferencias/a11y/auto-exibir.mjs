import Preferencia from "../preferencia.mjs";
import { autoExibirTodos as autoPista } from "../../pista.mjs";
import { Collapse } from "../../../bootstrap/bootstrap.min.mjs";

export default class AutoExibir extends Preferencia {
    static get nome()   { return 'autoExibir' }
    static get padrao() { return false }

    static aoMudar(valorNovo, valorAntigo) {
        autoPista(valorNovo);
        autoAccordion(valorNovo);
    }
}

document.querySelectorAll('.accordion > .accordion-item > .accordion-collapse.collapse').forEach(
    /** @param {HTMLElement} elemento */
    elemento => {
        if (elemento.dataset?.bsParent) {
            elemento.dataset.parentOriginal = elemento.dataset.bsParent;
        }
    }
);

AutoExibir.inicializar();

function autoAccordion(autoExibir) {
    document.querySelectorAll('.accordion > .accordion-item > .accordion-collapse.collapse').forEach(
    /** @param {HTMLElement} elemento */
    elemento => {
        if (autoExibir) {
            elemento.removeAttribute('data-bs-parent');
            elemento.classList.add('show');
        } else {
            if (elemento.dataset?.parentOriginal) {
                elemento.setAttribute('data-bs-parent', elemento.dataset.parentOriginal);
            }
        }
        Collapse.getInstance(elemento)?.dispose() && Collapse.getOrCreateInstance(elemento);
    });
}