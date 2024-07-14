function valorBadgeCarrito() {
    const cantidadProductos = localStorage.getItem('cantidadProductos');
    console.log('La cantidad de productos en el carrito es:', cantidadProductos);
    const badgeElement = document.getElementById('badge');
    if (badgeElement) {
        if (cantidadProductos === null || cantidadProductos === '0') {
            // Si la cantidad de productos es null (no está definida) o es 0, oculta la insignia
            badgeElement.style.display = 'none';
        } else {
            // Si hay productos en el carrito, muestra la cantidad y la insignia
            if (cantidadProductos > 9) {
                badgeElement.textContent = '9+';
            } else {
                badgeElement.textContent = cantidadProductos;
            }
            badgeElement.style.display = 'block'; // Asegúrate de que la insignia esté visible
        }
    }
}

document.addEventListener('DOMContentLoaded', valorBadgeCarrito);