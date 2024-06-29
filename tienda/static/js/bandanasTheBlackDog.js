document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('contenedorBandanasTheBlackDog');

    $(document).ready(function() {
        $.ajax({
            url: '/api/productos_bandana_theblackdog/',
            method: 'GET',
            success: function(data) {
                const productos = data.map(producto => ({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    foto: producto.foto
                }));
                crearCardsBandanas(productos);
                agregarEventListeners();
            },
            error: function(error) {
                console.error('Error al obtener los productos de tipo bandana:', error);
            }
        });
    });

    function crearCardsBandanas(productos) {
        productosContainer.innerHTML = '';

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('col', 'mb-4');
            card.innerHTML = `
                <div class="card">
                    <img src="/media/${producto.foto}" class="card-img-top" alt="${producto.nombre}"></button>
                    <div class="card-body">
                        <h4 class="card-title">${producto.nombre}</h4>
                        <p class="card-text" style="font-size: 130%">${formatearPrecio(producto.precio)}</p>
                        <button class="btn btn-primary agregar-carrito w-100"
                            data-id="${producto.id}"
                            data-nombre="${producto.nombre}"
                            data-precio="${producto.precio}"
                            data-foto="${producto.foto}">
                            agregar al carrito
                        </button>
                    </div>
                </div>
            `;
            productosContainer.appendChild(card);
        });
    }

    function formatearPrecio(precio) {
        const formatter = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
        return formatter.format(precio);
    }

    function agregarEventListeners() {
        productosContainer.addEventListener('click', event => {
            if (event.target.classList.contains('agregar-carrito')) {
                const button = event.target;
                const id = button.dataset.id;
                const nombre = button.dataset.nombre;
                const precio = parseFloat(button.dataset.precio);
                const foto = button.dataset.foto;

                agregarProductoAlCarrito(id, nombre, precio, foto);
                iniciarAnimacionProducto(button);
            }
        });
    }

    function agregarProductoAlCarrito(id, nombre, precio, foto) {
        let carrito = obtenerCarrito();
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, foto, cantidad: 1 });
        }

        // Mostrar el toast de producto añadido
        const toastElement = document.getElementById('toastAdded');
        const toastInstance = new bootstrap.Toast(toastElement, { delay: 2000 }); // Configura el tiempo de duración en milisegundos (2000 ms = 2 segundos)
        toastInstance.show();

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBadge(); // Actualiza el badge
    }

    function obtenerCarrito() {
        return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    }

    function actualizarBadge() {
        const carrito = obtenerCarrito();
        const cantidadProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

        const badgeElement = document.getElementById('badge');
        if (cantidadProductos === 0) {
            badgeElement.style.display = 'none';
        } else {
            if (cantidadProductos > 9) {
                badgeElement.textContent = '9+';
            } else {
                badgeElement.textContent = cantidadProductos;
            }
            badgeElement.style.display = 'block';
        }

        localStorage.setItem('cantidadProductos', cantidadProductos);
    }

    function iniciarAnimacionProducto(button) {
        const cart = $('#botonCarrito');
        const imgtodrag = $(button).closest('.card').find("img").eq(0);
    
        console.log('Imagen a arrastrar:', imgtodrag);
    
        if (imgtodrag.length) {
            console.log('Posición inicial:', imgtodrag.offset().top, imgtodrag.offset().left);
    
            const imgclone = imgtodrag.clone()
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100',
                    'top': imgtodrag.offset().top + imgtodrag.height() / 2 - 75,
                    'left': imgtodrag.offset().left + imgtodrag.width() / 2 - 75
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, {
                    duration: 1000,
                    easing: 'easeInOutExpo',
                    complete: function () {
                        $(this).detach();
                        console.log('Animación completa');
                    }
                });
    
            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                console.log('Reducción de tamaño completa');
            });
        } else {
            console.log('No se encontró ninguna imagen para arrastrar.');
        }
    }
});
