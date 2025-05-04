let carritoContainer = document.getElementById("carrito-section")

let carritoStorage = localStorage.getItem("carritoProductos")
carritoStorage = JSON.parse(carritoStorage)


function renderCarrito(carritoItems) {
    carritoItems.forEach(producto => {
        const carrito = document.createElement("div")
            carrito.innerHTML = `   <article class="col">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">${producto.nombre}</h5>
                                                <h5 class="card-title">$ ${producto.precio}</h5>
                                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <button class="btn btn-light" id="${producto.id}">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`
        carritoContainer.appendChild(carrito)
    })
    console.log(carritoProductos)
}
renderCarrito(carritoStorage)