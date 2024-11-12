using CineTPIProgII.Models;

namespace CineTPIProgII.Repositories.Interfaces
{
    public interface ILogins
    {
        bool ConsultarUsuario(string usuario);
        List<Login> GetLogins();
        bool AltaFuncion(Login login);

        // Nuevo método para obtener un login por las credenciales (nombre de usuario y contraseña)
        Login GetLoginByCredentials(string username, string password);
    }
}
