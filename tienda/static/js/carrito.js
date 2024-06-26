document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const totalAmount = document.getElementById('total-amount');
    const emptyMessage = document.getElementById('empty-message');
    const badgeElement = document.getElementById('badge');
    
    mostrarCarrito();
    actualizarBadge(); // Llamar a la función para actualizar el badge al cargar la página

    function mostrarCarrito() {
        const carrito = obtenerCarrito();
        carritoContainer.innerHTML = '';
        const total = calcularTotal(carrito);
        totalAmount.textContent = formatearPrecio(total);

        if (carrito.length === 0) {
            // Modificar mensaje en que caso de que no hayan elementos agregados al carrito
            emptyMessage.style.borderRadius = '10px';
            emptyMessage.style.display = 'block';
            emptyMessage.style.fontWeight = 'bold';
            emptyMessage.innerHTML = `
                <h1>🛒</h1>
                <p>¡Empieza un carrito de compras!</p>
                <a button id="redirect-btn" class="btn btn-primary mt-3" href="/index/">Volver al Inicio</a>
            `;
        } else {
            emptyMessage.style.display = 'none';
            carrito.forEach(item => {
                const card = crearCardCarrito(item);
                carritoContainer.appendChild(card);
            });
        }
    }

    function actualizarBadge() {
        const carrito = obtenerCarrito();
        const cantidadProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        if (cantidadProductos === 0) {
            // Si la cantidad de productos es 0, oculta la insignia
            badgeElement.style.display = 'none';
        } else {
            if (cantidadProductos > 9) {
                badgeElement.textContent = '9+';
            } else {
                badgeElement.textContent = cantidadProductos;
            }
            badgeElement.style.display = 'block'; // Asegúrate de que la insignia esté visible
        }
        
        // Guardar la cantidad de productos en el carrito en localStorage
        localStorage.setItem('cantidadProductos', cantidadProductos);
    }

    // Función para formatear el precio en pesos chilenos (CLP)
    function formatearPrecio(precio) {
        const formatter = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
        return formatter.format(precio);
    }
    
    // Función encargada de crear y modificar las cartas de los productos en el carrito
    function crearCardCarrito(item) {
        console.log(item.foto); // Agregar esta línea para depuración
        const card = document.createElement('div');
        // Modificar cartas
        card.classList.add('card', 'mb-4');

        card.innerHTML = `
            <div class="card-body d-flex align-items-center">
                <!-- Imagen del producto a la izquierda -->
                <img src="/media/${item.foto}" class="card-img-top me-3" alt="${item.nombre}" style="max-width: 80px;">
                
                <!-- Contenedor del contenido a la derecha -->
                <div class="d-flex flex-column flex-grow-1">
                    <!-- Nombre del producto -->
                    <h5 class="card-title">${item.nombre}</h5>
                    <!-- Botón Eliminar -->
                    <button class="btn btn-danger btn-eliminar btn-sm mb-2 align-self-start" data-id="${item.id}">Eliminar</button>
                </div>
                <!-- Contenedor de Cantidad y Precio -->
                <div class="d-flex justify-content-between align-items-center">
                    <!-- Cantidad -->
                    <div>
                        <button class="btn btn-primary btn-sm btn-decrementar" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.cantidad}</span>
                        <button class="btn btn-primary btn-sm btn-incrementar" data-id="${item.id}">+</button>
                    </div>
                    <!-- Precio -->
                    <p class="card-text ms-3">${formatearPrecio(item.precio)}</p>
                </div>
            </div>
        `;

        return card;
    }

    carritoContainer.addEventListener('click', event => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado de los botones

        if (event.target.classList.contains('btn-incrementar')) {
            const id = event.target.dataset.id;
            incrementarCantidad(id);
        }

        if (event.target.classList.contains('btn-decrementar')) {
            const id = event.target.dataset.id;
            decrementarCantidad(id);
        }

        if (event.target.classList.contains('btn-eliminar')) {
            const id = event.target.dataset.id;
            eliminarProducto(id);
        }
    });

    function incrementarCantidad(id) {
        let carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        producto.cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadge(); // Llamar a la función para actualizar el badge
        mostrarCarrito();
    }

    function decrementarCantidad(id) {
        let carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        if (producto.cantidad > 1) {
            producto.cantidad--;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarBadge(); // Llamar a la función para actualizar el badge
            mostrarCarrito();
        }
    }

    function eliminarProducto(id) {
        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarBadge(); // Llamar a la función para actualizar el badge
            mostrarCarrito();
        }
    }

    function obtenerCarrito() {
        return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    }

    function calcularTotal(carrito) {
        return carrito.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    }
});