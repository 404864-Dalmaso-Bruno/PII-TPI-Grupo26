using CineTPIProgII.Models;

namespace CineTPIProgII.Repositories.Interfaces
{
    public interface IFunciones
    {
        List<Funcione> GetFunciones();
        List<Horario> GetHorarios();
        Funcione ObtenerFuncionPorId(int nro);
        List<Sala> GetSalas();
        List<Pelicula> GetPeliculas();
        bool AltaFuncion(Funcione funcion);
        bool BajaFuncion(int id);
        bool ModificarFuncion(Funcione funcion);
        
    }
}
