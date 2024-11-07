  
document.addEventListener('DOMContentLoaded', () => { 
    
    const API_URL = 'https://localhost:7283/api/Peliculas'; 

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
    function cargarPeliculas(peliculas) { 
        const tbody = document.getElementById('peliculas-body'); 
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas 
        
        peliculas.forEach(pelicula => { 
            const row = document.createElement('tr'); 
            row.id = `fila-${pelicula.idPelicula}`; // Asignar ID único a la fila

            // Columna Titulo 
            const titTd = document.createElement('td'); 
            titTd.textContent = pelicula.titulo; 
            row.appendChild(titTd); 

            // Columna Genero 
            const generoTd = document.createElement('td'); 
            generoTd.textContent = buscarGenero(pelicula.idGenero);
            row.appendChild(generoTd);

            // Columna Clasificacion 
            const clasifTd = document.createElement('td'); 
            clasifTd.textContent = pelicula.idClasificacion; 
            row.appendChild(clasifTd);
            // Columna Idioma 
            const idiomaTd = document.createElement('td'); 
            idiomaTd.textContent = pelicula.idIdioma; 
            row.appendChild(idiomaTd); 

            // Columna Estado 
            const estadoTd = document.createElement('td'); 
            estadoTd.textContent = pelicula.estado; 
            row.appendChild(estadoTd); 

            // Columna Acciones (Eliminar) 
            const accionesTd = document.createElement('td'); 
            const eliminarBtn = document.createElement('button'); // Botón eliminarBtn 
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
                    //LOGICA PARA EDITAR <<------------------------[!!!!]
                    window.location.href = `EditarPelicula.html?idPelicula=${pelicula.idPelicula}`;//redirecciona a EditarPelicua.html con idPelicula por parametro
                } 
            });

            accionesTd.appendChild(editarBtn);   //El orden en que se agregar modifica cual se ve primero
            accionesTd.appendChild(eliminarBtn);    
            
            row.appendChild(accionesTd); 

            

            // Agregar la fila a la tabla 
            tbody.appendChild(row);
        }); 
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


     
    // Cargar Generos en el select   <<------------------------[!!!!]
    async function buscarGenero(id) { 
        try { 
            let elGenero = [];
            const response = await fetch(`https://localhost:7283/Generos`); 
            const Generos = await response.json();
            Generos.forEach(genero => { 
                if(genero.idGenero == id)
                    return genero.genero1;
            }); 
            

            return elGenero[id-1];
            

        } catch (error) { 
            console.error('Error al buscar los generos:', error); 
            alert('Ocurrió un error al buscar los generos'); 
        } 
    }



    // Llamar a la función para cargar las películas cuando la página cargue 
    fetchPeliculas(); 
});