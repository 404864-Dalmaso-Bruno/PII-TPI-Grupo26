document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formFuncion');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío del formulario

        // Obtenemos los datos del formulario
        const sala = parseInt(document.getElementById('idSala').value, 10);
        const horario = parseInt(document.getElementById('idHorario').value, 10); 
        const formato = parseInt(document.getElementById('idFormato').value, 10);
        const pelicula = parseInt(document.getElementById('idPelicula').value, 10);
        const precio = parseFloat(document.getElementById('idPrecio').value);

        const desde = document.getElementById('idDesde').value;
        const hasta = document.getElementById('idHasta').value;

        const fechaInputDesde = new Date(desde);  // Crea un objeto Date 
        const fechaDesde = fechaInputDesde.toISOString(); // Convierte a formato ISO 8601 <<OK>>

        const fechaInputHasta = new Date(hasta);  // Crea un objeto Date 
        const fechaHasta = fechaInputHasta.toISOString(); // Convierte a formato ISO 8601 <<OK>>



        const nuevaFuncion = {
            idFuncion: 0, // Asumimos que es autogenerado
            idSala: sala,
            idHorario: horario,
            idFormato: formato,
            estado: true,
            idPelicula: pelicula,
            precio: precio,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta,
            detallesTickets: [], // Sin detalles por ahora
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
            console.error('Error al agregar la funcion:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al agregar la funcion.';
        });
    });
});