using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace CineTPIProgII.Repositories
{
    public class LoginsRepository : ILogins
    {
        private CineProgContext _context;

        public LoginsRepository(CineProgContext context)
        {
            _context = context;
        }

        // Método para verificar las credenciales
        public Login GetLoginByCredentials(string usuario, string contraseña)
        {
            try
            {
                var login = _context.Logins
                                    .FirstOrDefault(l => l.Usuario == usuario && l.Contraseña == contraseña);
                return login;  // Retorna el login si lo encuentra, o null si no lo encuentra
            }
            catch (Exception)
            {
                return null;  // Si hay algún error, retorna null
            }
        }

        // Método para verificar usuario
        public bool ConsultarUsuario(string usuario)
        {
            try
            {
                var login = _context.Logins.FirstOrDefault(l => l.Usuario == usuario);

                if (login == null)
                {
                    return false;
                }
                return true;  // Retorna el login si lo encuentra, o null si no lo encuentra
            }
            catch (Exception)
            {
                return false;  // Si hay algún error, retorna null
            }
        }

        // Método para registrar nuevos usuarios (alta)
        public bool AltaFuncion(Login login)
        {
            try
            {
                _context.Logins.Add(login);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Obtener todos los logins (solo para debugging o propósitos de visualización)
        public List<Login> GetLogins()
        {
            return _context.Logins.ToList();
        }
    }
}