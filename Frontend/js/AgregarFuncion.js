document.addEventListener('DOMContentLoaded', function() {
    // Capturamos el formulario
    const form = document.getElementById('formFuncion');

    const URL_SALAS ='https://localhost:7283/api/Funciones/Combo/Salas';
    const URL_HORARIO = 'https://localhost:7283/api/Funciones/Combo/Horarios';
    const URL_FORMATO = '[??????????]';//====================================================[??????????]
    const URL_PELICULA = 'https://localhost:7283/api/Funciones/Combo/Peliculas';

    const selectSalas = document.getElementById('idSala');
    const SelectHorario = document.getElementById('idHorario');
    const selectFormato = document.getElementById('idFormato');
    const selectPelicula = document.getElementById('idPelicula');
    const inputPrecio = document.getElementById('idPrecio');
    const fechaDesde = document.getElementById('idFechaDesde');
    const fechaHasta = document.getElementById('idFechaHasta');

    //================================================================================================ [CARGAR SALAS]
    // const selectSalas = document.getElementById('idSala'); 
    
    cargarSalas(); 
    // Cargar Salas en el select 
    async function cargarSalas() { 
        try { 
            const response = await fetch(URL_SALAS); 
            const salas = await response.json();
            selectSalas .innerHTML = '';
            salas.forEach(sala => { 
                const option = document.createElement('option'); 
                option.value = sala.idSala; // Código como valor 
                option.textContent = 'Sala nro: ' + sala.nroSala ; // Nombre como texto 
                selectSalas.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar salas:', error); 
            alert('Ocurrió un error al cargar los salas'); 
        } 
    }

    //================================================================================================ [CARGAR HORARIO]
    // const SelectHorario = document.getElementById('horario'); 
        
// for (const funcion of funciones) {


    cargarHorarios(); 
    // Cargar Horarios en el select 
    async function cargarHorarios() { 
        try { 
            const response = await fetch(URL_HORARIO); 
            const horarios = await response.json();
            SelectHorario .innerHTML = '';

            for(const horario of horarios ){
                const option = document.createElement('option'); 
                const hora = horario.horario1;
                option.value = horario.idHorario; // Código como valor 
                option.textContent = formatearHora(hora) ; // Nombre como texto 
                SelectHorario.appendChild(option); 
            }; 
        } catch (error) { 
            console.error('Error al cargar horarios:', error); 
            alert('Ocurrió un error al cargar los horarios'); 
        } 
    } 

    //================================================================================================ [CARGAR FORMATO]
    // const selectFormato = document.getElementById('formato'); 
        
    // cargarFormatos(); 
    // // Cargar formatos en el select 
    // async function cargarFormatos() { 
    //     try { 
    //         const response = await fetch(URL_FORMATO); 
    //         const formatos = await response.json();
    //         selectFormato .innerHTML = '';
    //         formatos.forEach(formato => { 
    //             const option = document.createElement('option'); 
    //             option.value = formato.idFormato; // Código como valor 
    //             option.textContent = formato.nombre ; // Nombre como texto 
    //             selectFormato.appendChild(option); 
    //         }); 
    //     } catch (error) { 
    //         console.error('Error al cargar formatos:', error); 
    //         alert('Ocurrió un error al cargar los formatos'); 
    //     } 
    // }
     //================================================================================================ [CARGAR PELICULA]

    
    cargarPeliculas(); 
    // Cargar Peliculas en el select 
    async function cargarPeliculas() { 
        try { 
            const response = await fetch(URL_PELICULA); 
            const Peliculas = await response.json();
            selectPelicula .innerHTML = '';
            Peliculas.forEach(pelicula => { 
                const option = document.createElement('option'); 
                option.value = pelicula.idPelicula; // Código como valor 
                option.textContent = pelicula.titulo ; // Nombre como texto 
                selectPelicula.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar Peliculas:', error); 
            alert('Ocurrió un error al cargar los Peliculas'); 
        } 
    } 
    //================================================================================================

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
            window.location.href = 'Funciones.html';
            if (confirm('Ir al listado?')) { 
                window.location.href = 'Funciones.html';
            }else{
                window.location.href = 'AgregarFuncion.html';
            }
      
        })
        .catch(error => {
            console.error('Error al agregar la funcion:', error);
            document.getElementById('responseMessage').textContent = 'Hubo un error al agregar la funcion.';
        });
    });
});