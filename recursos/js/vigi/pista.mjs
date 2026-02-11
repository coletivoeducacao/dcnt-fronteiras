document.addEventListener('keydown', event => {
    const labelPista = event.target.closest('label.pista');

    if (labelPista) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            labelPista.click();
        }
    }
});

// =========================
//            2.0           
// =========================

/**
 * @constant
 * @type {Pista[]}
 */
export const instancias = [];

/**
 * Pista
 *
 * @class Pista
 * @typedef {Pista}
 */
export class Pista {
    
    /**
     * Cria uma instância de Pista
     *
     * @constructor
     * @param {HTMLElement} elemento
     */
    constructor(elemento) {
        if (!elemento.matches('.pista')) {
            throw new Error('O elemento deve possuir a classe "pista".');
        }

        this.elemento = elemento;

        this.#trocarTag('label', [{'name': 'aria-role', 'value': 'button'}]);

        this.input = document.createElement('input');
        this.input.setAttribute('type', 'checkbox');
        this.input.setAttribute('name', 'pista');
        this.elemento.prepend(this.input);

        this.#salvaAtributosOriginais();
        this.#atualizaAtributos();

        this.input.addEventListener('change', () => {
            this.#atualizaAtributos();
        });

        instancias.push(this);
    }

    get elementos() {
        return this.elemento.querySelectorAll('*:not(input[name="pista"], summary, summary > *)');
    }

    #salvaAtributosOriginais() {
        this.elementos.forEach(elemento => {
            elemento.dataset.tabindexOriginal = elemento.tabIndex;
        });
    }

    #atualizaAtributos(externo = false) {
        this.elementos.forEach(elemento => {
            if (elemento.dataset.hasOwnProperty('tabindexOriginal')) {
                elemento.removeAttribute('tabindex');
                const tabindexOriginal = this.eExibido() ? elemento.dataset.tabindexOriginal : '-1';
                if (!this.eExibido() || (this.eExibido() && elemento.tabIndex != tabindexOriginal)) {
                    elemento.setAttribute('tabindex', tabindexOriginal);
                }
            } else {
                elemento.removeAttribute('tabindex');
            }

            if (elemento.dataset.hasOwnProperty('pistaHidden')) {
                if (this.eExibido()) {
                    elemento.removeAttribute('hidden');
                 } else {
                    elemento.setAttribute('hidden', '');
                 }
            }
            if (this.eExibido()) {
                elemento.removeAttribute('aria-hidden');
            } else {
                elemento.setAttribute('aria-hidden', '1');
            }
        });
        if (this.eExibido()) {
            if (!externo) this.input.classList.add('pista-exibida');
            this.input.setAttribute('disabled', '');
            this.elemento.removeAttribute('tabindex');
            this.#trocarTag('div');
        } else {
            this.input.removeAttribute('disabled');
            this.elemento.setAttribute('tabindex', this.elemento.getAttribute('tabindex') ?? '0');
        }
    };

    eExibido() {
        return this.input.checked
    }

    setExibido(valor) {
        if (!valor && this.input.classList.contains('pista-exibida')) {
            return;
        }
        this.#trocarTag(valor ? 'div' : 'label', valor ? [] : [{'name': 'aria-role', 'value': 'button'},{'name': 'onClick', 'value': ''}]);
        this.input.checked = valor;
        this.#atualizaAtributos(true);
    }

    #trocarTag(nomeTag, attributes = []) {
        // Cria um novo elemento do tipo escolhido
        const novoElemento = document.createElement(nomeTag);

        // Copia atributos do elemento antigo
        for (let atributo of this.elemento.attributes) {
            novoElemento.setAttribute(atributo.name, atributo.value);
        }

        for (let atributo of attributes) {
            novoElemento.setAttribute(atributo.name, atributo.value);
        }

        // Move os nós filhos (conteúdo) para o novo elemento
        while (this.elemento.firstChild) {
            novoElemento.appendChild(this.elemento.firstChild);
        }

        //Substitui o elemento antigo pelo novo no DOM
        this.elemento.parentNode.replaceChild(novoElemento, this.elemento);
        this.elemento = novoElemento;
    }
}

document.querySelectorAll('.pista').forEach(input => {
    new Pista(input);
});

export function autoExibirTodos(valor) {
    instancias.forEach(i => {
        i.setExibido(valor);
    });
}