document.addEventListener('DOMContentLoaded', () => { 
    const API_URL = 'https://localhost:44321'; 
 
    // Obtener los elementos del formulario 
    const form = document.getElementById('form-orden'); 
    const inputFecha = document.getElementById('input-fecha'); 
    const inputModelo = document.getElementById('input-modelo'); 
    const inputCantidad = document.getElementById('input-cantidad'); 

    
 //================================================================================================ Cargar clientes en el select 
 const selectclientes = document.getElementById('listaClientes'); 
    
    cargarClientes(); 
    // Cargar Clientes en el select 
    async function cargarClientes() { 
        try { 
            const response = await fetch(`https://localhost:44321/Clientes`); 
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
//================================================================================================
const selectFormasPago = document.getElementById('listaFormasPago'); 
    
    cargarformaPago(); 
    // Cargar formaPago en el select 
    async function cargarformaPago() { 
        try { 
            const response = await fetch(`https://localhost:44321/FormasDePago`); 
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
//================================================================================================
const selectPromociones = document.getElementById('listaPromociones'); 
    
    cargarPromocion(); 
    // Cargar Promociones en el select 
    async function cargarPromocion() { 
        try { 
            const response = await fetch(`https://localhost:44321/Promociones`); 
            const Promociones = await response.json();
            selectPromociones .innerHTML = '';
            Promociones.forEach(Promocion => { 
                const option = document.createElement('option'); 
                option.value = Promocion.idPromocion; // Código como valor 
                option.textContent = Promocion.procentajeDescuento + '%'; // % 
                selectPromociones.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar Promociones:', error); 
            alert('Ocurrió un error al cargar las Promocion'); 
        } 
    }
//================================================================================================
const selectFunciones = document.getElementById('listaFunciones'); 
const precioLabel = document.getElementById('labelPrecio');

    cargarFuncion(); 
    // Cargar Funciones en el select 
    async function cargarFuncion() { 
        try { 
            const response = await fetch(`https://localhost:44321/Funciones`); 
            const Funciones = await response.json();
            selectFunciones .innerHTML = '';
            Funciones.forEach(Funcion => { 
                const option = document.createElement('option'); 
                option.value = Funcion.idFuncion; // Código como valor 
                option.textContent = 'Funcion ' + Funcion.idFuncion +', Sala ' + Funcion.idSala; // 
                
                option.dataset.precio = Funcion.precio;
                
                
                selectFunciones.appendChild(option); 
            }); 
        } catch (error) { 
            console.error('Error al cargar Funciones:', error); 
            alert('Ocurrió un error al cargar las Funcion'); 
        } 
    }

    // Evento para actualizar el label cuando cambia la selección
    selectFunciones.addEventListener('change', function(event) {
    const selectedOption = event.target.selectedOptions[0]; // Opción seleccionada
    const precio = selectedOption.dataset.precio; // Obtener el precio del atributo data

    // Actualizar el contenido del label
    precioLabel.value = precio; 
});



//================================================================================================
    // Agregar un listener al formulario 
    form.addEventListener('submit', async (event) => { 
        event.preventDefault(); 
        console.log('Formulario enviado'); // Esto te ayudará a saber si el evento se activa 
 
        // Obtener los valores del formulario 
        const fechaInput = new Date(inputFecha.value);  // Crea un objeto Date 
        const fecha = fechaInput.toISOString(); // Convierte a formato ISO 8601 
 
        const modelo = inputModelo.value; 
        const cantidad = parseInt(inputCantidad.value); 
 
        // Recorrer la tabla de clientes 
        const detalles = obtenerDetallesTabla(); 
 
        // Construir el cuerpo del POST sin el 'nro' 
        const body = { 
            fecha: fecha, 
            listaDetalles: detalles, 
            modelo: modelo, 
            estado: 'Creada', 
            cantidad: cantidad 
        }; 
 
        try { 
            const response = await fetch(`${API_URL}/OrdenProduccion`, { 
                method: 'POST', 
                headers: {    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify(body) 
            }); 
 
            if (response.ok) { 
                alert('Orden de producción agregada con éxito'); 
                // Opcionalmente, redirigir o resetear el formulario 
                form.reset(); 
            } else { 
                alert('Error al agregar la orden de producción'); 
            } 
        } catch (error) { 
            console.error('Error:', error); 
            alert('Ocurrió un error al intentar agregar la orden de producción'); 
        } 
    }); 
 
    
 
 
    // Función para recorrer la tabla y obtener los detalles de la orden 
    function obtenerDetallesTabla() { 
        const tabla = document.getElementById('detailsTable'); 
        const filas = tabla.querySelectorAll('tbody tr'); 
        const detalles = [];
         filas.forEach(fila => { 
            const id = parseInt(fila.children[0].textContent);  // Primer columna: ID 
            const cliente = fila.children[1].textContent;    // Segunda columna: cliente 
            const cantidad = parseInt(fila.children[2].textContent);  // Tercera columna: Cantidad 
            detalles.push({ 
                id: id, 
                cliente: { 
                    codigo: id, // Aquí podrías ajustar si el cliente tiene un código distinto 
                    nombre: cliente, 
                    fechaBaja: null, // O algún valor si lo tienes 
                    motivoBaja: null // O algún valor si lo tienes 
                }, 
                cantidad: cantidad 
            }); 
        }); 
 
        return detalles; 
    } 
}); 