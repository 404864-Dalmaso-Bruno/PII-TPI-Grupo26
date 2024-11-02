using CineTPIProgII.Models;

namespace CineTPIProgII.Repositories.Interfaces
{
    public interface ITickets
    {
        bool NuevoTicket(Ticket nuevo);
        bool BajaTicket(int id);
        List<Cliente> GetClientes();
        List<MediosPedido> GetMedioDeVenta();
        List<FormasPago> GetFormaDePagos();
        List<Promocione> GetPromociones();
        List<Butaca> GetButacas();
        List<Funcione> GetFunciones();
    }
}
