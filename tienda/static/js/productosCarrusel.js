document.addEventListener('DOMContentLoaded', () => {
const productosContainer = document.getElementById('productos-container');
const carouselInner = document.getElementById('carouselInner');
const badgeElement = document.getElementById('badge');

actualizarBadge(); // Actualiza el badge al valor actual

$(document).ready(function() {
    $.ajax({
        url: '/api/productos_populares/',
        method: 'GET',
        success: function(data) {
            const productos = data.map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            }));
            crearCardProducto(productos);
            agregarEventListeners();
        },
        error: function(error) {
            console.error('Error al obtener los productos populares:', error);
        }
    });
});

// Aquí se crea el carousel con los productos
crearCardProducto(productos);

function crearCardProducto(productos) {
    const cantidadCardsPorSlide = 4;
    const cantidadCards = productos.length;
    
    // Contenedor de los slides
    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('carousel-inner');
    
    for (var i = 0; i < cantidadCards; i++) {
        // Crea un nuevo slide cuando sea necesario
        if (i % cantidadCardsPorSlide === 0) {
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            if (i === 0) {
                slide.classList.add('active');
            }

            // Contenedor adicional para los cards dentro del slide
            const cardsContainer = document.createElement('div');
            cardsContainer.classList.add('row','mx-auto', 'w-75', 'row-cols-2', 'row-cols-lg-4');
            slide.appendChild(cardsContainer);

            slidesContainer.appendChild(slide);
        }

        // Crea el card y lo agrega al slide actual
        const card = document.createElement('div');
        card.classList.add('p-2');
        card.innerHTML = `
            <div class="card h-100">
                <img src="/media/${productos[i].foto}" class="card-img-top border-bottom border-2" alt="${productos[i].nombre}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="mb-4">
                        <h5 class="card-title">${formatearPrecio(productos[i].precio)}</h5>
                        <p class="card-text">${productos[i].nombre}</p>
                    </div>
                    <button class="btn btn-primary agregar-carrito w-80 mx-auto"
                    data-id="${productos[i].id}"
                    data-nombre="${productos[i].nombre}"
                    data-precio="${productos[i].precio}"
                    data-foto="${productos[i].foto}">
                    agregar al carrito
                    </button>
                </div>
            </div>
        `;
        
        slidesContainer.lastElementChild.lastElementChild.appendChild(card);
    }

    document.getElementById('carouselExample').prepend(slidesContainer);
}


function formatearPrecio(precio) {
    const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
    });
    return formatter.format(precio);
}

function agregarEventListeners() {
    const productosContainer = document.getElementById('carouselExample');

    productosContainer.addEventListener('click', event => {
        if (event.target.classList.contains('agregar-carrito')) {
            const button = event.target;
            const id = button.dataset.id;
            const nombre = button.dataset.nombre;
            const precio = parseFloat(button.dataset.precio);
            const foto = button.dataset.foto; // Agregar la imagen

            agregarProductoAlCarrito(id, nombre, precio, foto);
            // Iniciar animación
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
    
    if (cantidadProductos === 0) {
        // Si la cantidad de productos es 0, oculta la insignia
        badgeElement.style.display = 'none';
    } else {
        if (cantidadProductos > 9) {
            badgeElement.textContent = '9+';
        } else {
            badgeElement.textContent = cantidadProductos;
        }
        // Si hay productos en el carrito, muestra la cantidad y la insignia
        badgeElement.style.display = 'block'; // Asegúrate de que la insignia esté visible
    }
    
    // Guardar la cantidad de productos en el carrito en localStorage
    localStorage.setItem('cantidadProductos', cantidadProductos);
}

function iniciarAnimacionProducto(button) {
    const cart = $('#botonCarrito');
    const imgtodrag = $(button).closest('.card').find("img").eq(0);

    if (imgtodrag.length) {
        // Calcular la posición del centro de la imagen
        const imgCenterTop = imgtodrag.offset().top + imgtodrag.height() / 2;
        const imgCenterLeft = imgtodrag.offset().left + imgtodrag.width() / 2;

        const imgclone = imgtodrag.clone()
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100',
                'top': imgCenterTop - 75, // Ajustar para centrar la imagen clonada
                'left': imgCenterLeft - 75 // Ajustar para centrar la imagen clonada
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1000, 'easeInOutExpo');

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach();
        });
    }
}

});
