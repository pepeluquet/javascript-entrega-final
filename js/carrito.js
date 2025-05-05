let carritoContainer = document.getElementById("carrito-section")

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
                ${producto.nombre} 
                Precio: $${producto.precio} 
                Cantidad: ${producto.cantidad} 
                Subtotal: $${subtotal} 
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button> 
            ` 

            carritoContainer.appendChild(carritoItemDiv) 
        }
    })
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total de la compra: $${totalGeneral.toFixed}</h3>`
    carritoContainer.appendChild(totalDiv)
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

// "total-compra"
// localStorage.clear()