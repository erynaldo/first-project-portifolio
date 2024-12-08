// script.js
document.getElementById("equationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const equationInput = document.getElementById("equation").value;
    const resultDiv = document.getElementById("result");

    try {
        const coefficients = parseEquation(equationInput);
        const steps = solveQuadratic(coefficients.a, coefficients.b, coefficients.c);
        resultDiv.innerHTML = steps;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

function parseEquation(equation) {
    const regex = /([-+]?\d*)x\^2\s*([-+]\s*\d*)x\s*([-+]\s*\d*)\s*=\s*0/;
    const match = equation.replace(/\s+/g, "").match(regex);

    if (!match) {
        throw new Error("Formato inválido! Use o padrão: ax² + bx + c = 0");
    }

    const a = parseFloat(match[1].replace("+", "")) || 1;
    const b = parseFloat(match[2].replace("+", "").replace(/\s/g, "")) || 0;
    const c = parseFloat(match[3].replace("+", "").replace(/\s/g, "")) || 0;

    if (a === 0) {
        throw new Error("O coeficiente 'a' não pode ser zero.");
    }

    return { a, b, c };
}

function solveQuadratic(a, b, c) {
    const delta = b * b - 4 * a * c;
    let steps = `<h2>Passo a Passo:</h2>`;
    steps += `<p>1. Fórmula: ax² + bx + c = 0</p>`;
    steps += `<p>2. Coeficientes: a = ${a}, b = ${b}, c = ${c}</p>`;
    steps += `<p>3. Calculando o Δ (delta): Δ = b² - 4ac</p>`;
    steps += `<p>Δ = (${b})² - 4(${a})(${c}) = ${delta}</p>`;

    if (delta < 0) {
        steps += `<p>4. Como Δ < 0, a equação não possui raízes reais.</p>`;
    } else if (delta === 0) {
        const root = -b / (2 * a);
        steps += `<p>4. Como Δ = 0, há uma raiz real:</p>`;
        steps += `<p>x = -b / (2a) = -(${b}) / (2(${a})) = ${root}</p>`;
    } else {
        const root1 = (-b + Math.sqrt(delta)) / (2 * a);
        const root2 = (-b - Math.sqrt(delta)) / (2 * a);
        steps += `<p>4. Como Δ > 0, há duas raízes reais:</p>`;
        steps += `<p>x₁ = (-b + √Δ) / 2a = (-(${b}) + √${delta}) / (2(${a})) = ${root1}</p>`;
        steps += `<p>x₂ = (-b - √Δ) / 2a = (-(${b}) - √${delta}) / (2(${a})) = ${root2}</p>`;
    }

    return steps;
}