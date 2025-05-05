// Vamos a abordar las dos partes de tu consulta.
// 1. Ajustar la carga inicial y asegurar que renderCarrito maneje la estructura actual
// Según los scripts, tanto mainCarrito.js como carrito.js intentan cargar el estado del carrito desde localStorage usando la clave "carritoProductos".
// • En mainCarrito.js, la línea let carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")) || [] maneja correctamente el caso en que localStorage.getItem("carritoProductos") devuelva null (si no hay nada guardado). Si es null, JSON.parse(null) es null, y null || [] resulta en un array vacío []. Esto es correcto.
// • En carrito.js, la carga inicial es let carritoStorage = localStorage.getItem("carritoProductos"); carritoStorage = JSON.parse(carritoStorage);. Si localStorage.getItem("carritoProductos") devuelve null, entonces JSON.parse(null) resulta en null. La variable carritoStorage terminaría siendo null. Luego, renderCarrito(carritoStorage) es llamada con null.
// • La función renderCarrito(carritoItems) espera un array (carritoItems) para poder iterar sobre él con forEach. Si se llama con null, dará un error porque no se puede llamar forEach en null.
// Para solucionar esto y asegurar que renderCarrito siempre reciba un array (vacío si no hay nada guardado), debes modificar la línea donde se carga carritoStorage en carrito.js de manera similar a como se hace en mainCarrito.js.
// Código para ajustar la carga inicial en carrito.js:
// Modifica las siguientes líneas en tu script carrito.js:

// script llamado "carrito.js" [2]

// renderCarrito(carritoStorage) // Línea comentada en el código fuente [2]

let carritoContainer = document.getElementById("carrito-section") [2]

// --- INICIO MODIFICACIÓN ---
let carritoStorage = localStorage.getItem("carritoProductos") [2]
// Asegurarnos de que carritoStorage sea un array, incluso si localStorage está vacío/nulo
carritoStorage = JSON.parse(carritoStorage) || [] // <-- **Línea modificada**
// --- FIN MODIFICACIÓN ---

function renderCarrito(carritoItems) { [2]
    carritoContainer.innerHTML = "" [2]

    // El resto de la función renderCarrito itera sobre carritoItems [2]
    // y espera que sea un array con objetos que tengan propiedades como 'cantidad', 'precio', etc. [2, 3]
    // Si carritoItems es [], el forEach simplemente no ejecutará el bucle, que es el comportamiento correcto para un carrito vacío.
    carritoItems.forEach(producto => { [2]
        if (producto.cantidad > 0) { [2]
            const carritoItemDiv = document.createElement("div") [2]
            const subtotal = producto.precio * producto.cantidad [3]

            carritoItemDiv.innerHTML = `
                ${producto.nombre} [3]
                Precio: $${producto.precio} [3]
                Cantidad: ${producto.cantidad} [3]
                Subtotal: $${subtotal} [3]
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button> // <-- Añadimos data-id para identificar el producto
            ` [3]

            carritoContainer.appendChild(carritoItemDiv) [3]
        }
    })

    console.log(carritoProductos) // Nota: Aquí se usa carritoProductos, pero debería ser carritoItems o carritoStorage. En mainCarrito.js se usa carritoProductos [4]. Hay una ligera inconsistencia de nombres aquí. Pero la lógica de renderizado usa carritoItems [2].
} [3]

// Llamada inicial a renderizar el carrito al cargar la página [3]


renderCarrito(carritoStorage) // [3]

// Con esta modificación, carritoStorage siempre será un array (vacío o con los productos guardados), y renderCarrito podrá iterar sin error. La estructura esperada dentro de renderCarrito es un array de objetos, donde cada objeto tiene al menos cantidad, precio, y nombre para poder mostrar la información. La modificación en mainCarrito.js al agregar productos asegura que los elementos en el carrito tengan la propiedad cantidad, por lo que la estructura manejada por renderCarrito es consistente con cómo mainCarrito.js guarda los ítems.

// 2. Código para dar funcionalidad al botón "Eliminar"
// En el script carrito.js, actualmente el botón "Eliminar" se crea dentro de la función renderCarrito, pero no tiene ninguna acción asociada a su evento onclick.
// Para añadir la funcionalidad de eliminar un ítem del carrito, seguiremos estos pasos:
// • Añadir un identificador al botón "Eliminar" en la función renderCarrito para saber qué producto eliminar. Usaremos un atributo data-id. (Ya lo incluí en el código de arriba).
// • Añadir un "escuchador de eventos" (event listener) que capture los clics en el botón "Eliminar".
// • Dentro del escuchador, identificar el id del producto a eliminar.
// • Actualizar el array carritoProductos (o carritoStorage) eliminando el producto. La forma más limpia es filtrar el array, manteniendo solo los productos cuyo id no coincida con el del producto a eliminar.
// • Guardar el array actualizado en localStorage.
// • Llamar a renderCarrito nuevamente para actualizar la visualización en la página.
// La mejor manera de manejar eventos para elementos que se crean dinámicamente (como los ítems del carrito) es usando delegación de eventos. Esto significa añadir un solo escuchador al contenedor padre (carrito-section) y verificar si el clic ocurrió en uno de los botones "Eliminar" dentro de él.
// Código para añadir funcionalidad al botón "Eliminar" en carrito.js:
// Añade el siguiente código después de la definición de la función renderCarrito y después de la primera llamada a renderCarrito(carritoStorage) en tu script carrito.js.

