document.addEventListener('DOMContentLoaded', () => { 
    const API_URL = 'https://localhost:7283'; 
    
    const form = document.getElementById('form-orden'); 
    
    // Obtener los elementos del formulario 
    // const inputFecha = document.getElementById('input-fecha'); 
    // const inputModelo = document.getElementById('input-modelo'); 
    // const inputCantidad = document.getElementById('input-cantidad'); 

    const inputFecha = document.getElementById('input-fecha');
    const selectEmpleado = document.getElementById('listaEmpleado');
    const selectclientes = document.getElementById('listaClientes'); 
    const selectFormasPago = document.getElementById('listaFormasPago'); 
    const selectPromociones = document.getElementById('listaPromociones');
    const selectFunciones = document.getElementById('listaFunciones'); 
    const precioLabel = document.getElementById('labelPrecio');
    const precioTotal = document.getElementById('idPrecioTotal');
    const selectButacas = document.getElementById('butacas');

    //================================================================================================ [ CARGAR BUTACAS CON FILTRO]
 //const selectButacas = document.getElementById('butacas');
    
    cargarbutaca(); 
    // Cargar butaca en el select 
    async function cargarbutaca() {
        try {
            const response = await fetch(`https://localhost:7283/Butacas`);
            const butacas = await response.json();
            selectButacas.innerHTML = '';
            
            let opcionesAgregadas = false;

            for (const butaca of butacas) {
                // Espera a que se resuelva la promesa de `butacaReservada`
                const reservada = await butacaReservada(butaca.idButaca, selectFunciones.value);
                
                if (!reservada) {
                    const option = document.createElement('option');
                    option.value = butaca.idButaca; // Código como valor
                    option.textContent = butaca.numero; // Nombre como texto
                    selectButacas.appendChild(option);
                    opcionesAgregadas = true;
                }
            }
            if (!opcionesAgregadas) {
                const option = document.createElement('option');
                    option.disabled = true;
                    option.textContent = 'No hay butacas disponibles'; // Nombre como texto
                    selectButacas.appendChild(option);
            }


        } catch (error) {
            console.error('Error al cargar butacas:', error);
            alert('Ocurrió un error al cargar las butacas');
        }
    }
    //=============================  filtrar butacaReservada
    async function butacaReservada(idB, idF) {
        try {
            const response = await fetch(`https://localhost:7283/Butacas/Reservadas`); 
            const reservas = await response.json();
    
            for (const reserva of reservas) {
                if (reserva.idFuncion == idF && reserva.idButaca == idB) {
                    return true; 
                }
            }
    
            return false;
        } catch (error) { 
            console.error('Error al cargar reservas:', error); 
            alert('Ocurrió un error al cargar las reservas');
            return false; 
        }
    }
    



     //================================================================================================ [CARGAR EMPLEADO]
// const selectEmpleado = document.getElementById('empleado'); 
    
cargarEmpleados(); 
// Cargar Empleados en el select 
async function cargarEmpleados() { 
    try { 
        const response = await fetch(`https://localhost:7283/Empleados`); 
        const empleados = await response.json();
        selectEmpleado .innerHTML = '';
        empleados.forEach(empleado => { 
            const option = document.createElement('option'); 
            option.value = empleado.idEmpleado; // Código como valor 
            option.textContent = empleado.nombre ; // Nombre como texto 
            selectEmpleado.appendChild(option); 
        }); 
    } catch (error) { 
        console.error('Error al cargar empleados:', error); 
        alert('Ocurrió un error al cargar los empleados'); 
    } 
} 
 //================================================================================================ [CARGAR CLIENTES] 
//const selectclientes = document.getElementById('listaClientes'); 
    
    cargarClientes(); 
    // Cargar Clientes en el select 
    async function cargarClientes() { 
        try { 
            const response = await fetch(`https://localhost:7283/Clientes`); 
            const clientes = await response.json();
            selectclientes .innerHTML = '';
            clientes.forEach(cliente => { 
                const option = document.createElement('option'); 
                option.value = cliente.idCliente; // Código como valor 
                option.textContent = cliente.nombre; // Nombre como texto 
                selectclientes.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar clientes:', error); 
            alert('Ocurrió un error al cargar los clientes'); 
        } 
    } 
//================================================================================================[CARGAR FORMA PAGO]    
// const selectFormasPago = document.getElementById('listaFormasPago'); 
    
    cargarformaPago(); 
    // Cargar formaPago en el select 
    async function cargarformaPago() { 
        try { 
            const response = await fetch(`https://localhost:7283/FormasDePago`); 
            const formasPago = await response.json();
            selectFormasPago .innerHTML = '';
            formasPago.forEach(formaPago => { 
                const option = document.createElement('option'); 
                option.value = formaPago.idFormaPago; // Código como valor 
                option.textContent = formaPago.descripcion; // Nombre como texto 
                selectFormasPago.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar formas de Pago:', error); 
            alert('Ocurrió un error al cargar los formas de Pago'); 
        } 
    }
//================================================================================================[CARGAR PROMOCION]
// const selectPromociones = document.getElementById('listaPromociones'); 
    
    cargarPromocion(); 
    // Cargar Promociones en el select 
    async function cargarPromocion() { 
        try { 
            const response = await fetch(`https://localhost:7283/Promociones`); 
            const Promociones = await response.json();
            selectPromociones .innerHTML = '';
            Promociones.forEach(Promocion => { 
                const option = document.createElement('option'); 
                option.value = Promocion.idPromocion; // Código como valor 
                option.textContent = Promocion.procentajeDescuento + '%'; // % 

                option.dataset.descuento = Promocion.procentajeDescuento;

                selectPromociones.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar Promociones:', error); 
            alert('Ocurrió un error al cargar las Promocion'); 
        } 
    }
//================================================================================================[CARGAR FUNCIONES]
// const selectFunciones = document.getElementById('listaFunciones'); 
// const precioLabel = document.getElementById('labelPrecio');

    cargarFuncion(); 

    async function cargarFuncion() { 
        try { 
            const response = await fetch(`https://localhost:7283/Funciones`); 
            const Funciones = await response.json();
            const hoy = new Date(); // Fecha de hoy
    
            selectFunciones.innerHTML = '';
            Funciones.forEach(Funcion => { 
                const fechaHasta = new Date(Funcion.fechaHasta);
    
                // Verificar si fechaHasta es mayor que la fecha de hoy
                if (fechaHasta > hoy) {
                    const option = document.createElement('option'); 
                    option.value = Funcion.idFuncion; // Código como valor 
                    option.textContent = 'Funcion ' + Funcion.idFuncion + ', Sala ' + Funcion.idSala; // Texto de la opción
                    
                    option.dataset.precio = Funcion.precio;
                    
                    selectFunciones.appendChild(option); 
                }
            }); 
        } catch (error) { 
            console.error('Error al cargar Funciones:', error); 
            alert('Ocurrió un error al cargar las Funciones'); 
        } 
    }

    // Evento para actualizar el label cuando cambia la selección
    selectFunciones.addEventListener('change', function(event) {
    const selectedOption = event.target.selectedOptions[0]; // Opción seleccionada
    const precio = selectedOption.dataset.precio; // Obtener el precio del atributo data
    cargarbutaca();
    // Actualizar el contenido del label
    precioLabel.value = precio; 
    });
//================================================================================================[ RECORRER Y LEER TABLA DETALLES ]
    // Función para recorrer la tabla y obtener los detalles de la orden 
    function obtenerDetallesTabla() { 
        const tabla = document.getElementById('detailsTable'); 
        const filas = tabla.querySelectorAll('tbody tr'); 
        const detalles = [];
        
        let contador = 0;
        filas.forEach(fila => { 
            contador += 1;
            const id = parseInt(fila.children[0].textContent);  
            const funcion = parseInt (fila.children[1].textContent);
            const precio = parseFloat(fila.children[2].textContent);

            if (!isNaN(id) && !isNaN(funcion) && !isNaN(precio)) {
                detalles.push({
                    idDetalle: contador,
                    idTicket: 0,
                    idFuncion: funcion,
                    idButaca: id,
                    precioVenta: precio,
                    idButacaNavigation: null,
                    idFuncionNavigation: null
                });
            }else{
                console.log('Salteo el if al cargar los detalles');//Debugeando
            }
        }); 
        console.log('Detalles obtenidos:', detalles);//Debugeando
        return detalles; 
    } 

//================================================================================================[ EVENTO SUBMIT ]
     // Agregar un listener al formulario 
     form.addEventListener('submit', async (event) => { 
        event.preventDefault(); 

        const tableBody = document.querySelector('#bodyDetalles');
        if (tableBody.querySelectorAll('tr').length === 0) {
            alert("No hay detalles en la tabla. No se puede enviar el formulario."); 
        return; 
        }
        

        const tablaDeta = document.getElementById('detailsTable'); // Obtén la referencia de la tabla
        const filas = tablaDeta.rows; // Obtiene todas las filas de la tabla
        const cantidadFilas = filas.length;

       

        const fechaInput = new Date(inputFecha.value);  // Crea un objeto Date 
        const fecha = fechaInput.toISOString(); // Convierte a formato ISO 8601 <<OK>>

        const bodyEmpleado = parseInt(selectEmpleado.value);
        const bodyCliente = parseInt(selectclientes.value);
        const bodyFormaDePago = parseInt(selectFormasPago.value);
        const bodyPromocion = parseInt(selectPromociones.value);
        const bodyPrecio = parseFloat(precioTotal.value);
    
        // Recorrer la tabla de detalles 
        const detalles = obtenerDetallesTabla(); 
        
        //===========================================[ CARGAR LAS BUTACAS RESERVADAS ]
        async function reservar(detalles){
            for(const deta of detalles){
                const reserva = {
                    idReserva: 0,
                    idButaca: deta.idButaca,
                    idFuncion: deta.idFuncion,
                    idButacaNavigation: null,
                    idFuncionNavigation: null
                };
                try { 
                    const response = await fetch(`${API_URL}/Reservas`, { 
                        method: 'POST', 
                        headers: {    'Content-Type': 'application/json' 
                        }, 
                        body: JSON.stringify(reserva) 
                    }); 
        
                    if (!response.ok) {
                        console.error('Error en la solicitud:', response.status);
                        // manejo de errores ??
                    } else {
                        console.log('Solicitud exitosa');
                    }
                } catch (error) {
                    console.error('Error al RESERVAR:', error);
                }
            };
        }   

        // cuerpo del ticket para el POST 
        const body = { 
            idTicket: 0,                    //autogenerado
            fecha: fecha,               
            idCliente: bodyCliente,
            idEmpleado: bodyEmpleado,
            idMedioPedido: 1,               //defult
            idPromocion: bodyPromocion,
            idFormaPago: bodyFormaDePago,
            total: bodyPrecio,
            estado: true,
            detallesTicket : detalles
        };
    
        console.log(JSON.stringify(body));
        try { 
            const response = await fetch(`${API_URL}/api/Tickets`, { 
                method: 'POST', 
                headers: {    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify(body) 
            }); 

            if (!response.ok) {
                console.error('Error en la solicitud:', response.status);
                // manejo de errores ??
            } else {
                console.log('Solicitud exitosa');
                reservar(detalles);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        } 

        


    }); 
}); 
