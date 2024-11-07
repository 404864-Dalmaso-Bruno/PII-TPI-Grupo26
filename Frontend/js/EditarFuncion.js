document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formFuncion');

        const params = new URLSearchParams(window.location.search);
        const paramId = params.get('idFuncion'); // Funcion a editar

        //https://localhost:7283/api/Funciones/1
        fetchFuncionById()
        async function fetchFuncionById() { 
            try { 
                const response = await fetch(`https://localhost:7283/api/Funciones/Funciones/${paramId}`); 
                const funcion = await response.json(); 
                cargarFuncion(funcion); 
            } catch (error) { 
                console.error('Error al obtener las Funciones:', error); 
            } 
        } 

        function cargarFuncion(funcion){

            const idFuncion = document.getElementById('idFuncion');
            const sala = document.getElementById('idSala');
            const horario = document.getElementById('idHorario');
            const formato = document.getElementById('idFormato');
            const pelicula = document.getElementById('idPelicula');
            const precio = document.getElementById('idPrecio');
            const desde = document.getElementById('idDesde');
            const hasta = document.getElementById('idHasta');
            const estado = document.getElementById('estado');

            idFuncion.value = funcion.idFuncion;
            sala.value = funcion.idSala;
            horario.value = funcion.idHorario;
            formato.value = funcion.idFormato;
            pelicula.value = funcion.idPelicula;
            precio.value = funcion.precio;
            desde.value = funcion.fechaDesde;
            hasta.value = funcion.fechaHasta
            if(funcion.estado)
                estado.value = 1;
            else
                estado.value = 0;

        }


        form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío del formulario

        // Obtenemos los datos del formulario
        const idFuncion = document.getElementById('idFuncion');
        const sala = document.getElementById('idSala');
        const horario = document.getElementById('idHorario');
        const formato = document.getElementById('idFormato');
        const pelicula = document.getElementById('idPelicula');
        const precio = document.getElementById('idPrecio');
        const desde = document.getElementById('idDesde');
        const hasta = document.getElementById('idHasta');
        let estado = true;
        if(document.getElementById('estado').value == 1 )
        {estado = true;}
        else 
        {estado = false}  
        //const estado  = document.getElementById('estado')

        // Creamos el objeto que vamos a enviar
        const nuevaFuncion = {
            idFuncion : idFuncion,
            idSala: sala,
            idHorario: horario,
            idFormato: formato,
            estado: estado,
            idPelicula: pelicula,
            precio: precio,
            fechaDesde: desde,
            fechaHasta : hasta,
            detallesTickets: []  
        };
        
        // solicitud PUT 
        fetch(`https://localhost:7283/api/Funciones/${paramId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaFuncion),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Funcion editada:', data);
            document.getElementById('responseMessage').textContent = 'Funcion editada exitosamente.';
            //window.location.href = `Funciones.html`;
        })
        .catch(error => {
            console.error('Error al editar la funcion:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al editar la funcion.';
        });
    });
});