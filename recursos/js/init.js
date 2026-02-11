/**
 * Algumas coisas que precisamos definir antes de começar.
 */

/**
 * Essas funções já existem em módulos.
 * Mas módulos só começam a ser executados depois do documento ser parseado.
 * Esse atraso na execução torna perceptivel a troca entre o visual padrão do site e o definido pelo o usuário.
 * Executa-las aqui nos permite aplicar o visual definido pelo o usuário antes mesmo do conteúdo ser exibido.
 * 
 * Não fazemos isso para todas as preferências, apenas aquelas que cousam FOUC (Flash of Unstyled Content).
 * Nesse caso: tema e tamanhoDoTexto.
 */
(function () {
    // Altera o atributo "data-bs-theme" do elemento <html>.
    document.documentElement.setAttribute('data-bs-theme', getNomeDoTemaEmPreferencia());

    // Aplica a escala à propriedade de estilo "font-size" do elemento <html>.
    document.documentElement.style.setProperty("font-size", `${getPreferencia('tamanhoDoTexto')}em`);

    function getPreferencia(nome) {
        const defaults = {
            tema: 'auto',
            tamanhoDoTexto: 1
        }
        const json = document.cookie
            .split("; ")
            .find((row) => row.startsWith('vigi_preferencias='))
            ?.split("=")[1];
    
        if (json) {
            const preferencias = JSON.parse(json);
            return preferencias[nome] ?? defaults[nome];
        }
    }

    function getNomeDoTemaEmPreferencia() {
        const tema = getPreferencia('tema') ?? 'auto';
        if ( tema === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            return tema;
        }
    }
})();
