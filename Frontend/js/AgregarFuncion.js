document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formFuncion');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío del formulario

        // Obtenemos los datos del formulario
        const sala = document.getElementById('idSala').value;
        const hor = document.getElementById('idHorario').value;
        const horario = new Date(hor).toISOString();
        const formato = document.getElementById('idFormato').value;
        const pelicula = document.getElementById('idPelicula').value;
        const precio = document.getElementById('idPrecio').value;
        const desde = document.getElementById('idDesde').value;
        const hasta = document.getElementById('idHasta').value;
        // "idFuncion": 0,
        // "idSala": 0,
        // "idHorario": 0,
        // "idFormato": 0,
        // "estado": true,
        // "idPelicula": 0,
        // "precio": 0,
        // "fechaDesde": "2024-11-06T14:30:47.360Z",
        // "fechaHasta": "2024-11-06T14:30:47.360Z",
        // "detallesTickets": [ 
        // Creamos el objeto que vamos a enviar
        const nuevaFuncion = {
            idFuncion: 0,
            idSala: sala,
            idHorario : horario,
            idFormato: formato,
            estado: true,
            idPelicula: pelicula,
            precio: precio,
            fechaDesde: desde,
            fechaHasta: hasta,
            detallesTickets: [],
              // Si no tienes funciones aún, puedes dejarlo vacío
        };
        
        // Hacemos la solicitud POST a la API
        fetch('https://localhost:7283/api/Funciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaFuncion),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Funcion agregada:', data);
            document.getElementById('responseMessage').textContent = 'Funcion agregada exitosamente.';
        })
        .catch(error => {
            console.error('Error al agregar la Funcion:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al agregar la funcion.';
        });
    });
});