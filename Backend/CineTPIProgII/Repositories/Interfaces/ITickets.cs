using CineTPIProgII.Models;

namespace CineTPIProgII.Repositories.Interfaces
{
    public interface ITickets
    {
        bool NuevoTicket(Ticket nuevo);
        bool NuevoDetalle(DetallesTicket detalle);
        List<DetallesTicket> GetDetalles();
        bool BajaTicket(int id);

        bool NuevaReserva(Reservada reserva);
        List<Ticket> GetTickets();
        List<Cliente> GetClientes();
        List<MediosPedido> GetMedioDeVenta();
        List<FormasPago> GetFormaDePagos();
        List<Promocione> GetPromociones();
        List<Butaca> GetButacas();
        List<Funcione> GetFunciones();
        List<Reservada> GetReservados();
        List<Empleado> GetEmpleados();
    }
}
