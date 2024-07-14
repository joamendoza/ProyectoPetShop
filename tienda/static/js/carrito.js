document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const totalAmount = document.getElementById('total-amount');
    const emptyMessage = document.getElementById('empty-message');
    const badgeElement = document.getElementById('badge');

    mostrarCarrito();
    actualizarBadge();

    function mostrarCarrito() {
        const carrito = obtenerCarrito();
        carritoContainer.innerHTML = '';
        const total = calcularTotal(carrito);
        totalAmount.textContent = formatearPrecio(total);

        if (carrito.length === 0) {
            emptyMessage.style.borderRadius = '10px';
            emptyMessage.style.display = 'block';
            emptyMessage.style.fontWeight = 'bold';
            emptyMessage.innerHTML = `
                <h1>🛒</h1>
                <p>¡Empieza un carrito de compras!</p>
                <a id="redirect-btn" class="btn btn-primary mt-3" href="/index/">Volver al Inicio</a>
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
            badgeElement.style.display = 'none';
        } else {
            badgeElement.textContent = cantidadProductos > 9 ? '9+' : cantidadProductos;
            badgeElement.style.display = 'block';
        }
        
        localStorage.setItem('cantidadProductos', cantidadProductos);
    }

    function formatearPrecio(precio) {
        const formatter = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
        return formatter.format(precio);
    }

    function crearCardCarrito(item) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-4');

        card.innerHTML = `
            <div class="card-body d-flex align-items-center">
                <img src="/media/${item.foto}" class="card-img-top me-3" alt="${item.nombre}" style="max-width: 80px;">
                <div class="d-flex flex-column flex-grow-1">
                    <h5 class="card-title">${item.nombre}</h5>
                    <button class="btn btn-danger btn-eliminar btn-sm mb-2 align-self-start" data-id="${item.id}">Eliminar</button>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <button class="btn btn-primary btn-sm btn-decrementar" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.cantidad}</span>
                        <button class="btn btn-primary btn-sm btn-incrementar" data-id="${item.id}">+</button>
                    </div>
                    <p class="card-text ms-3">${formatearPrecio(item.precio)}</p>
                </div>
            </div>
        `;

        return card;
    }

    carritoContainer.addEventListener('click', event => {
        event.preventDefault();

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
        actualizarBadge();
        mostrarCarrito();
    }

    function decrementarCantidad(id) {
        let carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        if (producto.cantidad > 1) {
            producto.cantidad--;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarBadge();
            mostrarCarrito();
        }
    }

    function eliminarProducto(id) {
        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarBadge();
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

    document.getElementById('comprar-btn').addEventListener('click', function() {
        const carrito = obtenerCarrito();
        let productos = carrito.map(item => ({
            id: item.id,
            cantidad: item.cantidad
        }));

        fetch(realizarCompraUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ productos: productos })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Compra realizada con éxito');
                localStorage.removeItem('carrito');
                mostrarCarrito();
                actualizarBadge();
            } else {
                alert('Error al realizar la compra');
            }
        });
    });
});
