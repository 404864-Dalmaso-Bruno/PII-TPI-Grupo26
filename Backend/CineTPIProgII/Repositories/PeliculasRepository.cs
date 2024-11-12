using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CineTPIProgII.Repositories
{
    public class PeliculasRepository : IPeliculas
    {
        private CineProgContext _context;

        public PeliculasRepository(CineProgContext context)
        {
            _context = context;
        }

        public bool AltaPelicula(Pelicula nueva)
        {
            try
            {
                _context.Peliculas.Add(nueva);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool BajaPelicula(int id)
        {
            bool aux = true;
            try
            {
                var peliculaExistente = _context.Peliculas.Find(id);
                if (peliculaExistente != null)
                {
                    peliculaExistente.Estado = false;
                    _context.SaveChanges();
                    aux = true;
                }
                else
                {
                    aux = false;
                }
            }
            catch (Exception ex)
            {
                aux = false;
            }
            return aux;
        }

        public List<Clasificacione> GetClasificaciones()
        {
            return _context.Clasificaciones.ToList();
        }

        public List<Genero> GetGeneros()
        {
            return _context.Generos.ToList();
        }

        public List<Idioma> GetIdiomas()
        {
            return _context.Idiomas.ToList();
        }

        public List<Pelicula> GetPeliculas()
        {
            return _context.Peliculas.ToList();
        }

        public bool ModificarPelicula(Pelicula pelicula)
        {
            try
            {
                var peliculaExistente = _context.Peliculas
                    .Include(p => p.IdClasificacionNavigation)
                    .Include(p => p.IdGeneroNavigation)
                    .Include(p => p.IdIdiomaNavigation)
                    .FirstOrDefault(p => p.IdPelicula == pelicula.IdPelicula);

                if (peliculaExistente == null)
                {
                    return false;
                }

                peliculaExistente.Titulo = pelicula.Titulo;
                peliculaExistente.Duracion = pelicula.Duracion;
                peliculaExistente.Sinopsis = pelicula.Sinopsis;
                peliculaExistente.IdClasificacion = pelicula.IdClasificacion;
                peliculaExistente.IdGenero = pelicula.IdGenero;
                peliculaExistente.IdIdioma = pelicula.IdIdioma;
                peliculaExistente.Estado = pelicula.Estado;

                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al modificar la película: {ex.Message}");
                return false;
            }
        }

        public Pelicula PeliculaPorID(int id)
        {
            return _context.Peliculas.FirstOrDefault(x => x.IdPelicula == id);
        }
    }
}
