const alumnos = []

class Alumno {
    static id = 0
    constructor (nombre, apellido, sexo, edad, peso, altura) {
        this.id = ++Alumno.id,
        this.nombre = nombre
        this.apellido = apellido
        this.sexo = sexo
        this.edad = edad
        this.peso = peso
        this.altura = altura
    }
}

const cargarDatosUsuarios = () =>{
    let nombre = prompt("Ingrese su nombre: ");
    let apellido = prompt("Ingrese su apellido: ");
    let sexo = prompt("Indique su sexo segun del dni (m/f): ")
    let edad = parseInt(prompt("Ingrese su edad: "));
    let peso = parseInt(prompt ("Ingrese su peso: "));
    let altura = parseInt(prompt("Ingrese su altura (en centimetros): "));
    
    const alumno = new Alumno (nombre, apellido, sexo, edad, peso, altura)
    alumnos.push(alumno)

    const alumnosJSON = JSON.stringify(alumnos)
    localStorage.setItem("alumnos", alumnosJSON)
    const alumnosNuevo = JSON.parse(localStorage.getItem("alumnos"))
    console.log(alumnosNuevo)
}

const buscarAlumnos = () => {
    if (alumnos.length === 0) {
        alert("No hay alumnos agregados")
    } else {
        let apellidoAlumno = prompt("Ingrese el apellido a buscar: ")
        const busqueda = alumnos.filter (alumno => alumno.apellido == apellidoAlumno)
        console.log(busqueda)
    }
}

function informarIMC (resultadoImc) {
    if (resultadoImc < 18.5) {
        alert("Tienes un indice de masa corporal BAJO");
    } else if (18.6 < resultadoImc < 24.9) {
        alert("Tienes un indice de masa corporal NORMAL");
    } else if (25 < resultadoImc < 29.9) {
        alert("Tienes un indice de masa corporal SOBREPESO");
    } else {
        alert("Tienes un indice de masa corporal OBESIDAD")
    };
    console.log ("Tu Indice de Masa Corporal es: "+ resultadoImc);
}

function informarICC (sexo, resultadoIcc) {
    console.log ("Tu Indice Cintura-Cadera es: "+ resultadoIcc);
    if (sexo == "m"){
        if (resultadoIcc < 0.89) {
            alert("Tienes un indice cintura/cadera de BAJO RIESGO");
        } else if (0.9 < resultadoIcc < 1.0) {
            alert("Tienes un indice de cintura/cadera de RIESGO MODERA");
        } else {
            alert("Tienes un indice de cintura/cadera de ALTO RIESGO");
        };
    } else if (sexo == "f"){
        if (resultadoIcc < 0.849) {
            alert("Tienes un indice cintura/cadera de BAJO RIESGO");
        } else if (0.85 < resultadoIcc < 0.9) {
            alert("Tienes un indice de cintura/cadera de RIESGO MODERA");
        } else {
            alert("Tienes un indice de cintura/cadera de ALTO RIESGO");
        };
    } else {
        alert("El dato del sexo era necesario para el resultado del ICC")
    };
}

let menu = parseInt(prompt("Ingrese: \n1 para cargar alumno \n2 para ver alumno \n3 calcular el Indice Masa Corporal \n4 calcular el Indice Cintura Cadera \n5 para salir:"))

while(menu !==5) {
    switch(menu) {
        case 1:
            cargarDatosUsuarios()
            break
        case 2:
            buscarAlumnos()
            break
        case 3:
            let peso = parseInt(prompt ("Ingrese su peso: "))
            let altura = parseInt(prompt("Ingrese su altura (en centimetros): "))

            indiceMC = (a, b) => {
                return a / ((b/100) ** 2)
            }

            const resultadoImc = indiceMC(peso, altura);
            informarIMC(resultadoImc)
            break
        case 4:
            let sexo = prompt("Indique su sexo segun del dni (m/f): ")
            let cintura = parseInt(prompt("Ingrese la medida de la cintura (en centimetros): "))
            let cadera = parseInt(prompt("Ingrese la medida de la cadera (en centimetros): "))

            indiceCC = (a, b) => {
                return a / b;
            }

            const resultadoIcc = indiceCC(cintura, cadera);
            informarICC(sexo, resultadoIcc)
            break
        default:
            alert("Opcion invalidad")
    }
    menu = parseInt(prompt("Ingrese: \n1 para cargar alumno \n2 para ver alumno \n3 calcular el Indice Masa Corporal \n4 calcular el Indice Cintura Cadera \n5 para salir:"))
}
// console.log(alumnos)
// localStorage.clear()