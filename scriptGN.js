document.addEventListener('DOMContentLoaded', () => {
    let loadMoreBtn = document.querySelector('#load-more');
    let showLessBtn = document.querySelector('#show-less');
    let currentItem = 4;

    // Mostrar más productos
    loadMoreBtn.onclick = () => {
        let boxes = document.querySelectorAll('.box-container .box.hidden');
        for (let i = 0; i < 4 && i < boxes.length; i++) {
            boxes[i].classList.remove('hidden');
        }
        currentItem += 4;
        if (currentItem >= document.querySelectorAll('.box-container .box').length) {
            loadMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        }
    };

    // Mostrar menos productos
    showLessBtn.onclick = () => {
        let boxes = document.querySelectorAll('.box-container .box');
        for (let i = 4; i < boxes.length; i++) {
            boxes[i].classList.add('hidden');
        }
        currentItem = 4;
        loadMoreBtn.style.display = 'block';
        showLessBtn.style.display = 'none';
    };

    // Inicialización al cargar la página
    window.onload = () => {
        let totalBoxes = document.querySelectorAll('.box-container .box').length;
        if (currentItem >= totalBoxes) {
            loadMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'block';
            showLessBtn.style.display = 'none';
        }
    };

    // Funcionalidad de agregar al carrito
    const carrito = document.querySelector('#carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarProducto);
    });

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    function agregarProducto(e) {
        e.preventDefault();
        const producto = e.target.parentElement;
        leerDatosProducto(producto);
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('a').getAttribute('data-id')
        };
        insertarCarrito(infoProducto);
    }

    function insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    }

    function vaciarCarrito(e) {
        e.preventDefault();
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
    }

    // Eliminar productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    function eliminarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
        }
    }
});

