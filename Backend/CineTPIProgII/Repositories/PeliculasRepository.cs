using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using CineTPIProgII.Repositories.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.Metadata;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CineTPIProgII.Repositories
{
    public class PeliculasRepository : IPeliculas
    {
        private SqlConnection conexion = null;

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
                // Manejo de excepciones: registrar el error
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

        public bool ajaPelicula(int id)
        {
            bool resultado = true;
            SqlTransaction t = null;
            conexion = DataHelper.GetInstance().GetConnection();

            try
            {
                conexion.Open();
                t = conexion.BeginTransaction();

                SqlCommand comando = new SqlCommand("SP_BAJA_PELICULA", conexion, t);
                comando.CommandType = CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@id_pelicula", id);

                comando.ExecuteNonQuery();
                t.Commit();
            }
            catch
            {
                if (t != null)
                {
                    t.Rollback();
                    resultado = false;
                }
            }
            finally
            {
                if (conexion != null && conexion.State == ConnectionState.Open)
                {
                    conexion.Close();
                }
            }
            return resultado;
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
                // Buscar la película existente en la base de datos
                var peliculaExistente = _context.Peliculas
                    .Include(p => p.IdClasificacionNavigation)
                    .Include(p => p.IdGeneroNavigation)
                    .Include(p => p.IdIdiomaNavigation)
                    .Include(p => p.Funciones) // Si es necesario
                    .Include(p => p.PeliculasActores) // Si es necesario
                    .Include(p => p.PeliculasDirectores) // Si es necesario
                    .FirstOrDefault(p => p.IdPelicula == pelicula.IdPelicula);

                if (peliculaExistente == null)
                {
                    return false; // La película no existe
                }

                // Actualizar propiedades
                peliculaExistente.Titulo = pelicula.Titulo;
                peliculaExistente.Duracion = pelicula.Duracion;
                peliculaExistente.Sinopsis = pelicula.Sinopsis;
                peliculaExistente.IdClasificacion = pelicula.IdClasificacion;
                peliculaExistente.IdGenero = pelicula.IdGenero;
                peliculaExistente.IdIdioma = pelicula.IdIdioma;
                peliculaExistente.Estado = pelicula.Estado;

                // Guardar cambios
                _context.SaveChanges();
                return true; // Modificación exitosa
            }
            catch (Exception ex)
            {
                // Manejo de excepciones (puedes registrar el error si lo deseas)
                Console.WriteLine($"Error al modificar la película: {ex.Message}");
                return false; // Retornar false en caso de error
            }
        }

        public Pelicula PeliculaPorID(int id)
        {
            return _context.Peliculas.FirstOrDefault(x => x.IdPelicula == id);
        }
    }
}
