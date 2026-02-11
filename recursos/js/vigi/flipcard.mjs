class Flipcard {
    constructor(elemento) {
        if (!elemento.classList.contains('flipcard')) {
            throw new Error('O elemento deve ter a classe "flipcard".');
        }

        this.flipcard = elemento;

        this.input = this.flipcard.querySelector(':scope > input');
        if (!this.input) {
            throw new Error('Input não encontrado.');
        }

        this.botaoFrente = this.flipcard.querySelector('.flipcard-frente .flipcard-btn');
        if (!this.botaoFrente) {
            throw new Error('Botão do lado da frente não encontrado.');
        }

        this.botaoVerso = this.flipcard.querySelector('.flipcard-verso .flipcard-btn');
        if (!this.botaoVerso) {
            throw new Error('Botão do lado da verso não encontrado.');
        }

        this.botaoFrente.addEventListener('click', () => {
            this.input.checked = !this.input.checked;
            this.botaoVerso.focus();
        })

        this.botaoVerso.addEventListener('click', () => {
            this.input.checked = !this.input.checked;
            this.botaoFrente.focus();
        })
    }
}

document.querySelectorAll('.flipcard').forEach(elementoFlipcard => {
    try {
        new Flipcard(elementoFlipcard);
    } catch (error) {
        console.error(error);
    }
});