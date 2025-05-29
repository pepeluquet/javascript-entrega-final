# Simulador de Índices de Salud

Este proyecto comenzo en papeles la primer semana como una **calculadora de Indice de Masa Corporal** , al investigar posteriormente, averigue que ya no es tan razonable el test y se recomienda un segundo test llamado **Índice Cintura-Cadera (ICC)**, asi que lo agregue a la idea, y posteriormente a las funciones de calculo, sumamos una carga de datos para sumar un Array y Objetos.

## Descripcion

El simulador permite al usuario ingresar la siguiente información:

*   Sexo (para el cálculo del ICC)
*   Peso (en kilogramos)
*   Altura (en centímetros)
*   Perímetro de la cintura (en centímetros)
*   Perímetro de la cadera (en centímetros)

Una vez ingresados los datos, el simulador calcula y muestra:

*   **El valor del IMC**, junto con una **interpretación del resultado** (bajo peso, normal, sobrepeso, obesidad).
*   **El valor del ICC**, junto con una **clasificación de riesgo** (bajo, moderado, alto) basada en el sexo del usuario.

## Funcionalidades agregadas

- **Carrito de compras:** permite agregar productos, eliminarlos, vaciar el carrito y ver el total. El carrito persiste usando `localStorage`.
- **Productos:** los productos se cargan dinámicamente desde un archivo `data.json` y se renderizan en la interfaz.
- **Método de pago:** se agregó un formulario para finalizar la compra, donde el usuario ingresa sus datos personales y de pago.
- **Notificaciones:** se utilizan Toastify y SweetAlert para mostrar mensajes y avisos al usuario.

> **Nota:** La validación de los datos de la tarjeta de crédito aún no ha sido implementada. Actualmente, el formulario de pago solo valida que los campos no estén vacíos.

## Notas

Este simulador se basa en las fórmulas estándar para el cálculo del IMC (peso / altura²) y el ICC (cintura / cadera). Las interpretaciones de los resultados son orientativas.