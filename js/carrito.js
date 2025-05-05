// renderCarrito(carritoStorage)
let carritoContainer = document.getElementById("carrito-section")

let carritoStorage = localStorage.getItem("carritoProductos")
carritoStorage = JSON.parse(carritoStorage)


function renderCarrito(carritoItems) {
    carritoContainer.innerHTML = ""
    carritoItems.forEach(producto => {      
        if (producto.cantidad > 0) {
            const carritoItemDiv = document.createElement("div")
            const subtotal = producto.precio * producto.cantidad

            carritoItemDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${subtotal}</p>
                <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                `

            carritoContainer.appendChild(carritoItemDiv)
        }
    })
    console.log(carritoProductos)
}
renderCarrito(carritoStorage)