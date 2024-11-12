document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formPelicula');

        const params = new URLSearchParams(window.location.search);
        const paramId = params.get('idPelicula'); // Pelicula a editar

        //https://localhost:7283/api/Peliculas/1
        fetchPeliculaById()
        async function fetchPeliculaById() { 
            try { 
                const response = await fetch(`https://localhost:7283/api/Peliculas/${paramId}`); 
                const pelicula = await response.json(); 
                cargarPelicula(pelicula); 
            } catch (error) { 
                console.error('Error al obtener las peliculas:', error); 
            } 
        } 

        

        function cargarPelicula(pelicula){

            const idPelicula = document.getElementById('idPelicula');
            const titulo = document.getElementById('titulo');
            const duracion = document.getElementById('duracion');
            const sinopsis = document.getElementById('sinopsis');
            const clasificacion = document.getElementById('clasificacion');
            const genero = document.getElementById('genero');
            const idioma = document.getElementById('idioma');
            const estado = document.getElementById('estado');

            idPelicula.value = pelicula.idPelicula;
            titulo.value = pelicula.titulo;
            duracion.value = pelicula.duracion;
            sinopsis.value = pelicula.sinopsis;
            clasificacion.value = pelicula.idClasificacion;
            genero.value = pelicula.idGenero;
            idioma.value = pelicula.idIdioma;
            if(pelicula.estado)
                estado.value = 1;
            else
                estado.value = 0;

        }


        form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío del formulario

        

        // Obtenemos los datos del formulario
        const idpelicula = document.getElementById('idPelicula').value;
        const titulo = document.getElementById('titulo').value;
        const duracion = document.getElementById('duracion').value;
        const sinopsis = document.getElementById('sinopsis').value;
        const clasificacion = document.getElementById('clasificacion').value;
        const genero = document.getElementById('genero').value;
        const idioma = document.getElementById('idioma').value;
        let estado = true;
        if(document.getElementById('estado').value == 1 )
        {estado = true;}
        else 
        {estado = false}  




        //const estado  = document.getElementById('estado')

        // Creamos el objeto que vamos a enviar
        const nuevaPelicula = {
            idPelicula : idpelicula,
            titulo: titulo,
            duracion: duracion,
            sinopsis: sinopsis,
            idClasificacion: clasificacion,
            idGenero: genero,
            idIdioma: idioma,
            estado: estado,
            funciones: []  // Si no tienes funciones aún, puedes dejarlo vacío
        };
        
        // Hacemos la solicitud POST a la API
        fetch(`https://localhost:7283/api/Peliculas/${paramId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaPelicula),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Película agregada:', data);
            document.getElementById('responseMessage').textContent = 'Película agregada exitosamente.';
            window.location.href = `Peliculas.html`;
        })
        .catch(error => {
            console.error('Error al editar la película:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al agregar la película.';
        });
    });
});