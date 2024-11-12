document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://localhost:7283/Tickets';
    const CLIENTES_URL = 'https://localhost:7283/Clientes'; // URL de los clientes
    const EMPLEADOS_URL = 'https://localhost:7283/Empleados'; // URL de los empleados
    const PROMOCIONES_URL = 'https://localhost:7283/Promociones'; // URL de las promociones
    const FORMAS_PAGO_URL = 'https://localhost:7283/FormasDePago'; // URL de las formas de pago
    const DETALLES_URL = 'https://localhost:7283/Detalles' // URL de detalles
    
    const selectEstado = document.getElementById('selEStado');
    let valselect = parseInt(selectEstado.value);

    selectEstado.addEventListener('change', function(event) {
        valselect = parseInt(event.target.value);
        fetchTickets();
    });


    //================================================================== [OBTENER TICKETS]
    async function fetchTickets() {
        try {
            const response = await fetch(API_URL);
            const tickets = await response.json();
            cargarTickets(tickets);
        } catch (error) {
            console.error('Error al obtener los tickets:', error);
        }
    }
    //================================================================== [OBTENER DETALLES]
    // fetchDetalles();

    async function fetchDetalles(id) {
        try {
            const response = await fetch(DETALLES_URL);
            const detalles = await response.json();
            const det = detalles.filter(d => d.idTicket === id);
            return det;
        } catch (error) {
            console.error('Error al obtener los detalles:', error);
        }
    }
    //================================================================== 

    // Función para crear las filas de la tabla
    async function cargarTickets(tickets) {
        const tbody = document.getElementById('tickets-body');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        for (const ticket of tickets) {
            console.log('Ticket:', ticket); // Verifica la estructura de cada ticket

            if(valselect == 0 || (valselect == 1 && ticket.estado == true) || (valselect == 2 && !ticket.estado == true) ){
                
                const row = document.createElement('tr');
                row.id = `fila-${ticket.idTicket}`; // Asignar ID único a la fila

                // Columna Ticket
                const ticketTd = document.createElement('td');
                ticketTd.textContent = ticket.idTicket;
                row.appendChild(ticketTd);

                // Columna Cliente
                const clienteTd = document.createElement('td');
                const clienteNombre = await buscarCliente(ticket.idCliente); // Obtener nombre del cliente
                clienteTd.textContent = clienteNombre || 'Desconocido';
                row.appendChild(clienteTd);

                //===================================================================== Columna Empleado

                const empleadoTd = document.createElement('td');
                const empleadoNombre = await buscarEmpleado(ticket.idEmpleado); 
                empleadoTd.textContent = empleadoNombre || 'Desconocido';
                row.appendChild(empleadoTd);

                // ===================================================================== [ Columna Promocion ]

                const promocionTd = document.createElement('td');
                const promocionNombre = await buscarPromocion(ticket.idPromocion); 
                promocionTd.textContent = promocionNombre || 'Sin promoción';
                row.appendChild(promocionTd);

                //===================================================================== Columna Forma de Pago
                const pagoTd = document.createElement('td');
                pagoTd.classList.add('centrado');
                const idFormaPago = ticket.idFormaPago;

                if (idFormaPago) {
                    const formaPago = await buscarFormaPago(idFormaPago); // Obtener forma de pago
                    pagoTd.textContent = formaPago || 'Desconocido';
                } else {
                    pagoTd.textContent = 'Desconocido'; // Si no hay forma de pago, mostramos "Desconocido"
                }

                row.appendChild(pagoTd);

                //===================================================================== Columna Fecha
                const fechaTd = document.createElement('td');
                fechaTd.classList.add('centrado');
                fechaTd.textContent = formatearFecha (ticket.fecha);
                row.appendChild(fechaTd);

                // ===================================================================== Columna Monto
                const montoTd = document.createElement('td');
                montoTd.classList.add('centrado');
                montoTd.textContent = ticket.total;
                row.appendChild(montoTd);

                // ===================================================================== Columna Estado
                const estadoTd = document.createElement('td');
                estadoTd.textContent = ticket.estado ? 'Activo' : 'Inactivo';
                row.appendChild(estadoTd);
                
                // ===================================================================== Columna Acciones (Eliminar)
                const accionesTd = document.createElement('td');
                const eliminarBtn = document.createElement('button'); // Botón Eliminar
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                eliminarBtn.textContent = 'Eliminar';

                if(ticket.estado){
                    eliminarBtn.addEventListener('click', () => { 
                        if (confirm('¿Estás seguro que deseas dar de baja este ticket?')) { 
                            darDeBajaTicket(ticket.idTicket);
                        } 
                    });   
                }else{eliminarBtn.disabled = true;}
               

                accionesTd.appendChild(eliminarBtn);
                row.appendChild(accionesTd);
                // ===================================================================== Columna detalles
                const detallesTd = document.createElement('td');

                const selectDet = document.createElement('select');

                // Usar `filter` para obtener todos los `detalles` que coincidan con el `idTicket`
                const det = await fetchDetalles(ticket.idTicket);


                // Si hay detalles que coinciden, agregar la opción `idFuncion` (puede ser la primera)
                if (det.length > 0) {
                    const optionFuncion = document.createElement('option');
                    optionFuncion.value = det[0].idFuncion; // Usar el `idFuncion` del primer elemento coincidente
                    optionFuncion.textContent = 'Funcion' + det[0].idFuncion; // Nombre como texto
                    selectDet.appendChild(optionFuncion);
                }

                // Agregar las opciones de `idButaca` por cada `detalle` encontrado
                det.forEach(detalle => {
                    const optionButaca = document.createElement('option');
                    optionButaca.value = detalle.idButaca;
                    optionButaca.textContent = 'butaca' + detalle.idButaca; // Nombre como texto

                    selectDet.appendChild(optionButaca);
                });

                // Agregar el `select` al `td` de `detalles`
                detallesTd.appendChild(selectDet);

                // Agregar `detallesTd` a la fila y la fila al cuerpo de la tabla
                row.appendChild(detallesTd);



                tbody.appendChild(row);
            }
        
        }
    }




    




    // Función para dar de baja un ticket
    async function darDeBajaTicket(id) {
        try {
            const response = await fetch(`https://localhost:7283/api/Tickets/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Ticket dado de baja con éxito');
                fetchTickets(); // Recargar los tickets después de dar de baja
            } else {
                alert('Error al dar de baja el ticket');
            }
        } catch (error) {
            console.error('Error al dar de baja el ticket:', error);
            alert('Ocurrió un error al intentar dar de baja el ticket');
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

    // Función para buscar el nombre del cliente
    async function buscarCliente(id) {
        try {
            const response = await fetch(CLIENTES_URL);
            const clientes = await response.json();
            const cliente = clientes.find(cliente => cliente.idCliente === id);
            return cliente ? cliente.nombre : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            return 'Desconocido';
        }
    }

    // Función para buscar el nombre del empleado
    async function buscarEmpleado(id) {
        try {
            const response = await fetch(EMPLEADOS_URL);
            const empleados = await response.json();
            const empleado = empleados.find(empleado => empleado.idEmpleado === id);
            return empleado ? empleado.nombre : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar el empleado:', error);
            return 'Desconocido';
        }
    }

    // Función para buscar el nombre de la promoción
    async function buscarPromocion(id) {
        try {
            const response = await fetch(PROMOCIONES_URL);
            const promociones = await response.json();
            const promocion = promociones.find(promocion => promocion.idPromocion === id);
            return promocion ? `Descuento: ${promocion.procentajeDescuento}%` : 'Sin promoción';
        } catch (error) {
            console.error('Error al buscar la promoción:', error);
            return 'Sin promoción';
        }
    }

    // Función para obtener la forma de pago
    async function buscarFormaPago(id) {
        try {
            const response = await fetch(FORMAS_PAGO_URL);
            const formasPago = await response.json();
            console.log('Formas de Pago:', formasPago); // Ver los datos en consola
            const formaPago = formasPago.find(forma => forma.idFormaPago === id);
            return formaPago ? formaPago.descripcion : 'Desconocido';
        } catch (error) {
            console.error('Error al buscar la forma de pago:', error);
            return 'Desconocido';
        }
    }

    // Llamar a la función para cargar los tickets cuando la página cargue
    fetchTickets();
});