// ... (código anterior de carrito.js, incluyendo la función renderCarrito modificada y la llamada inicial) [2, 3]

// Añadir event listener para manejar clics en los botones "Eliminar" usando delegación de eventos
carritoContainer.addEventListener('click', (e) => {
    // Verificamos si el elemento clickeado es un botón y tiene la clase 'eliminar-btn'
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('eliminar-btn')) {
        // Obtenemos el ID del producto desde el atributo data-id del botón clickeado
        const productoIdAEliminar = e.target.dataset.id;

        // Cargar el carrito actual de localStorage para asegurarnos de tener la última versión
        // Es importante volver a cargar desde localStorage aquí porque el carrito podría haber cambiado
        // en otra pestaña o por otra acción antes de hacer clic en eliminar.
        let carritoActual = JSON.parse(localStorage.getItem("carritoProductos")) || []; // [1, 2]

        // Filtramos el array para crear un nuevo array que NO incluya el producto con el ID a eliminar.
        // Usamos != para comparar el string del data-id con el número del item.id, o convertimos uno de ellos.
        const nuevoCarrito = carritoActual.filter(item => item.id != productoIdAEliminar);
        // Alternativa más segura si los IDs son números:
        // const nuevoCarrito = carritoActual.filter(item => item.id !== parseInt(productoIdAEliminar));


        // Guardamos el nuevo array del carrito (sin el producto eliminado) en localStorage
        localStorage.setItem("carritoProductos", JSON.stringify(nuevoCarrito)); [4]

        // Volvemos a renderizar el carrito para mostrar el estado actualizado
        renderCarrito(nuevoCarrito); // [3, 4]

        // Opcional: Mostrar el carrito actualizado en consola
        console.log("Carrito después de eliminar:", nuevoCarrito);
    }
});


// Explicación del código de eliminación:
// 1. carritoContainer.addEventListener('click', ...): Añade un escuchador de eventos al contenedor padre (carrito-section).
// 2. if (e.target.tagName === 'BUTTON' && e.target.classList.contains('eliminar-btn')): Dentro del escuchador, verifica si el elemento específico en el que se hizo clic (e.target) es un botón (tagName === 'BUTTON') y si tiene la clase CSS "eliminar-btn". Esto filtra los clics para que solo se active la lógica cuando se presiona un botón de eliminación.
// 3. const productoIdAEliminar = e.target.dataset.id;: Si el clic fue en un botón de eliminación, obtiene el valor del atributo data-id que añadimos previamente en la función renderCarrito. Este valor es el ID único del producto asociado a ese botón.
// 4. let carritoActual = JSON.parse(localStorage.getItem("carritoProductos")) || [];: Vuelve a cargar el estado actual del carrito desde localStorage. Esto es una buena práctica en aplicaciones SPA (Single Page Applications) donde el estado puede cambiar en otros lugares.
// 5. const nuevoCarrito = carritoActual.filter(item => item.id != productoIdAEliminar);: Utiliza el método filter de JavaScript para crear un nuevo array (nuevoCarrito). Este nuevo array contendrá todos los elementos del carritoActual excepto aquel cuyo id coincida con productoIdAEliminar.
// 6. localStorage.setItem("carritoProductos", JSON.stringify(nuevoCarrito));: Guarda el nuevoCarrito (ya sin el producto eliminado) en localStorage.
// 7. renderCarrito(nuevoCarrito);: Llama a la función renderCarrito pasando el nuevoCarrito actualizado. Esto limpiará la sección del carrito y la volverá a llenar con los ítems restantes.
// Las otras fuentes que proporcionaste parecen ser partes de la interfaz de usuario de GitHub (navegación, opciones de búsqueda, etc.) y no contienen código JavaScript relevante para la lógica del carrito.
// Con estas modificaciones, tu script carrito.js debería cargar correctamente el carrito al inicio (incluso si está vacío) y los botones "Eliminar" deberían funcionar para remover ítems del carrito y actualizar tanto el localStorage como la visualización en la página.

// [1] mainCarrito
// [2] carrito

// console.log(alumnos)
// localStorage.clear()