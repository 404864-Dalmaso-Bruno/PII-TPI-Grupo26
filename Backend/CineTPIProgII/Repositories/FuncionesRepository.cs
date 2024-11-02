using CineTPIProgII.Models;
using Microsoft.Data.SqlClient;
using CineTPIProgII.Repositories.Utils;
using System.Data;
using CineTPIProgII.Repositories.Interfaces;

namespace CineTPIProgII.Repositories
{
    public class FuncionesRepository : IFunciones
    {
        private SqlConnection conexion;

        private CineProgContext _context;

        public FuncionesRepository(CineProgContext context)
        {
            _context = context;
        }

        public bool AltaFuncion(Funcione funcion)
        {
            try
            {
                _context.Funciones.Add(funcion);
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

        public bool BajaFuncion(int id)
        {
            bool resultado = true;
            SqlTransaction t = null;
            conexion = DataHelper.GetInstance().GetConnection();

            try
            {
                conexion.Open();
                t = conexion.BeginTransaction();

                SqlCommand comando = new SqlCommand("SP_BAJA_FUNCION", conexion, t);
                comando.CommandType = CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@id_funcion", id);

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

        public List<Funcione> GetFunciones()
        {
            return _context.Funciones.ToList();
        }

        public List<Horario> GetHorarios()
        {
            return _context.Horarios.ToList();
        }

        public List<Pelicula> GetPeliculas()
        {
            return _context.Peliculas.ToList();
        }

        public List<Sala> GetSalas()
        {
            return _context.Salas.ToList();
        }

        public Funcione ObtenerFuncionPorId(int nro)
        {
            return _context.Funciones.FirstOrDefault(x => x.IdFuncion == nro);
        }

        public bool ModificarFuncion(Funcione funcion)
        {
            try
            {
                var funcionExistente = _context.Funciones.Find(funcion.IdFuncion);
                if (funcionExistente == null) return false;

                // Actualizar propiedades
                funcionExistente.IdSala = funcion.IdSala;
                funcionExistente.IdPelicula = funcion.IdPelicula;
                funcionExistente.Precio = funcion.Precio;
                funcionExistente.FechaDesde = funcion.FechaDesde;
                funcionExistente.FechaHasta = funcion.FechaHasta;
                funcionExistente.IdHorario = funcion.IdHorario;

                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
