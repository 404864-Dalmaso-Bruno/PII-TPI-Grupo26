document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formPelicula');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío del formulario

        // Obtenemos los datos del formulario
        const titulo = document.getElementById('titulo').value;
        const duracion = document.getElementById('duracion').value;
        const sinopsis = document.getElementById('sinopsis').value;
        const clasificacion = document.getElementById('clasificacion').value;
        const genero = document.getElementById('genero').value;
        const idioma = document.getElementById('idioma').value;

        

        // Creamos el objeto que vamos a enviar
        const nuevaPelicula = {
            titulo: titulo,
            duracion: duracion,
            sinopsis: sinopsis,
            idClasificacion: clasificacion,
            idGenero: genero,
            idIdioma: idioma,
            estado: true,
            funciones: []  // Si no tienes funciones aún, puedes dejarlo vacío
        };
        
        // Hacemos la solicitud POST a la API
        fetch('https://localhost:7283/api/Peliculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaPelicula),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Película agregada:', data);
            document.getElementById('responseMessage').textContent = 'Película agregada exitosamente.';
            if (confirm('Ir al listado?')) { 
                window.location.href = 'Peliculas.html';
            }else{
                window.location.href = 'AgregarPelicula.html';
            }
        })
        .catch(error => {
            console.error('Error al agregar la película:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al agregar la película.';
        });
    });
});