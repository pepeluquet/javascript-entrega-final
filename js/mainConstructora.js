// const celular1 = {
//     modelo: "s25",
//     marca: "samsung",
//     precio: 1000
// }

// const celular2 = {
//     modelo: "s10",
//     marca: "samsung",
//     precio: 800
// }
// console.log(celular1, celular2) HASTA ACA LO PRIMERO

function Celular (modelo, marca, precio) {
    this.modelo = modelo,
    this.marca = marca,
    this.precio = precio
}

const precioDolar = 1250

class Celular {
    static id = 0
    constructor (modelo, marca, precio) {
        this.id = ++Celular.id,
        this.modelo = modelo,
        this.marca = marca,
        this.precio = precio
    }

    enPesos = () => {
        this.precio = this.precio*precioDolar
        console.log("El precio en pesos es $"+this.precio)
    }

}

const productos = []

const cargaProductos = () => {
    let cargaModelo = prompt("Ingrese el modelo: ")
    let cargaMarca = prompt("Ingrese la marca: ")
    let cargaPrecio = parseInt(prompt("Ingrese el precio: "))

    const celular = new Celular(cargaModelo, cargaMarca, cargaPrecio)
    productos.push(celular)
   
}

const verProductos = () => {
    console.log(productos)
}

let menu = parent(prom("Ingrese 1 para ver productos, 2 para cargar un productos, 3 pasa salir"))

while(menu !==3) {
    switch(menu) {
        case 1:
            verProductos()
            break
        case 2:
            cargarProductos()
            break
        default:
            alert("Opcion invalidad")
    }

    menu = parseInt(prompt("Ingrese 1 para ver productos, 2 para cargar un productos, 3 pasa salir"))
}

// STORAGE

// const player = "messi"
// const edad = 30

// localStorage.setItem("player", player)
// localStorage.setItem("edad", edad)

// console.log(localStorage.getItem("player"))

// const jugador = {
//     nombre: "messi",
//     edad: 30
// }
// localStorage.setItem("jugador", jugador)
// const jugadorJSON = JSON.stringify(jugador)
// localStorage.setItem("jugador", jugadorJSON)
// console.log(localStorage.getItem("jugador"))

// const jugador1 = JSON.parse(localStorage.getItem("jugador"))
// console.log(jugador1)