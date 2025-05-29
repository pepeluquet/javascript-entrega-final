document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("checkoutFormulario")
    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault()

            const nombre = document.getElementById("nombre").value
            const apellido = document.getElementById("apellido").value
            const email = document.getElementById("email").value
            const celular = document.getElementById("celular").value
            const ciudad = document.getElementById("ciudad").value
            const provincia = document.getElementById("provincia").value
            const formaPago = document.querySelector('input[name="formaPago"]:checked')?.value

            const datosCliente = {
                nombre,
                apellido,
                email,
                celular,
                ciudad,
                provincia,
                formaPago
            }

            localStorage.setItem("datosCliente", JSON.stringify(datosCliente))
            localStorage.removeItem("carritoProductos")

            function renderCarrito() {
                const carritoContainer = document.getElementById("carrito-section")
                carritoContainer.innerHTML = ""
                let totalGeneral = 0
                const totalDiv = document.createElement("div")
                totalDiv.innerHTML = `<h3 class="text-end">Total de la compra: $${totalGeneral.toFixed(2)}</h3>`
                carritoContainer.appendChild(totalDiv)
            }
            renderCarrito()

            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'Compra realizada con éxito. Gracias por su compra.',
                showConfirmButton: true,
                confirmButtonColor: '#43cea2'
            })
            
        })
    }
})