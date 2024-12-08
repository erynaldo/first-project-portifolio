// script.js
document.getElementById("imcForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultDiv = document.getElementById("resultado");

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultDiv.innerHTML = `<p style="color: red;">Por favor, insira valores válidos para peso e altura.</p>`;
        return;
    }

    // const imc = peso / (altura * altura);
    const imc = peso / (altura ** 2);
    const status = ImcStatus(imc);
    // const status = "Aqui chama a situação de como a pessoa está";

    resultDiv.innerHTML = `
        <p><strong>Seu IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Situação:</strong> ${status}</p>
    `;
});

function ImcStatus(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
        return "Obesidade grau 1";
    } else if (imc >= 35 && imc < 39.9) {
        return "Obesidade grau 2";
    } else {
        return "Obesidade grau 3";
    }
}
