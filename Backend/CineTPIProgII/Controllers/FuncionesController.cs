using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CineTPIProgII.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionesController : ControllerBase
    {
        private readonly IFunciones _repository;

        public FuncionesController(IFunciones repository)
        {
            _repository = repository;
        }

        [HttpGet("Funciones")]
        public IActionResult GetFunciones()
        {
            try
            {
                var funciones = _repository.GetFunciones();
                return Ok(funciones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("Combo/Salas")]
        public IActionResult GetSalas()
        {
            try
            {
                return Ok(_repository.GetSalas());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("Combo/Peliculas")]
        public IActionResult GetPeliculas()
        {
            try
            {
                return Ok(_repository.GetPeliculas());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("Combo/Horarios")]
        public IActionResult GetHorarios()
        {
            try
            {
                return Ok(_repository.GetHorarios());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("Funciones/{id}")]
        public IActionResult GetFuncionPorID(int id)
        {
            try
            {
                var funcion = _repository.ObtenerFuncionPorId(id);
                if (funcion == null)
                    return NotFound();

                return Ok(funcion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Funcione funcion)
        {
            try
            {
                if (funcion == null)
                    return BadRequest("La función no puede ser nula.");
                else
                    return Ok(_repository.AltaFuncion(funcion));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Funcione funcion)
        {
            if (id != funcion.IdFuncion)
            {
                return BadRequest("El ID de la función no coincide.");
            }

            var funcionExistente = _repository.ObtenerFuncionPorId(id);

            if (funcionExistente == null)
            {
                return NotFound("Función no encontrada.");
            }

            // Actualizar la función a través del servicio
            bool resultado = _repository.ModificarFuncion(funcion);

            if (!resultado)
            {
                return StatusCode(500, "Hubo un error al modificar la función.");
            }

            return NoContent(); // Respuesta exitosa sin contenido (204)
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var resultado = _repository.BajaFuncion(id);
                if (!resultado)
                {
                    return NotFound("Función no encontrada."); // Retorna 404 si no se encuentra
                }

                return Ok("Función eliminada exitosamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }
    }
}
