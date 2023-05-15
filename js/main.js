const tareas = document.getElementById("lista-tareas");

const db = window.localStorage;

let lastId = localStorage.getItem('lastId') || 0;

const guardarTarea = (db, tarea) => {
    db.setItem(tarea.id, JSON.stringify(tarea));
    localStorage.setItem('lastId', lastId.toString());

    success("Registrado Correctamente")

    setTimeout(function() {
        window.location.href = '/';
      }, 2000);

    //window.location.href = '/';
}

function procesarFormulario(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById("fecha").value;

    let tarea = {
        id: ++lastId,
        titulo: titulo,
        descripcion: descripcion,
        fecha: fecha
    }

    guardarTarea(db, tarea);

    event.target.reset();
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', procesarFormulario);

const cargarTareas = (db, tareas) => {
    let claves = Object.keys(db);
    for (clave of claves) {
        if (clave !== 'lastId') {
            let tarea = JSON.parse(db.getItem(clave));
            crearTarea(tareas, tarea, db);
        }
    }
}

const crearTarea = (tareas, tarea, db) => {
    let divTarea = document.createElement('div');
    let tituloTarea = document.createElement('h4');
    let descripcionTarea = document.createElement('p');
    let fechaTarea = document.createElement('p');
    let iconoBorrar = document.createElement('span')

    tituloTarea.innerHTML = tarea.titulo;
    descripcionTarea.innerHTML = tarea.descripcion;
    fechaTarea.innerHTML = tarea.fecha;
    iconoBorrar.innerHTML = '<i class="fa fa-times-circle-o"></i>'

    divTarea.classList.add('tarea');
    descripcionTarea.classList.add('descripcion')
    fechaTarea.classList.add('fechaTarea')
    iconoBorrar.classList.add('iconoBorrar')

    iconoBorrar.onclick = () => {
        db.removeItem(tarea.id);
        window.location.href = '/';

        /*
        let descripcion = prompt("Please enter your name:", "Harry Potter");
        let traida = JSON.parse(localStorage.getItem(tarea.id));
        traida.descripcion = descripcion
        db.setItem(tarea.id, JSON.stringify(traida))
        window.location.href = '/';
        */
    }

    divTarea.appendChild(iconoBorrar);
    divTarea.appendChild(tituloTarea);
    divTarea.appendChild(descripcionTarea);
    divTarea.appendChild(fechaTarea);

    tareas.appendChild(divTarea);
}

const success = (texto) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    Toast.fire({
        icon: 'success',
        title: texto
    })
}


cargarTareas(db, tareas);

var pckry = new Packery(tareas, {
    itemSelector: '.tarea',
    columnWidth: 250,
    gutter: 5,
});

pckry.getItemElements().forEach(function (itemElem) {
    var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
});