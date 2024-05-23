// Obtener elementos
const wrapper = document.querySelector('.wrapper');
const footer = document.getElementById('footer');

// Función para ajustar el comportamiento del footer
function ajustarFooter() {
    // Obtener altura del wrapper, de la ventana del navegador y del footer
    const wrapperHeight = wrapper.offsetHeight;
    const windowHeight = window.innerHeight;
    const footerHeight = footer.offsetHeight;

    // Calcular la altura mínima requerida para que el footer quede completamente visible
    const minHeight = windowHeight - footerHeight;

    // Verificar si la altura del contenido más la altura del footer es menor o igual que la altura de la ventana
    if (wrapperHeight + footerHeight <= windowHeight) {
        footer.style.position = 'fixed'; // Si la altura del contenido más la altura del footer es menor o igual que la altura de la ventana, el footer se mantiene fijo en la parte inferior de la vista
        footer.style.bottom = '0';
    } else {
        footer.style.position = 'relative'; // Si no, el footer se mantiene en su posición relativa
    }
}

// Función para ajustar el comportamiento del footer al eliminar elementos de la vista
function ajustarFooterAlEliminar(event) {
    // Verificar si el evento es de tipo DOMNodeRemoved y si el nodo eliminado afecta el tamaño del documento
    if (event && event.type === 'DOMNodeRemoved' && document.body.scrollHeight !== windowHeight) {
        ajustarFooter();
    }
}

// Ejecutar la función al cargar la página y al cambiar el tamaño del documento
window.addEventListener('DOMContentLoaded', ajustarFooter);
document.addEventListener('resize', ajustarFooter);
// Ejecutar la función al eliminar elementos de la vista
document.addEventListener('DOMNodeRemoved', ajustarFooterAlEliminar);
