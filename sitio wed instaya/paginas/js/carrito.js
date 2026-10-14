
/* ==========================================
   CARRITO DE COMPRAS - INSTAYA
========================================== */

// 1. Catálogo de servicios
const servicios = {
    basico: {
        nombre: "Plan Básico",
        precio: 45
    },

    profesional: {
        nombre: "Plan Profesional",
        precio: 89
    },

    empresarial: {
        nombre: "Plan Empresarial",
        precio: 159
    }
};


// 2. Cargar el carrito desde el navegador
let carrito = JSON.parse(
    localStorage.getItem("carritoInstaYA")
) || [];


// 3. Guardar el carrito
function guardarCarrito() {
    localStorage.setItem(
        "carritoInstaYA",
        JSON.stringify(carrito)
    );
}


// 4. Agregar un servicio al carrito
function agregarAlCarrito(id) {

    const servicio = servicios[id];

    if (!servicio) {
        alert("El servicio seleccionado no existe.");
        return;
    }

    carrito.push({
        id: id,
        nombre: servicio.nombre,
        precio: servicio.precio
    });

    guardarCarrito();
    mostrarCarrito();

    alert(servicio.nombre + " agregado correctamente.");
}


// 5. Mostrar los productos seleccionados
function mostrarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const contador = document.getElementById("contador");
    const botonPedido = document.getElementById("btn-pedido");

    // Si no estamos en la página del carrito,
    // no ejecutamos la función.
    if (!lista || !totalElemento || !contador || !botonPedido) {
        return;
    }

    // Actualizar contador
    contador.textContent = carrito.length;

    // Mostrar mensaje si está vacío
    if (carrito.length === 0) {

        lista.innerHTML = `
            <div class="vacio">
                <div class="icono-vacio">🛍️</div>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega un plan para comenzar tu pedido.</p>
            </div>
        `;

        totalElemento.textContent = "$0.00";
        botonPedido.disabled = true;

        return;
    }

    // Limpiar la lista anterior
    lista.innerHTML = "";

    let total = 0;

    // Recorrer todos los productos
    carrito.forEach(function(producto, indice) {

        total += producto.precio;

        const elemento = document.createElement("div");

        elemento.className = "item-carrito";

        const informacion = document.createElement("div");
        informacion.className = "item-info";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = "Servicio digital de InstaYA";

        informacion.appendChild(nombre);
        informacion.appendChild(descripcion);

        const precioDiv = document.createElement("div");
        precioDiv.className = "item-precio";

        const precio = document.createElement("strong");
        precio.textContent = "$" + producto.precio.toFixed(2) + "/mes";

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function() {
            eliminarDelCarrito(indice);
        });

        precioDiv.appendChild(precio);
        precioDiv.appendChild(botonEliminar);

        elemento.appendChild(informacion);
        elemento.appendChild(precioDiv);

        lista.appendChild(elemento);
    });

    // Mostrar total
    totalElemento.textContent = "$" + total.toFixed(2);

    // Activar botón
    botonPedido.disabled = false;
}


// 6. Eliminar un servicio
function eliminarDelCarrito(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();
    mostrarCarrito();
}


// 7. Vaciar todo el carrito
function vaciarCarrito() {

    if (carrito.length === 0) {
        alert("Tu carrito ya está vacío.");
        return;
    }

    const confirmar = confirm(
        "¿Deseas eliminar todos los servicios del carrito?"
    );

    if (confirmar) {

        carrito = [];

        guardarCarrito();
        mostrarCarrito();

        alert("Carrito vaciado correctamente.");
    }
}


// 8. Finalizar solicitud
function finalizarPedido() {

    if (carrito.length === 0) {
        alert("Primero agrega un servicio.");
        return;
    }

    let total = 0;

    carrito.forEach(function(producto) {
        total += producto.precio;
    });

    alert(
        "¡Gracias por elegir InstaYA!\n\n" +
        "Servicios seleccionados: " + carrito.length +
        "\nTotal mensual estimado: $" + total.toFixed(2) +
        "\n\nAhora completa tus datos en Contacto."
    );

    window.location.href = "contacto.html";
}


// 9. Inicializar el carrito
document.addEventListener("DOMContentLoaded", function() {
    mostrarCarrito();
});