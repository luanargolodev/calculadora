"use strict";
const $calculadora = document.querySelector('#calculadora');
const $resultado = document.querySelector('#resultado');
function evaluate(expression) {
    try {
        if (expression.match(/[a-zA-Z&#$<>{}]/g)) {
            throw new Error();
        }
        return new Function(`return (${expression})`)();
    }
    catch (e) {
        return null;
    }
}
function round(value) {
    return Math.round(value * 1000) / 1000;
}
function isNumber(value) {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    else {
        return false;
    }
}
function calculate() {
    localStorage.setItem('@calculadora', $calculadora.value);
    const lines = $calculadora.value.split(/\r?\n/).map(evaluate);
    $resultado.innerHTML = `<div>${lines
        .map((l) => `<div>${isNumber(l) ? round(l) : '---'}</div>`)
        .join('')}</div>`;
    const total = round(lines.filter(isNumber).reduce((a, b) => a + b, 0));
    $resultado.innerHTML += `<div id="total">${total}</div>`;
    const $total = document.querySelector('#total');
    $total.addEventListener('click', () => {
        navigator.clipboard.writeText(total.toString());
        alert('Resultado copiado para a área de transferência');
    });
}
$calculadora.value = localStorage.getItem('@calculadora') || '';
calculate();
$calculadora.addEventListener('input', calculate);
//# sourceMappingURL=script.js.map