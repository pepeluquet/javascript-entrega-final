// 2 - Total de la compra, sumando los totales de los productos agregados
// Para mostrar el total de la compra, necesitas recorrer todos los productos que están en el carrito, calcular el subtotal de cada uno (precio * cantidad), y sumar todos esos subtotales para obtener un total general. Este cálculo se realiza idealmente cada vez que se renderiza el carrito, ya que el contenido del carrito (y, por lo tanto, el total) puede cambiar al añadir o eliminar productos.
// En la fuente carrito.js, la función renderCarrito es la encargada de mostrar los productos en el contenedor carritoContainer. Podemos modificar esta función para que también calcule y muestre el total.
// El archivo carrito.html muestra un espacio para el total con el texto "Total: $". Para que el script pueda actualizar este valor, necesitamos una forma de identificar este elemento en el HTML. Como la fuente carrito.html no le asigna un ID o clase específico al lugar donde va el monto del total, en el script vamos a crear dinámicamente un nuevo elemento para mostrar el total justo después de listar los ítems del carrito, o alternativamente, podrías agregar un <span> o <div> con un ID específico junto a "Total: $" en tu HTML original (<p>Total: $<span id="total-compra"></span></p>) y luego buscar ese elemento por su ID en el script.
// Aquí te muestro el script modificado para la función renderCarrito que calcula y muestra el total, añadiendo un elemento para ello (siguiendo la lógica de crear el elemento dentro del script):

// Script llamado "carrito.js"

let carritoContainer = document.getElementById("carrito-section") [1]

// Recuperar el carrito del almacenamiento local
let carritoStorage = localStorage.getItem("carritoProductos")
let carritoProductos = JSON.parse(carritoStorage) || [] // Usar un nombre consistente, por ejemplo, carritoProductos [1]

