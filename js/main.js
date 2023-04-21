const tareas = document.getElementById("lista-tareas");

const db = window.localStorage;

let lastId = localStorage.getItem('lastId') || 0;

const guardarTarea = (db, tarea) => {
    db.setItem(tarea.id, JSON.stringify(tarea));
    localStorage.setItem('lastId', lastId.toString());
    window.location.href = '/';
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
    for(clave of claves){
        if (clave !== 'lastId') {
            let tarea = JSON.parse(db.getItem(clave));
            crearTarea(tareas, tarea, db);     
        }
    }
}

const crearTarea = (tareas, tarea, db) => {
    let divTarea = document.createElement('div');
    let tituloTarea = document.createElement('h3');
    let descripcionTarea = document.createElement('p');
    let fechaTarea = document.createElement('p');
    let iconoBorrar = document.createElement('span')

    tituloTarea.innerHTML = tarea.titulo;
    descripcionTarea.innerHTML = tarea.descripcion;
    fechaTarea.innerHTML = tarea.fecha;
    iconoBorrar.innerHTML = '<i class="fa fa-times-circle-o"></i>'

    divTarea.classList.add('Tarea');
    iconoBorrar.classList.add('iconoBorrar')

    iconoBorrar.onclick = () => {
        db.removeItem(tarea.id);
        window.location.href = '/';
    }

    divTarea.appendChild(tituloTarea);
    divTarea.appendChild(descripcionTarea);
    divTarea.appendChild(fechaTarea);
    divTarea.appendChild(iconoBorrar);

    tareas.appendChild(divTarea);
}


cargarTareas(db, tareas);


