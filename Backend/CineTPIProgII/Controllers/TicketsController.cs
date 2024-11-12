using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CineTPIProgII.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITickets _repository;

        public TicketsController(ITickets repository)
        {
            _repository = repository;
        }

        [HttpPost("/Reservas")]
        public IActionResult Post([FromBody] Reservada reserva)
        {
            if (reserva == null)
            {
                return BadRequest("El detalle no puede ser nulo.");
            }

            var resultado = _repository.NuevaReserva(reserva);

            if (resultado)
            {
                return CreatedAtAction(nameof(Post), new { id = reserva.IdReserva }, reserva);
            }
            return StatusCode(500, "Error al crear la reserva. Intente más tarde.");

        }






        //NuevoDetalle
        [HttpPost("/Detalles")]
        public IActionResult Post([FromBody] DetallesTicket nuevo)
        {
            if (nuevo == null)
            {
                return BadRequest("El detalle no puede ser nulo.");
            }

            var resultado = _repository.NuevoDetalle(nuevo);

            if (resultado)
            {
                return CreatedAtAction(nameof(Post), new { id = nuevo.IdTicket }, nuevo);
            }
            return StatusCode(500, "Error al crear el detalle. Intente más tarde.");
        }


        [HttpGet("/Detalles")]
        public IActionResult GetDetalles() => GetResponse(() => _repository.GetDetalles());

        [HttpGet("/Tickets")]
        public IActionResult GetTickets() => GetResponse(() => _repository.GetTickets());

        [HttpGet("/Empleados")]
        public IActionResult GetEmpleados() => GetResponse(() => _repository.GetEmpleados());

        [HttpGet("/Clientes")]
        public IActionResult GetClientes() => GetResponse(() => _repository.GetClientes());

        [HttpGet("/Butacas")]
        public IActionResult GetButacas() => GetResponse(() => _repository.GetButacas());

        [HttpGet("/Butacas/Reservadas")]
        public IActionResult GetReservadas() => GetResponse(() => _repository.GetReservados());

        [HttpGet("/Funciones")]
        public IActionResult GetFunciones() => GetResponse(() => _repository.GetFunciones());

        [HttpGet("/Promociones")]
        public IActionResult GetPromociones() => GetResponse(() => _repository.GetPromociones());

        [HttpGet("/FormasDePago")]
        public IActionResult GetFormasDePago() => GetResponse(() => _repository.GetFormaDePagos());

        [HttpGet("/MedioDeVenta")]
        public IActionResult GetMediosDeVenta() => GetResponse(() => _repository.GetMedioDeVenta());

        [HttpPost]
        public IActionResult Post([FromBody] Ticket nuevo)
        {
            if (nuevo == null)
            {
                return BadRequest("El ticket no puede ser nulo.");
            }

            // Validación de campos importantes antes de intentar insertarlos
            if (nuevo.IdCliente <= 0 || nuevo.IdEmpleado <= 0 || nuevo.Total <= 0)
            {
                return BadRequest("Los datos del ticket son inválidos.");
            }

            var resultado = _repository.NuevoTicket(nuevo);
            if (resultado)
            {
                return CreatedAtAction(nameof(Post), new { id = nuevo.IdTicket }, nuevo);
            }
            return StatusCode(500, "Error al crear el ticket. Intente más tarde.");
        }

        [HttpDelete("{id}")]
        public IActionResult BajaTicket(int id)
        {
            var resultado = _repository.BajaTicket(id);
            if (resultado)
            {
                return Ok("Ticket eliminado con éxito.");
            }
            return NotFound("Ticket no encontrado.");
        }

        private IActionResult GetResponse<T>(Func<T> func)
        {
            try
            {
                var result = func();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }
    }
}