function renderCarrito(carritoItems) {
    carritoContainer.innerHTML = ""; // Limpiar el contenido actual del carrito [1]

    let totalGeneral = 0; // Inicializar una variable para sumar el total

    carritoItems.forEach(producto => { [1]
        // Asegurarse de que el producto tiene una cantidad positiva para mostrarlo [1]
        if (producto.cantidad > 0) {
            const carritoItemDiv = document.createElement("div");
            // Calcular el subtotal para cada producto individual [1]
            const subtotal = producto.precio * producto.cantidad; [1]

            // Sumar el subtotal al total general
            totalGeneral += subtotal;

            carritoItemDiv.innerHTML = `
                ${producto.nombre} [2]
                Precio: $${producto.precio} [2]
                Cantidad: ${producto.cantidad} [2]
                Subtotal: $${subtotal} [2]
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button> <!-- Es recomendable que 'Eliminar' sea un botón real y tenga un ID/data-id [Ver conversación anterior] -->
            `;

            carritoContainer.appendChild(carritoItemDiv); [2]
        }
    });

    // Después de recorrer todos los productos, mostrar el total general
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total de la compra: $${totalGeneral.toFixed(2)}</h3>`; // Muestra el total, toFixed(2) para 2 decimales
    carritoContainer.appendChild(totalDiv); // Añade este elemento al contenedor del carrito

    // console.log(carritoProductos) // Este log parece estar fuera del bucle forEach en la fuente [2]
}

// Llamar a renderCarrito para mostrar el contenido inicial al cargar la página del carrito [2]
renderCarrito(carritoProductos);

// Nota: El event listener para los botones "Eliminar" debe añadirse DESPUÉS de que los botones se hayan renderizado. [Ver conversación anterior]
// Si renderCarrito se llama al cargar la página, puedes añadir el listener aquí.
// Si renderCarrito se llama también desde mainCarrito.js al añadir productos, el listener podría ir allí
// o debes asegurarte de que se vuelva a adjuntar cada vez que se renderiza el carrito.

// Lógica para los botones "Eliminar" (basado en el código comentado en mainCarrito.js [4] y necesidad de botones reales)
// Asegúrate de que los botones 'Eliminar' en renderCarrito sean <button> con la clase 'eliminar-btn' y el atributo 'data-id'.
carritoContainer.addEventListener('click', (e) => {
    // Verificar si el clic fue en un botón con la clase 'eliminar-btn'
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('eliminar-btn')) {
        // Obtener el ID del producto desde el atributo data-id (asegúrate de convertirlo a número si los IDs son números)
        const productoIdAEliminar = parseInt(e.target.dataset.id); 

        // Filtrar el array del carrito para remover el producto con el ID correspondiente
        // Asegúrate de estar usando el array correcto, por ejemplo, 'carritoProductos'
        carritoProductos = carritoProductos.filter(item => item.id !== productoIdAEliminar); // Usar !== para comparar valor y tipo, o == si sabes que uno es string y el otro número y no quieres parseInt

        // Actualizar el almacenamiento local con el nuevo carrito
        localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));

        // Volver a renderizar el carrito para actualizar la vista
        renderCarrito(carritoProductos);
    }
});

// Explicación del script para el total:
// 1. Se inicializa una variable totalGeneral a 0 antes de empezar a recorrer los productos del carrito dentro de renderCarrito.
// 2. Dentro del bucle forEach que itera sobre cada producto en carritoItems:
// ◦ Se calcula el subtotal para el producto actual multiplicando su precio por su cantidad.
// ◦ Este subtotal se suma a totalGeneral (totalGeneral += subtotal).
// 3. Después de que el bucle forEach termina (es decir, se han procesado todos los productos del carrito), la variable totalGeneral contiene la suma de todos los subtotales.
// 4. Se crea un nuevo elemento div (o podrías usar otro tipo de etiqueta) llamado totalDiv.
// 5. Se asigna el contenido HTML a totalDiv mostrando el texto "Total de la compra: $" seguido del valor de totalGeneral, formateado con .toFixed(2) para asegurar dos decimales.
// 6. Finalmente, totalDiv se añade al carritoContainer después de que se han añadido todos los ítems individuales del carrito.
// 3 - Botón vaciar carrito
// En la fuente carrito.html, tienes un botón con el texto "Vaciar". Para darle funcionalidad, necesitas añadir un event listener a este botón en tu script carrito.js. Este listener se activará cuando el usuario haga clic en el botón.
// Como el botón "Vaciar" en la fuente HTML no tiene un id o una class, lo más conveniente sería modificar tu carrito.html para añadirle uno, por ejemplo:
// <button id="vaciar-carrito-btn">Vaciar</button> [3]
// Luego, en tu script carrito.js, puedes añadir el siguiente código para manejar el clic en este botón:

// Script llamado "carrito.js"

// ... (código anterior de renderCarrito y el listener para eliminar) ...

// Obtener referencia al botón "Vaciar" por su ID (asumiendo que le añadiste id="vaciar-carrito-btn" en el HTML)
const vaciarCarritoButton = document.getElementById("vaciar-carrito-btn"); // Requiere que el botón en HTML tenga id="vaciar-carrito-btn"

// Añadir un event listener para el clic en el botón "Vaciar"
if (vaciarCarritoButton) { // Verificar que el botón existe antes de añadir el listener
    vaciarCarritoButton.addEventListener('click', () => {
        // 1. Vaciar el array del carrito
        carritoProductos = [];

        // 2. Actualizar el almacenamiento local con el array vacío
        localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));

        // 3. Volver a renderizar el carrito para mostrar que está vacío y actualizar el total a $0
        renderCarrito(carritoProductos);

        console.log("Carrito vaciado");
    });
} else {
    console.warn("Botón 'Vaciar' no encontrado. Asegúrate de que tenga el id 'vaciar-carrito-btn'.");
}

// Explicación del script para vaciar carrito:
// 1. Se obtiene una referencia al elemento del botón "Vaciar" utilizando document.getElementById [basado en la necesidad de interactuar con el botón "Vaciar" mostrado en la fuente 1]. Es crucial que le añadas un id al botón en tu carrito.html para que esto funcione.
// 2. Se añade un event listener de tipo click a este botón.
// 3. Dentro de la función que se ejecuta al hacer clic:
// ◦ El array carritoProductos se reasigna a un array vacío ([]). Esto elimina todos los elementos del carrito en memoria.
// ◦ Se actualiza el localStorage con el array vacío [basado en la necesidad de persistir los cambios del carrito, como se hace al añadir productos en mainCarrito.js].
// ◦ Se llama a la función renderCarrito con el array carritoProductos ahora vacío. Esto limpia la visualización del carrito en la página y, gracias a la lógica del total que añadimos antes, también actualizará el total mostrado a $0.

// console.log(alumnos)
// localStorage.clear()