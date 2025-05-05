// renderCarrito(carritoStorage)
let carritoContainer = document.getElementById("carrito-section")

let carritoStorage = localStorage.getItem("carritoProductos")

carritoStorage = JSON.parse(carritoStorage) || [] 


function renderCarrito(carritoItems) { 
    carritoContainer.innerHTML = "" 

    carritoItems.forEach(producto => { 
        if (producto.cantidad > 0) { 
            const carritoItemDiv = document.createElement("div") 
            const subtotal = producto.precio * producto.cantidad 

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
    console.log(carritoProductos)
}
renderCarrito(carritoStorage)