  
document.addEventListener('DOMContentLoaded', () => { 
    
    const API_URL = 'https://localhost:7283/Tickets'; 

    // Función para obtener las películas 
    async function fetchTickets() { 
        try { 
            const response = await fetch(API_URL); 
            const tickets = await response.json(); 
            cargarTickets(tickets); 
        } catch (error) { 
            console.error('Error al obtener los tickets:', error); 
        } 
    } 
    
    // Función para crear las filas de la tabla 
    function cargarTickets(tickets) { 
        const tbody = document.getElementById('tickets-body'); 
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas 
        
        tickets.forEach(ticket => { 
            const row = document.createElement('tr'); 
            row.id = `fila-${ticket.idTicket}`; // Asignar ID único a la fila

            // Columna Ticket 
            const ticketTd = document.createElement('td'); 
            ticketTd.textContent = ticket.idTicket; 
            row.appendChild(ticketTd); 

            // Columna Cliente 
            const clienteTd = document.createElement('td'); 
            clienteTd.textContent = ticket.idCliente;
            row.appendChild(clienteTd);

            // Columna Empleado 
            const empleadoTd = document.createElement('td'); 
            empleadoTd.textContent = ticket.idEmpleado; 
            row.appendChild(empleadoTd);

            // Columna Promocion 
            const promocionTd = document.createElement('td'); 
            promocionTd.textContent = ticket.idPromocion; 
            row.appendChild(promocionTd);//ticket.idPromocion


            // Columna Forma Pago
            const pagoTd = document.createElement('td'); 
            pagoTd.textContent = ticket.idFormaPago; 
            row.appendChild(pagoTd); 

            

            // Columna Monto 
            const montoTd = document.createElement('td'); 
            montoTd.textContent = ticket.total; 
            row.appendChild(montoTd); 

            // Columna estado 
            const estadoTd = document.createElement('td'); 
            estadoTd.textContent = ticket.estado; 
            row.appendChild(estadoTd);

            // Columna Acciones (Eliminar) 
            const accionesTd = document.createElement('td'); 
            const eliminarBtn = document.createElement('button'); // Botón Eliminar 
            eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm'); 
            eliminarBtn.textContent = 'Eliminar'; 
            eliminarBtn.addEventListener('click', () => { 
                if (confirm('¿Estás seguro que deseas dar de baja este ticket?')) { 
                    darDeBajaTicket(ticket.idTicket);
                } 
            }); 
            
            accionesTd.appendChild(eliminarBtn);    
            
            row.appendChild(accionesTd); 

            

            // Agregar la fila a la tabla 
            tbody.appendChild(row);
        }); 
    } 

    function editarTicket (id){
        //Logica ?
    }



    // Función para dar de baja una película 
    async function darDeBajaTicket(id) { 
        try { 
            const response = await fetch(`https://localhost:7283/api/Tickets/${id}`, { 
                method: 'DELETE', 
            }); 

            if (response.ok) { 
                alert('Ticket dado de baja con éxito'); 
                fetchTickets(); // Recargar las películas después de dar de baja 
            } else {
                alert('Error al dar de baja el ticket'); 
            } 
        } catch (error) { 
            console.error('Error al dar de baja el ticket:', error); 
            alert('Ocurrió un error al intentar dar de baja el ticket'); 
        } 
    } 


     
    // Cargar Generos en el select   <<------------------------[!!!!]
    async function buscarCliente(id) { 
        try { 
            let elGenero = [];
            const response = await fetch(`https://localhost:7283/Generos`); 
            const Generos = await response.json();
            Generos.forEach(genero => { 
                elGenero.push(genero.genero1)
            }); 
            

            return elGenero[id-1];
            

        } catch (error) { 
            console.error('Error al buscar los generos:', error); 
            alert('Ocurrió un error al buscar los generos'); 
        } 
    }



    // Llamar a la función para cargar las películas cuando la página cargue 
    fetchTickets(); 
});