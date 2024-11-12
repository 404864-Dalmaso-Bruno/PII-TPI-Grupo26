  
document.addEventListener('DOMContentLoaded', () => { 
    const API_URL = 'https://localhost:7283/api/peliculas';
    const GENEROS_URL = 'https://localhost:7283/api/peliculas/generos';
    const CLASIFICACIONES_URL = 'https://localhost:7283/api/peliculas/clasificaciones';
    const IDIOMAS_URL = 'https://localhost:7283/api/peliculas/idiomas';

    let idiomasCache = [];

    const selectEstado = document.getElementById('selEStado');
    let valselect = parseInt(selectEstado.value);

    selectEstado.addEventListener('change', function(event) { //DETECTA SI HUBO CAMBIOS EN EL SELECT DE ESTADOS
        valselect = parseInt(event.target.value);
        fetchPeliculas();
    });

    // Función para obtener las películas 
    async function fetchPeliculas() { 
        try { 
            const response = await fetch(API_URL); 
            const peliculas = await response.json(); 
            cargarPeliculas(peliculas); 
        } catch (error) { 
            console.error('Error al obtener las peliculas:', error); 
        } 
    } 

    // Función para crear las filas de la tabla 
    async function cargarPeliculas(peliculas) {
        const tbody = document.getElementById('peliculas-body');
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        // Obtener todos los idiomas al inicio para evitar múltiples peticiones
        if (idiomasCache.length === 0) {
            await cargarIdiomas();
        }

        // Iteramos sobre cada película
        for (const pelicula of peliculas) {
            const row = document.createElement('tr');
            row.id = `fila-${pelicula.idPelicula}`;

            if(valselect == 0 || (valselect == 1 && pelicula.estado == true) || (valselect == 2 && !pelicula.estado == true) ){

                const titTd = document.createElement('td');
                titTd.textContent = pelicula.titulo;//=======[ TITULO ]
                row.appendChild(titTd);

                // =====================================================================Obtener y mostrar el género
                const generoTd = document.createElement('td');
                const genero = await buscarGenero(pelicula.idGenero);//=======[ GENERO ] 
                generoTd.textContent = genero;
                row.appendChild(generoTd);

                // =====================================================================Obtener y mostrar la clasificación
                const clasifTd = document.createElement('td');
                const clasificacion = await buscarClasificacion(pelicula.idClasificacion);//=======[ CLASIFICACION ]
                clasifTd.textContent = clasificacion;
                row.appendChild(clasifTd);

                //===================================================================== Obtener y mostrar el idioma
                const idiomaTd = document.createElement('td');
                const idioma = obtenerIdioma(pelicula.idIdioma); //=======[ IDIOMA ]
                idiomaTd.textContent = idioma;
                row.appendChild(idiomaTd);

                //===================================================================== Estado de la película
                const estadoTd = document.createElement('td');
                estadoTd.textContent = pelicula.estado ? 'Activo' : 'Inactivo';//=======[ ESTADO ]
                row.appendChild(estadoTd);

                //===================================================================== Botones de acción (editar, eliminar)
                const accionesTd = document.createElement('td');

                const eliminarBtn = document.createElement('button');//=======[ ELIMINAR ]
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                eliminarBtn.textContent = 'Eliminar';
                if(pelicula.estado){
                    eliminarBtn.addEventListener('click', () => { 
                        if (confirm('¿Estás seguro que deseas dar de baja este componente?')) { 
                            darDeBajaPelicula(pelicula.idPelicula);
                        } 
                    });   
                }else{eliminarBtn.disabled = true;}

                const editarBtn = document.createElement('button'); // Botón editar 
                editarBtn.classList.add('btn', 'btn', 'btn-sm'); 
                editarBtn.textContent = 'Editar'; 
                editarBtn.addEventListener('click', () => { 
                    if (confirm('Ir a editar?')) { 
                        window.location.href = `EditarPelicula.html?idPelicula=${pelicula.idPelicula}`;//Redirecciona a EditarPelicua.html con idPelicula por parametro
                    } 
                });

                accionesTd.appendChild(editarBtn);
                accionesTd.appendChild(eliminarBtn);

                row.appendChild(accionesTd);
                tbody.appendChild(row);
            }
        }
    } 

    // Función para cargar todos los idiomas desde la API y guardarlos en cache ===========================================================[!]
    async function cargarIdiomas() {
        try {
            const response = await fetch(IDIOMAS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener los idiomas');
            }
            const idiomas = await response.json();
            idiomasCache = idiomas; // Guardar idiomas en cache
            console.log('Idiomas cargados:', idiomasCache);
        } catch (error) {
            console.error('Error al cargar los idiomas:', error);
        }
    }

    // Función para buscar el género de una película
    async function buscarGenero(id) {
        try {
            const response = await fetch(GENEROS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener los géneros');
            }
            const generos = await response.json();
            const genero = generos.find(g => g.idGenero === id);
            return genero ? genero.genero1 : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el género:', error);
            return 'Desconocido';
        }
    }

    // Función para buscar la clasificación de una película
    async function buscarClasificacion(id) {
        try {
            const response = await fetch(CLASIFICACIONES_URL);
            if (!response.ok) {
                throw new Error('Error al obtener las clasificaciones');
            }
            const clasificaciones = await response.json();
            const clasificacion = clasificaciones.find(c => c.idClasificacion === id);
            return clasificacion ? clasificacion.clasificacion : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar la clasificación:', error);
            return 'Desconocido';
        }
    }

    // Función para obtener el idioma de una película de los idiomas cargados en cache
    function obtenerIdioma(id) {
        const idioma = idiomasCache.find(i => i.idIdioma === id);
        console.log('Idioma encontrado:', idioma);  // Verificar si el idioma se encuentra correctamente
        return idioma ? idioma.idioma1 : 'Desconocido';  // Devolver solo la propiedad idioma1
    }

    //[]
    // const params = new URLSearchParams(window.location.search);
    // const param1 = params.get('param1'); // 'valor1'
    // const param2 = params.get('param2'); // 'valor2'

    // Función para dar de baja una película 
    async function darDeBajaPelicula(id) { 
        try { 
            const response = await fetch(`${API_URL}/${id}`, { 
                method: 'DELETE', 
            }); 

            if (response.ok) { 
                alert('Película dada de baja con éxito'); 
                fetchPeliculas(); // Recargar las películas después de dar de baja 
            } else {
                alert('Error al dar de baja la película'); 
            } 
        } catch (error) { 
            console.error('Error al dar de baja la película:', error); 
            alert('Ocurrió un error al intentar dar de baja la película'); 
        } 
    } 

    // Llamar a la función para cargar las películas cuando la página cargue 
    fetchPeliculas(); 
});