using CineTPIProgII.Models;
using CineTPIProgII.Repositories.Interfaces;
using CineTPIProgII.Repositories.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CineTPIProgII.Repositories
{
    public class TicketsRepository : ITickets
    {
        private readonly CineProgContext _context;

        public TicketsRepository(CineProgContext context)
        {
            _context = context;
        }

        public bool BajaTicket(int id)
        {
            using var conexion = DataHelper.GetInstance().GetConnection();
            SqlTransaction transaction = null;

            try
            {
                conexion.Open();
                transaction = conexion.BeginTransaction();

                using var comando = new SqlCommand("SP_BAJA_TICKET", conexion, transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@id_ticket", id);
                comando.ExecuteNonQuery();

                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                transaction?.Rollback();
                Console.WriteLine($"Error al dar de baja el ticket: {ex.Message}");
                return false;
            }
        }

        public List<Butaca> GetButacas() => _context.Butacas.ToList();
        public List<Cliente> GetClientes() => _context.Clientes.ToList();
        public List<FormasPago> GetFormaDePagos() => _context.FormasPagos.ToList();
        public List<Funcione> GetFunciones() => _context.Funciones.ToList();
        public List<MediosPedido> GetMedioDeVenta() => _context.MediosPedidos.ToList();
        public List<Promocione> GetPromociones() => _context.Promociones.ToList();

        public bool NuevoTicket(Ticket nuevo)
        {
            if (nuevo == null) return false;

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                // Parámetro de salida para el nuevo ID de ticket
                var nuevoIdTicketParam = new SqlParameter("@nuevo_id_ticket", SqlDbType.Int) { Direction = ParameterDirection.Output };

                // Llamada al procedimiento almacenado
                _context.Database.ExecuteSqlRaw(
                    "EXEC [dbo].[SP_INSERTAR_TICKET] @nuevo_id_ticket OUT, @fecha, @id_cliente, @id_medio_pedido, @id_promocion, @total, @id_forma_pago",
                    nuevoIdTicketParam,
                    new SqlParameter("@fecha", nuevo.Fecha),
                    new SqlParameter("@id_cliente", nuevo.IdCliente),
                    new SqlParameter("@id_medio_pedido", nuevo.IdMedioPedido),
                    new SqlParameter("@id_promocion", nuevo.IdPromocion),
                    new SqlParameter("@total", nuevo.Total),
                    new SqlParameter("@id_forma_pago", nuevo.IdFormaPago)
                );

                // Obtener el nuevo ID del ticket
                nuevo.IdTicket = (int)nuevoIdTicketParam.Value;

                // Insertar los detalles del ticket
                foreach (var detalle in nuevo.DetallesTicket)
                {
                    detalle.IdTicket = nuevo.IdTicket;
                    _context.DetallesTickets.Add(detalle);
                }

                _context.SaveChanges(); // Guardar detalles en la base de datos

                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                Console.WriteLine($"Error al insertar el ticket: {ex.Message}");
                return false;
            }
        }
    }
}