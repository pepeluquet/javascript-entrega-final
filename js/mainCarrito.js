const productos= [
    {
        id: 1, 
        nombre: "Estiramientos dinámicos para atletas.", 
        descripcion: "Este libro se centra en los estiramientos dinámicos que son útiles para el rendimiento deportivo.",
        precio: 12000,
        imagen : "./assets/foto2.webp"
    },
    {
        id: 2, 
        nombre: "Clases de Yoga y Stretching para hacer en sus casas", 
        descripcion: "8 videos con clases destinadas para realizar en la comodidad de sus casas y en el tiempo que deseen.",
        precio: 20000,
        imagen : "./assets/foto3.webp"
    },
    {
        id: 3, 
        nombre: "subscripcion", 
        descripcion: "Subscripcion mensual a clases en vivo.",
        precio: 18000,
        imagen : "./assets/foto4.webp"
    },
]
let carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")) || []

let productosContainer = document.getElementById("productos-container")

function renderProductos(productosArray) {
    productosArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `  <article class="col">
                                <div class="card">
                                    <img src=${producto.imagen} class="articulo">
                                    <div class="card-img-overlay">
                                        <h4 class="card-title">${producto.nombre}</h4>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <h4 class="card-title">$ ${producto.precio}.</h4>
                                        <button class="btn btn-light" id="${producto.id}">Agregar</button>
                                    </div>
                                </div>
                            </article>`
        productosContainer.appendChild(card)
    })
    agregarCarritoButton()
}
renderProductos(productos)


function agregarCarritoButton () {
    const agregarButtones = document.querySelectorAll(".btn")
    agregarButtones.forEach(button => {
        button.onclick = (e) => {
            const productoId = e.currentTarget.id
            const seleccionProductos = productos.find(producto => producto.id === productoId)
            
            const productoExistente = carritoProductos.find(item => item.id === productoId)
            if (productoExistente) {
                productoExistente.cantidad++
            } else {
                const nuevoProductoEnCarrito = { ...seleccionProductos, cantidad: 1 }
                carritoProductos.push(nuevoProductoEnCarrito)
            }


            console.log(carritoProductos)

            localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
            renderCarrito(carritoProductos)
        }
    })
}


