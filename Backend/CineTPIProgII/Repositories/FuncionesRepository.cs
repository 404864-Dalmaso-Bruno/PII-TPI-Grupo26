using CineTPIProgII.Models;
using Microsoft.Data.SqlClient;
using CineTPIProgII.Repositories.Utils;
using System.Data;
using CineTPIProgII.Repositories.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.EntityFrameworkCore;

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
            bool aux = true;
            try
            {
                var funcionExistente = _context.Funciones.Find(id);
                if (funcionExistente != null)
                {
                    funcionExistente.Estado = false;
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

                if (funcionExistente == null)
                {
                    return false; // La función no existe
                }

                // Actualizar los campos con los nuevos valores
                funcionExistente.IdSala = funcion.IdSala;
                funcionExistente.IdHorario = funcion.IdHorario;
                funcionExistente.IdFormato = funcion.IdFormato;
                funcionExistente.Estado = funcion.Estado;
                funcionExistente.IdPelicula = funcion.IdPelicula;
                funcionExistente.Precio = funcion.Precio;
                funcionExistente.FechaDesde = funcion.FechaDesde;
                funcionExistente.FechaHasta = funcion.FechaHasta;

                // Guardar los cambios sincrónicamente
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
