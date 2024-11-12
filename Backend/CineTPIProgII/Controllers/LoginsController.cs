using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineTPIProgII.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly ILogins _repository;

        public LoginsController(ILogins repository)
        {
            _repository = repository;
        }

        // Método GET: api/logins
        [HttpGet]
        public IActionResult GetLogins()
        {
            try
            {
                var logins = _repository.GetLogins();
                return Ok(logins);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }




        // Método POST para verificar usuario
        [HttpPost("usuario")]
        public IActionResult Login([FromBody] string usuario)
        {
            if (usuario == null)
                return BadRequest("usuario null");

            try
            {
                // Verificar si el usuario existe en la base de datos
                var usuarioValido = _repository.ConsultarUsuario(usuario);

                if (!usuarioValido)
                {
                    return Unauthorized("Usuario");
                }

                // Si el usuario es válido, retorna OK (autenticación exitosa)
                return Ok(new { message = "Autenticación exitosa" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }







        // Método POST para verificar las credenciales del usuario
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            if (login == null)
                return BadRequest("Las credenciales no pueden ser nulas.");

            try
            {
                // Verificar si el usuario existe en la base de datos
                var usuarioValido = _repository.GetLoginByCredentials(login.Usuario, login.Contraseña);

                if (usuarioValido == null)
                {
                    return Unauthorized("Usuario o contraseña incorrectos.");
                }

                // Si el usuario es válido, retorna OK (autenticación exitosa)
                return Ok(new { message = "Autenticación exitosa" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // Método POST para registrar nuevos usuarios (alta de cuenta)
        [HttpPost]
        public IActionResult Post([FromBody] Login login)
        {
            if (login == null)
                return BadRequest("Las credenciales no pueden ser nulas.");

            try
            {
                var resultado = _repository.AltaFuncion(login);

                return resultado ? Ok() : BadRequest("Error al agregar la función.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }
    }
}
