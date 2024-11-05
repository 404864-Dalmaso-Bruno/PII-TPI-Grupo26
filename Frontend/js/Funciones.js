document.addEventListener('DOMContentLoaded', () => { 
    const API_URL = 'https://localhost:44321/api/Funciones/Funciones'; 
    
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
    function cargarfunciones(funciones) { 
        const tbody = document.getElementById('funciones-body'); 
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas 
        
        funciones.forEach(funcion => { 
            const row = document.createElement('tr'); 
            row.id = `fila-${funcion.idfuncion}`; // Asignar ID único a la fila

            // Columna Titulo 
            const titTd = document.createElement('td'); 
            titTd.textContent = funcion.idPelicula; 
            row.appendChild(titTd); 

            // Columna Nro sala 
            const salaTd = document.createElement('td'); 
            salaTd.textContent = funcion.idSala; 
            row.appendChild(salaTd);

            // Columna Fecha desde 
            const desdeTd = document.createElement('td'); 
            desdeTd.textContent = funcion.fechaDesde; 
            row.appendChild(desdeTd);
            // Columna fecha hasta 
            const hastaTD = document.createElement('td'); 
            hastaTD.textContent = funcion.fechaHasta; 
            row.appendChild(hastaTD); 

            // Columna Horario 
            const horarioTd = document.createElement('td'); 
            horarioTd.textContent = funcion.idHorario; 
            row.appendChild(horarioTd); 

            // Columna Precio 
            const precioTd = document.createElement('td'); 
            precioTd.textContent = funcion.precio; 
            row.appendChild(precioTd); 

            // Columna Estado 
            const estadoTd = document.createElement('td'); 
            estadoTd.textContent = funcion.estado; 
            row.appendChild(estadoTd);

            // Columna Acciones (Eliminar) 
            const accionesTd = document.createElement('td'); 
            const eliminarBtn = document.createElement('button'); // Botón Eliminar 
            eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm'); 
            eliminarBtn.textContent = 'Eliminar'; 
            eliminarBtn.addEventListener('click', () => { 
                if (confirm('¿Estás seguro que deseas dar de baja esta funcion?')) { 
                    darDeBajafuncion(funcion.idFuncion);
                } 
            }); 
            accionesTd.appendChild(eliminarBtn);
            row.appendChild(accionesTd); 

            // Agregar la fila a la tabla 
            tbody.appendChild(row);
        }); 
    } 

    // Función para dar de baja una película 
    async function darDeBajafuncion(id) { 
        try { //api/Funciones/${id}
            const response = await fetch(`https://localhost:44321/api/Funciones/${id}`, { 
                method: 'DELETE', 
            }); 

            if (response.ok) { 
                alert('Funcion dada de baja con éxito'); 
                fetchfunciones(); // Recargar las películas después de dar de baja 
            } else {
                alert('Error al dar de baja la funcion'); 
            } 
        } catch (error) { 
            console.error('Error al dar de baja la funcion:', error); 
            alert('Ocurrió un error al intentar dar de baja la funcion'); 
        } 
    } 

    // Llamar a la función para cargar las películas cuando la página cargue 
    fetchfunciones(); 
});