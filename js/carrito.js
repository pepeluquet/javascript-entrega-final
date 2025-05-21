let carritoContainer = document.getElementById("carrito-section")
let carritoStorage = localStorage.getItem("carritoProductos")


carritoStorage = JSON.parse(carritoStorage) || [] 

function renderCarrito(carritoItems) { 
    carritoContainer.innerHTML = ""
    let totalGeneral = 0
    let totalCuentaCarrito = 0

    carritoItems.forEach(producto => { 
        if (producto.cantidad > 0) { 
            const carritoItemDiv = document.createElement("div") 
            const subtotal = producto.precio * producto.cantidad 

            totalGeneral += subtotal

            totalCuentaCarrito += producto.cantidad

            carritoItemDiv.innerHTML = `<article class="card w-75 mb-3">
                                            <div class="card-body">
                                                <h4 class="card-header">${producto.nombre}</h4>
                                                <p class="text">Precio: $${producto.precio}</p>
                                                <p class="text">Cantidad: ${producto.cantidad}</p>
                                                <p class="title">Subtotal: $${subtotal.toFixed(2)}</p>
                                                <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>                          
                                            </div>
                                        </article>    ` 
            carritoContainer.appendChild(carritoItemDiv) 
        }
    })
    
    const totalDiv = document.createElement("div")
    totalDiv.innerHTML = `<h3 class="text-end">Total de la compra: $${totalGeneral.toFixed(2)}</h3>`
    carritoContainer.appendChild(totalDiv)

    const botonesEliminar = carritoContainer.querySelectorAll(".btn-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoIdAEliminar = parseInt(e.currentTarget.dataset.id)
            carritoStorage = carritoStorage.filter(producto => producto.id !== productoIdAEliminar)

            localStorage.setItem("carritoProductos", JSON.stringify(carritoStorage)) 
            renderCarrito(carritoStorage)

        })
    })
}



renderCarrito(carritoStorage)


const vaciarCarritoButton = document.getElementById("btn-vaciar-carrito")

vaciarCarritoButton.addEventListener("click", vaciarCarrito )

function vaciarCarrito () { 

    carritoStorage = []
    localStorage.setItem("carritoProductos", JSON.stringify(carritoStorage))
    renderCarrito(carritoStorage)

}


