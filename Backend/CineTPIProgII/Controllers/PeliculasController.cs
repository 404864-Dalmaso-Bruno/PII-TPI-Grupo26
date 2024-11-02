using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CineTPIProgII.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private IPeliculas _repository;

        public PeliculasController(IPeliculas repository)
        {
            _repository = repository;
        }

        [HttpGet("/clasificaciones")]
        public IActionResult GetClasificaciones()
        {
            try
            {
                return Ok(_repository.GetClasificaciones());

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno! Intente luego");
            }
        }

        [HttpGet("/idiomas")]
        public IActionResult GetIdiomas()
        {
            try
            {
                return Ok(_repository.GetIdiomas());

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno! Intente luego");
            }
        }

        [HttpGet("/generos")]
        public IActionResult GetGeneros()
        {
            try
            {
                return Ok(_repository.GetGeneros());

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno! Intente luego");
            }
        }


        // GET: api/<PeliculasController>
        [HttpGet]
        public IActionResult GetPeliculas()
        {
            try
            {
                return Ok(_repository.GetPeliculas());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetPeliculaPorId(int id)
        {
            try
            {
                Pelicula p = _repository.PeliculaPorID(id);
                if (p != null)
                    return Ok(p);
                else
                    return NotFound("Pelicula id: " + id + " NO encontrada!");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno! Intente luego");
            }
        }



        // POST api/<PeliculasController>
        [HttpPost]
        public IActionResult GuardarPelicula([FromBody] Pelicula nueva)
        {
            try
            {
                if (nueva == null)
                {
                    return BadRequest();
                }
                return Ok(_repository.AltaPelicula(nueva));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        // PUT api/<PeliculasController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Pelicula pelicula)
        {
            try
            {
                if (pelicula == null)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(_repository.ModificarPelicula(pelicula));
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // DELETE api/<PeliculasController>/5
        [HttpDelete("{id}")]
        public IActionResult BorrarPelicula(int id)
        {
            try
            {
                return Ok(_repository.BajaPelicula(id));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
