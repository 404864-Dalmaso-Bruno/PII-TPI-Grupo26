using CineTPIProgII.Models;

namespace CineTPIProgII.Repositories.Interfaces
{
    public interface IPeliculas
    {
        List<Clasificacione> GetClasificaciones();
        List<Idioma> GetIdiomas();
        List<Genero> GetGeneros();

        List<Pelicula> GetPeliculas();
        
        bool AltaPelicula(Pelicula nueva);
        bool ModificarPelicula(Pelicula pelicula);
        bool BajaPelicula(int id);
        Pelicula PeliculaPorID(int id);
    }
}
