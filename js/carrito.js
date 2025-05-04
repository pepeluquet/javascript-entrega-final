let carritoContainer = document.getElementById("carrito-section")

let carritoStorage = localStorage.getItem("carritoProductos")
carritoStorage = JSON.parse(carritoStorage)


function renderCarrito(carritoItems) {
    carritoItems.forEach(producto => {
        const carrito = document.createElement("div")
        carrito.innerHTML = `   <h4 class="card-title">${producto.nombre}</h4>
                                <h4 class="card-title">$ ${producto.precio}.</h4>`
        carritoContainer.appendChild(carrito)
    })
    console.log(carritoProductos)
}
renderCarrito(carritoStorage)