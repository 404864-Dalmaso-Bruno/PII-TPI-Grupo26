using CineTPIProgII.Models;
using CineTPIProgII.Repositories; // Aseg�rate de tener esto
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()        // Permite cualquier origen
               .AllowAnyMethod()        // Permite cualquier m�todo HTTP
               .AllowAnyHeader());      // Permite cualquier encabezado
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuraci�n de la base de datos con SQL Server
builder.Services.AddDbContext<CineProgContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CineProgContext")));

// Registra las interfaces y sus implementaciones
builder.Services.AddScoped<IFunciones, FuncionesRepository>();
builder.Services.AddScoped<IPeliculas, PeliculasRepository>();
builder.Services.AddScoped<ITickets, TicketsRepository>();

var app = builder.Build();

// Configura el pipeline de la solicitud HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplica la pol�tica de CORS
app.UseCors("AllowAll");

// Autorizaci�n
app.UseAuthorization();

// Mapea los controladores
app.MapControllers();

app.Run();

