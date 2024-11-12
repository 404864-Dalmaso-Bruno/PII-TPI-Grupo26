document.addEventListener('DOMContentLoaded', () => { 
    const API_URL = 'https://localhost:7283/api/Funciones/Funciones';
    const PELICULAS_URL = 'https://localhost:7283/api/Peliculas'; // Asegúrate de que esta URL sea correcta
    const SALAS_URL = 'https://localhost:7283/api/Funciones/Combo/Salas'; // URL de salas
    const HORARIOS_URL = 'https://localhost:7283/api/Funciones/Combo/Horarios'; // URL de horarios
    const HOY = new Date(); // Fecha de hoy

    const selectEstado = document.getElementById('selEStado');
    let valselect = parseInt(selectEstado.value);

    selectEstado.addEventListener('change', function(event) {
        valselect = parseInt(event.target.value);
        fetchfunciones();
    });

    let peliculasCache = [];
    let salasCache = [];
    let horariosCache = [];
    
    // Función para cargar las películas, salas y horarios en cache
    async function cargarDatos() {
        try {
            // Cargar películas
            const peliculasResponse = await fetch(PELICULAS_URL);
            peliculasCache = await peliculasResponse.json();
            console.log('Películas cargadas:', peliculasCache);

            // Cargar salas
            const salasResponse = await fetch(SALAS_URL);
            salasCache = await salasResponse.json();
            console.log('Salas cargadas:', salasCache);

            // Cargar horarios
            const horariosResponse = await fetch(HORARIOS_URL);
            horariosCache = await horariosResponse.json();
            console.log('Horarios cargados:', horariosCache);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }

    // Función para obtener las funciones 
    async function fetchfunciones() { 
        try { 
            const response = await fetch(API_URL); 
            const funciones = await response.json();    
            cargarfunciones(funciones); 
        } catch (error) { 
            console.error('Error al obtener las funciones:', error); 
        } 
    }

    // Función para crear las filas de la tabla 
    async function cargarfunciones(funciones) {
        const tbody = document.getElementById('funciones-body');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        for (const funcion of funciones) {
            const row = document.createElement('tr');
            row.id = `fila-${funcion.idFuncion}`; // Asignar ID único a la fila

            if(valselect == 0 || (valselect == 1 && funcion.estado == true) || (valselect == 2 && !funcion.estado == true) ){

                // Columna Titulo (Obtenemos el título de la película)
                const titTd = document.createElement('td');
                titTd.textContent = await buscarTitulo(funcion.idPelicula); 
                row.appendChild(titTd);

                // Columna Nro sala (Obtenemos el nombre de la sala)
                const salaTd = document.createElement('td');
                salaTd.classList.add('centrado');
                salaTd.textContent = await buscarNroSala(funcion.idSala);
                row.appendChild(salaTd);

                // Columna Fecha desde
                const desdeTd = document.createElement('td');
                desdeTd.textContent = formatearFecha(funcion.fechaDesde);
                row.appendChild(desdeTd);

                // Columna Fecha hasta
                const hastaTD = document.createElement('td');
                hastaTD.textContent = formatearFecha(funcion.fechaHasta);
                row.appendChild(hastaTD);

                // Columna Horario (Obtenemos el horario)
                const horarioTd = document.createElement('td');
                const hora = await buscarHorario(funcion.idHorario);
                horarioTd.textContent = formatearHora(hora); // Usa formatearHora en lugar de formatearFecha
                row.appendChild(horarioTd);

                // Columna Precio
                const precioTd = document.createElement('td');
                precioTd.classList.add('centrado');
                precioTd.textContent = funcion.precio;
                row.appendChild(precioTd);

                // Columna Estado
                const estadoTd = document.createElement('td');
                const fechaHasta = new Date(funcion.fechaHasta)

                if(fechaHasta < HOY && funcion.estado == true){
                    darDeBaja(funcion.idFuncion);
                    funcion.estado = false;
                }
                estadoTd.textContent = funcion.estado ? 'Activo' : 'Inactivo';
                row.appendChild(estadoTd);

                // Columna Acciones (Eliminar)
                const accionesTd = document.createElement('td');
                const eliminarBtn = document.createElement('button'); // Botón Eliminar
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                eliminarBtn.textContent = 'Eliminar';
                if(funcion.estado){
                    eliminarBtn.addEventListener('click', () => { 
                        if (confirm('¿Estás seguro que deseas dar de baja esta funcion?')) { 
                            darDeBajafuncion(funcion.idFuncion);
                        } 
                    }); 
                }else {
                    eliminarBtn.disabled = true;
                }

                // Columna Acciones (Editar)    
                const editarBtn = document.createElement('button'); // Botón editar
                editarBtn.classList.add('btn', 'btn-primary', 'btn-sm');
                editarBtn.textContent = 'Editar';
                editarBtn.addEventListener('click', () => {
                    if (confirm('Ir a editar?')) {
                        window.location.href = `EditarFuncion.html?idFuncion=${funcion.idFuncion}`;
                    }
                });

                accionesTd.appendChild(editarBtn);
                accionesTd.appendChild(eliminarBtn);
                row.appendChild(accionesTd);

                // Agregar la fila a la tabla
                tbody.appendChild(row);
            }
        }
    }

    // Función para formatear la hora en formato 12 horas AM/PM
    function formatearHora(fechaISO) {
        const fecha = new Date(fechaISO);
        let horas = fecha.getHours();
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        let ampm = 'AM';

        // Convertir a formato de 12 horas
        if (horas >= 12) {
            ampm = 'PM';
        }
        horas = horas % 12;
        horas = horas ? horas : 12; // La hora 0 se convierte en 12

        return `${horas}:${minutos} ${ampm}`;
    }

    async function buscarNroSala(id) {
        try {
            const response = await fetch(SALAS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener nro de sala');
            }
            const salas = await response.json();
            const sala = salas.find(p => p.idSala === id);
            return sala ? sala.nroSala : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el nro de sala:', error);
            return 'Desconocido';
        }
    }

    async function buscarHorario(id) {
        try {
            const response = await fetch(HORARIOS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener el horario');
            }
            const horarios = await response.json();
            const horario = horarios.find(h => h.idHorario === id);
            return horario ? horario.horario1 : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el horario:', error);
            return 'Desconocido';
        }
    }

    async function buscarTitulo(id) {
        try {
            const response = await fetch(PELICULAS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener las peliculas');
            }
            const peliculas = await response.json();
            const pelicula = peliculas.find(p => p.idPelicula === id);
            return pelicula ? pelicula.titulo : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el titulo:', error);
            return 'Desconocido';
        }
    }

    // Función para dar de baja una función
    async function darDeBaja(id) { 
        try { 
            const response = await fetch(`https://localhost:7283/api/Funciones/${id}`, { 
                method: 'DELETE', 
            }); 
        } catch (error) { 
            console.error('Error al dar de baja la funcion:', error); 
            alert('Ocurrió un error al intentar dar de baja la funcion'); 
        } 
    }

    // Función para dar de baja una película 
    async function darDeBajafuncion(id) { 
        try { //api/Funciones/${id}
            const response = await fetch(`https://localhost:7283/api/Funciones/${id}`, { 
                method: 'DELETE', 
            }); 

            if (response.ok) { 
                fetchfunciones(); // Recargar las películas después de dar de baja 
            } else {
                alert('Error al dar de baja la funcion'); 
            } 
        } catch (error) { 
            console.error('Error al dar de baja la funcion:', error); 
            alert('Ocurrió un error al intentar dar de baja la funcion'); 
        } 
    } 

    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);   
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
        const anio = fecha.getFullYear();
    
        // Formatear en dd/mm/yyyy
        return `${dia}/${mes}/${anio}`;
    }

    // Llamar a la función para cargar las películas cuando la página cargue 
    fetchfunciones(); 
});
