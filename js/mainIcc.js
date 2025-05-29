indiceCC = (a, b) => {
    return a / b;
}


const botonesCalculateICC = document.querySelector("#btn-calcular-icc")

botonesCalculateICC.addEventListener( "click", calculateICC)

function calculateICC() {
    
    let sexo = document.getElementById("idSexo").value;
    let cintura = document.getElementById("idCintura").value;
    let cadera = document.getElementById("idCadera").value;

    const resultadoIcc = indiceCC(cintura, cadera);
    
    let aviso = ""

    if (sexo == "m"){
        if (resultadoIcc < 0.89) {
            aviso = "Tienes un indice cintura/cadera de BAJO RIESGO";
        } else if (resultadoIcc > 0.9 && resultadoIcc < 1.0) {
            aviso = "Tienes un indice de cintura/cadera de RIESGO MODERA";
        } else {
            aviso = "Tienes un indice de cintura/cadera de ALTO RIESGO";
        };
    } else if (sexo == "f"){
        if (resultadoIcc < 0.849) {
            aviso = "Tienes un indice cintura/cadera de BAJO RIESGO";
        } else if (resultadoIcc > 0.85 && resultadoIcc < 0.9) {
            aviso = "Tienes un indice de cintura/cadera de RIESGO MODERA";
        } else {
            aviso = "Tienes un indice de cintura/cadera de ALTO RIESGO";
        };
    } else {
        aviso ="El dato del sexo era necesario para el resultado del ICC"
    };

    const mensaje = `Usted posee un ICC de ${Number.parseFloat(resultadoIcc).toFixed(2)} \n ${aviso}`;
    Swal.fire(mensaje)
}