/**
 * Coleção de funções para manipulação de cookies.
 */

export function getValorDoCookie(nome) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${nome}=`))
        ?.split("=")[1];
}

export function setValorDoCookie(nome, valor, diasDeVida = 365) {
    const dataDeExpiracao = calculaDataDeExpiracao(diasDeVida);
    const path = getPath();
    document.cookie = `${nome}=${valor}; expires=${dataDeExpiracao}; path=${path}`
}

function calculaDataDeExpiracao(diasDeVida) {
    const dataDeExpiracao = new Date();
    dataDeExpiracao.setTime(dataDeExpiracao.getTime() + (diasDeVida * 24 * 60 * 60 * 1000));
    return dataDeExpiracao.toUTCString();
}

function getPath() {
    if (isProducao) {
        let path = window.location.pathname.match(/\/rea\/.*?\//);
        if (path) {
            return path[0];
        }
    }
    return '/';
}

function isProducao() {
    return window.location.hostname === 'mooc.campusvirtual.fiocruz.br';
}