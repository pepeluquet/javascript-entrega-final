let carritoContainer = document.getElementById("carrito-section")
console.log(carritoContainer)
let carritoStorage = localStorage.getItem("carritoProductos")

carritoStorage = JSON.parse(carritoStorage) || [] 


function renderCarrito(carritoItems) { 
    carritoContainer.innerHTML = ""
    let totalGeneral = 0

    carritoItems.forEach(producto => { 
        if (producto.cantidad > 0) { 
            const carritoItemDiv = document.createElement("div") 
            const subtotal = producto.precio * producto.cantidad 

            totalGeneral += subtotal

            carritoItemDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${subtotal.toFixed(2)}</p>
                <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
            ` 
            carritoContainer.appendChild(carritoItemDiv) 
        }
    })
    const totalDiv = document.createElement("div")
    totalDiv.innerHTML = `<h3>Total de la compra: $${totalGeneral.toFixed(2)}</h3>`
    carritoContainer.appendChild(totalDiv)

    const botonesEliminar = carritoContainer.querySelectorAll(".btn-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoIdAEliminar = parseInt(e.currentTarget.dataset.id)
            carritoProductos = carritoProductos.filter(producto => producto.id !== productoIdAEliminar)

            localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
            renderCarrito(carritoProductos);
        })
    })
}

renderCarrito(carritoStorage)

const vaciarCarritoButton = document.getElementById("vaciar-carrito-btn")

function vaciarCarrito () { 
    vaciarCarritoButton.addEventListener('click', () => {
        console.log("click")
        carritoProductos = []

        localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))

        renderCarrito(carritoProductos)

    })
}