using CineTPIProgII.Models;
using CineTPIProgII.Repositories; // Aseg�rate de tener esto
using CineTPIProgII.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
/*builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});*/


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<CineProgContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CineProgContext")));


// Registra la interfaz y su implementaci�n
builder.Services.AddScoped<IFunciones, FuncionesRepository>();
builder.Services.AddScoped<IPeliculas, PeliculasRepository>();
builder.Services.AddScoped<ITickets, TicketsRepository>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

