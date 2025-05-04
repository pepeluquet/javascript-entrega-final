let carritoContainer = document.getElementById("carrito-section")

let carritoStorage = localStorage.getItem("carritoProductos")
carritoStorage = JSON.parse(carritoStorage)


function renderCarrito(carritoItems) {
    carritoItems.forEach(producto => {
        const carrito = document.createElement("div")
            carrito.innerHTML = `   <div class="card">
                                        <div class="card-img-overlay">
                                            <h4 class="card-title">${producto.nombre}</h4>
                                            <h4 class="card-title">$ ${producto.precio}.</h4>
                                            <button class="btn btn-light" id="${producto.id}">Eliminar</button>
                                        </div>
                                    </div>`
        carritoContainer.appendChild(carrito)
    })
    console.log(carritoProductos)
}
renderCarrito(carritoStorage)