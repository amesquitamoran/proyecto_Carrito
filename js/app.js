//seleceionamos las variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCurso = document.querySelector('#lista-cursos')
let articulosCarrito =[];

cargarEventListeners()

function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCurso.addEventListener('click',agregarCurso);
    //eliminar carrito
    carrito.addEventListener('click', eliminarCurso)
}

// funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCursos(cursoSeleccionado);
    }
    
}
//eliminar curso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito= articulosCarrito.filter(curso => curso.id!== cursoId)
        carritoHTML();
    }
}

//leer los datos del html al que le demos clic

function leerDatosCursos(curso){
    //crear un objeto con el contendio del curso actual
    /* console.log(curso) */
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombreDelCurso: curso.querySelector('h4').textContent,
        precioDelCurso: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some( cursoss => cursoss.id === infoCurso.id)
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    }else{
        //agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(articulosCarrito)
    carritoHTML()
}

//mostrar el carrito de compras

function carritoHTML(){
    //limpiar el html
    limpiarHTML()
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso =>{
        console.log(curso)
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.nombreDelCurso}</td>
            <td>${curso.precioDelCurso}</td>
            <td>${curso.cantidad}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
    /* limpiarHTML() */
}

//limpiar los curso del tbody
function limpiarHTML(){
    //forma lenta
    /* contenedorCarrito.innerHTML ='' */
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
