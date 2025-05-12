indiceMC = (a, b) => {
    return a / ((b/100) ** 2)
}

function calculateIMC() {
    let peso = document.getElementById("idPeso").value;
    let altura = document.getElementById("idAltura").value;

    const resultadoImc = indiceMC(peso, altura);

    if (resultadoImc < 18.5) {
        aviso = "Tienes un indice de masa corporal BAJO";
    } else if (resultadoImc > 18.6 && resultadoImc < 24.9) {
        aviso = "Tienes un indice de masa corporal NORMAL";
    } else if (resultadoImc > 25 && resultadoImc < 29.9) {
        aviso = "Tienes un indice de masa corporal SOBREPESO";
    } else {
        aviso = "Tienes un indice de masa corporal OBESIDAD"
    };

    document.querySelector("#resultadoImc").innerHTML = `Usted posee un IMC de ${Number.parseFloat(resultadoImc).toFixed(2)} \n ${aviso}`;
}
