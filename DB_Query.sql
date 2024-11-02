CREATE DATABASE CineOK
go
USE CineOK
go


CREATE TABLE CARGOS
(
	id_cargo int identity(1,1),
	descripcion varchar(50)

	CONSTRAINT PK_CARGOS PRIMARY KEY (id_cargo)
);

CREATE TABLE BARRIOS
(
	id_barrio int identity(1,1),
	barrio varchar(50)

	CONSTRAINT PK_BARRIOS PRIMARY KEY (id_barrio)
);

CREATE TABLE TIPOS_DOC
(
	id_tipo_doc int identity(1,1),
	tipo varchar(50)

	CONSTRAINT PK_TIPOS_DOC PRIMARY KEY (id_tipo_doc)
);

CREATE TABLE PROMOCIONES
(
	id_promocion int identity(1,1),
	fecha_desde datetime,
	fecha_hasta datetime,
	procentaje_descuento int

	CONSTRAINT PK_PROMOCIONES PRIMARY KEY (id_promocion)
);

CREATE TABLE CLIENTES
(
	id_cliente int identity(1,1),
	nombre varchar(50),
	apellido varchar(50),
	documento int,
	fecha_nac date,
	email varchar(50)

	CONSTRAINT PK_CLIENTES PRIMARY KEY (id_cliente)
);

CREATE TABLE EMPLEADOS
(
	id_empleado int identity(1,1),
	nombre varchar(50),
	apellido varchar(50),
	id_tipo_doc int,
	documento int,
	fecha_nac date,
	id_barrio int,
	id_cargo int,
	fecha_alta date,
	telefono varchar(50),
	email varchar(50)

	CONSTRAINT PK_EMPLEADOS PRIMARY KEY (id_empleado),
	
	CONSTRAINT FK_EMPLEADOS_TIPOS_DOC FOREIGN KEY (id_tipo_doc)
		REFERENCES TIPOS_DOC(id_tipo_doc),
	
	CONSTRAINT FK_EMPLEADOS_BARRIOS FOREIGN KEY (id_barrio)
		REFERENCES BARRIOS(id_barrio),
	
	CONSTRAINT FK_EMPLEADOS_CARGOS FOREIGN KEY (id_cargo)
		REFERENCES CARGOS(id_cargo)
);

CREATE TABLE MEDIOS_PEDIDO
(
	id_medio_pedido int identity(1,1),
	descripcion varchar(50)

	CONSTRAINT PK_MEDIOS_PEDIDO PRIMARY KEY (id_medio_pedido)
);

CREATE TABLE FORMAS_PAGO
(
	id_forma_pago int identity(1,1),
	descripcion varchar(50),
	porcentaje_recargo int

	CONSTRAINT PK_FORMAS_PAGO PRIMARY KEY (id_forma_pago)
);


CREATE TABLE TICKETS
(
	id_ticket int identity(1,1),
	fecha date,
	id_cliente int,
	id_empleado int,
	id_medio_pedido int,
	id_promocion int,
	id_forma_pago int,
	total decimal,
	estado bit

	CONSTRAINT PK_TICKETS PRIMARY KEY (id_ticket),
	
	CONSTRAINT FK_TICKETS_CLIENTES FOREIGN KEY (id_cliente)
		REFERENCES CLIENTES(id_cliente),

	CONSTRAINT FK_TICKETS_EMPLEADOS FOREIGN KEY (id_empleado)
		REFERENCES EMPLEADOS(id_empleado),
	
	CONSTRAINT FK_TICKETS_MEDIOS_PEDIDO FOREIGN KEY (id_medio_pedido)
		REFERENCES MEDIOS_PEDIDO(id_medio_pedido),

	CONSTRAINT FK_TICKETS_PROMOCIONES FOREIGN KEY (id_promocion)
		REFERENCES PROMOCIONES(id_promocion),

	CONSTRAINT FK_TICKETS_FORMASP FOREIGN KEY (id_forma_pago)
		REFERENCES FORMAS_PAGO(id_forma_pago)
);


CREATE TABLE NACIONALIDADES
(
	id_nacionalidad int identity(1,1),
	nacionalidad varchar(50)

	CONSTRAINT PK_NACIONALIDADES PRIMARY KEY (id_nacionalidad)
);

CREATE TABLE CLASIFICACIONES
(
	id_clasificacion int identity(1,1),
	clasificacion varchar(50)

	CONSTRAINT PK_CLASIFICACIONES PRIMARY KEY (id_clasificacion)
);

CREATE TABLE GENEROS
(
	id_genero int identity(1,1),
	genero varchar(50)

	CONSTRAINT PK_GENEROS PRIMARY KEY (id_genero)
);

create table IDIOMAS
(
id_idioma int identity(1,1),
idioma varchar(200)
constraint pk_idioma primary key(id_idioma)
)

CREATE TABLE PELICULAS
(
	id_pelicula int identity(1,1),
	titulo varchar(50),
	duracion int,
	sinopsis varchar(300),
	id_clasificacion int,
	id_genero int,
	id_idioma int,
	estado bit

	CONSTRAINT PK_PELICULAS PRIMARY KEY (id_pelicula),

	CONSTRAINT FK_PELICULAS_CLASIFICACIONES FOREIGN KEY (id_clasificacion)
		REFERENCES CLASIFICACIONES(id_clasificacion),
	
	CONSTRAINT FK_PELICULAS_GENEROS FOREIGN KEY (id_genero)
		REFERENCES GENEROS(id_genero),

	constraint fk_idiomas foreign key(id_idioma)
		references IDIOMAS(id_idioma)
);

CREATE TABLE ACTORES
(
	id_actor int identity(1,1),
	nombre varchar(50),
	apellido varchar(50),
	fecha_nac date,
	id_nacionalidad int,

	CONSTRAINT PK_ACTORES PRIMARY KEY (id_actor),

	CONSTRAINT FK_ACTORES_NACIONALIDADES FOREIGN KEY (id_nacionalidad)
		REFERENCES NACIONALIDADES(id_nacionalidad)
);

CREATE TABLE DIRECTORES
(
	id_director int identity(1,1),
	nombre varchar(50),
	apellido varchar(50),
	fecha_nac date,
	id_nacionalidad int,

	CONSTRAINT PK_DIRECTORES PRIMARY KEY (id_director),

	CONSTRAINT FK_DIRECTORES_NACIONALIDADES FOREIGN KEY (id_nacionalidad)
		REFERENCES NACIONALIDADES(id_nacionalidad)
);

CREATE TABLE PELICULAS_ACTORES
(
	id_pelicula_act int identity(1,1),
	id_pelicula int,
	id_actor int,

	CONSTRAINT PK_PELICULAS_ACTORES PRIMARY KEY (id_pelicula_act),

	CONSTRAINT FK_PELICULAS_ACTORES_PELICULAS FOREIGN KEY (id_pelicula)
		REFERENCES PELICULAS(id_pelicula),

	CONSTRAINT FK_PELICULAS_ACTORES_ACTORES FOREIGN KEY (id_actor)
		REFERENCES ACTORES(id_actor)
);

CREATE TABLE PELICULAS_DIRECTORES
(
	id_pelicula_direct int identity(1,1),
	id_pelicula int,
	id_director int,

	CONSTRAINT PK_PELICULAS_DIRECTORES PRIMARY KEY (id_pelicula_direct),

	CONSTRAINT FK_PELICULAS_DIRECTORES_PELICULAS FOREIGN KEY (id_pelicula)
		REFERENCES PELICULAS(id_pelicula),

	CONSTRAINT FK_PELICULAS_DIRECTORES_DIRECTORES FOREIGN KEY (id_director)
		REFERENCES DIRECTORES(id_director)
);

CREATE TABLE TIPOS_SALAS
(
	id_tipo_sala int identity(1,1),
	tipo varchar(50)

	CONSTRAINT PK_TIPOS_SALAS PRIMARY KEY (id_tipo_sala)
);

CREATE TABLE SALAS
(
	id_sala int identity(1,1),
	nro_sala int,
	id_tipo_sala int,

	CONSTRAINT PK_SALAS PRIMARY KEY (id_sala),

	CONSTRAINT FK_SALAS_TIPOS_SALAS FOREIGN KEY (id_tipo_sala)
		REFERENCES TIPOS_SALAS(id_tipo_sala)
);

CREATE TABLE HORARIOS
(
	id_horario int identity(1,1),
	horario datetime

	CONSTRAINT PK_HORARIOS PRIMARY KEY (id_horario)
);

create table FORMATOS
(
	id_formato int identity(1,1),
	formato varchar(200)
	
	constraint pk_formato primary key(id_formato)
)


CREATE TABLE FUNCIONES
(
	id_funcion int identity(1,1),
	id_sala int,
	id_horario int,
	id_formato int,
	estado bit,
	id_pelicula int,
	precio decimal,
	fecha_desde datetime,
	fecha_hasta datetime,
	
	CONSTRAINT PK_FUNCIONES PRIMARY KEY (id_funcion),

	constraint fk_formato foreign key(id_formato)
		references formatos(id_formato),

	CONSTRAINT FK_FUNCIONES_SALAS FOREIGN KEY (id_sala)
		REFERENCES SALAS(id_sala),
	
	CONSTRAINT FK_FUNCIONES_HORARIOS FOREIGN KEY (id_horario)
		REFERENCES HORARIOS(id_horario),

	CONSTRAINT FK_FUNCIONES_PELICULAS FOREIGN KEY (id_pelicula)
		REFERENCES PELICULAS(id_pelicula)
);


CREATE TABLE BUTACAS
(
	id_butaca int identity(1,1),
	numero varchar(4),
	CONSTRAINT PK_BUTACAS PRIMARY KEY (id_butaca),
);

CREATE TABLE DETALLES_TICKET
(
	id_detalle int,
	id_ticket int,
	id_funcion int,
	id_butaca int,
	precio_venta decimal,

	CONSTRAINT PK_DETALLES_TICKET PRIMARY KEY (id_detalle, id_ticket),

	CONSTRAINT FK_DETALLES_TICKET_TICKETS FOREIGN KEY (id_ticket)
		REFERENCES TICKETS(id_ticket),

	constraint fk_butacas foreign key(id_butaca)
		references butacas(id_butaca),

	CONSTRAINT FK_DETALLES_TICKET_FUNCIONES FOREIGN KEY (id_funcion)
		REFERENCES FUNCIONES(id_funcion)
);


create table RESERVADAS
(
id_reserva int identity(1,1),
id_butaca int,
id_funcion int,

constraint pk_Reservadas primary key (id_reserva),
constraint fk_butaca foreign key(id_butaca)
	references butacas(id_butaca),
constraint fk_funcion foreign key (id_funcion)
	references funciones(id_funcion)
);


go

--OK--------------------------SP



--EXTRAS
create procedure SP_CONSULTAR_CLASIFICACIONES
AS
BEGIN
	SELECT * FROM CLASIFICACIONES
END;
GO

create procedure SP_CONSULTAR_IDIOMAS
AS
BEGIN
	SELECT * FROM IDIOMAS
END;
GO


create procedure SP_CONSULTAR_GENEROS
AS
BEGIN
	SELECT * FROM GENEROS
END;
GO


----------------------------------------------------PELICULAS

CREATE PROCEDURE SP_CONSULTAR_PELICULAS_DTO
AS
BEGIN
	select id_pelicula ID, titulo Titulo, duracion Duracion, 
	clasificacion Clasificacion, genero Genero, idioma Idioma, estado Estado
from PELICULAS p
join GENEROS g on g.id_genero = p.id_genero
join IDIOMAS i on i.id_idioma = p.id_idioma
join CLASIFICACIONES c on c.id_clasificacion = p.id_clasificacion
order by titulo
END;
GO

create proc [dbo].[SP_CONSULTAR_PELICULAS_SIN_FILTRO]
as
begin
select P.*, titulo Titulo, sinopsis Sinopsis,clasificacion Clasificacion, genero Genero, idioma Idioma 
from PELICULAS p
join GENEROS g on g.id_genero = p.id_genero
join IDIOMAS i on i.id_idioma = p.id_idioma
join CLASIFICACIONES c on c.id_clasificacion = p.id_clasificacion
WHERE estado = 1
end;
GO

create proc [dbo].[SP_CONSULTAR_PELICULAS]
@titulo varchar(200),
@sinopsis varchar(200),
@id_genero int,
@id_idioma int
as
begin
select P.*, titulo Titulo, sinopsis Sinopsis,clasificacion Clasificacion, genero Genero, idioma Idioma 
from PELICULAS p
join GENEROS g on g.id_genero = p.id_genero
join IDIOMAS i on i.id_idioma = p.id_idioma
join CLASIFICACIONES c on c.id_clasificacion = p.id_clasificacion
where estado = 1
AND (titulo like '%'+ @titulo +'%' OR @titulo IS NULL)
AND (sinopsis like '%'+ @sinopsis +'%' OR @sinopsis IS NULL)
AND (p.id_genero = @id_genero OR @id_genero IS NULL)
AND (p.id_idioma = @id_idioma OR @id_idioma IS NULL)
end;
GO

create procedure SP_CONSULTAR_PELICULA_ID
@id_pelicula int
as
begin
select P.*, titulo Titulo, sinopsis Sinopsis,clasificacion Clasificacion, genero Genero, idioma Idioma 
from PELICULAS p
join GENEROS g on g.id_genero = p.id_genero
join IDIOMAS i on i.id_idioma = p.id_idioma
join CLASIFICACIONES c on c.id_clasificacion = p.id_clasificacion
where id_pelicula = @id_pelicula
end;
GO


create proc SP_MODIFICAR_PELICULA
@id_pelicula int,
@titulo varchar(200),
@duracion int,
@sinopsis varchar(400),
@id_clasificacion int,
@id_genero int,
@id_idioma int
as
begin
update PELICULAS set titulo = @titulo, duracion = @duracion, sinopsis = @sinopsis, id_clasificacion = @id_clasificacion, id_genero = @id_genero, id_idioma = @id_idioma
where id_pelicula = @id_pelicula
end;
GO


create proc SP_NUEVA_PELICULA
@titulo varchar(200),
@duracion int,
@sinopsis varchar(400),
@id_clasificacion int,
@id_genero int,
@id_idioma int
as
begin
insert into PELICULAS(titulo,duracion,sinopsis,id_clasificacion,id_genero,id_idioma, estado) 
values (@titulo, @duracion, @sinopsis, @id_clasificacion, @id_genero, @id_idioma,1)
end;
GO

create proc SP_BAJA_PELICULA
@id_pelicula int 
as
begin
update PELICULAS set estado = 0
where id_pelicula = @id_pelicula
end;
GO



-------------------------------------------FUNCIONES
create procedure SP_CONSULTAR_FUNCIONES
as
begin
select * from FUNCIONES where estado = 1 order by id_funcion desc
end;
GO


create procedure SP_CONSULTAR_FUNCIONES_ID
@IDFUNCION INT
AS
BEGIN
	SELECT * FROM FUNCIONES WHERE id_funcion = @IDFUNCION
END;
GO


create proc SP_UPDATE_FUNCION
@id_funcion int,
@id_sala int,
@id_pelicula int,
@precio money,
@fecha_desde datetime,
@fecha_hasta datetime,
@id_horario int
as
begin
update funciones set id_sala = @id_sala, id_pelicula = @id_pelicula, precio = @precio, fecha_desde = @fecha_desde, fecha_hasta = fecha_hasta, id_horario = @id_horario
where id_funcion = @id_funcion
end;
GO


create proc SP_BAJA_FUNCION
@id_funcion int 
as
begin
update funciones set estado = 0
where id_funcion = @id_funcion
end;
GO






-------------------------------------------TICKET

create PROCEDURE SP_CONSULTAR_TICKETS
	@fecha_desde Datetime,
	@fecha_hasta Datetime,
	@cliente varchar(50),
	@empleado varchar(50),
	@pelicula varchar(50)
AS
BEGIN
	SELECT t.id_ticket, c.nombre +' '+ c.apellido 'Nombre cliente',
			e.nombre +' '+ e.apellido 'Nombre empleado', p.titulo, t.total, t.fecha
	FROM TICKETS T
	join CLIENTES C on T.id_cliente = c.id_cliente
	join EMPLEADOS E on e.id_empleado = t.id_empleado
	join DETALLES_TICKET dt on dt.id_ticket = t.id_ticket
	join FUNCIONES f on f.id_funcion = dt.id_funcion
	join PELICULAS p on p.id_pelicula = f.id_pelicula
	WHERE (@fecha_desde is null OR fecha >= @fecha_desde)
	AND (@fecha_hasta is null OR fecha <= @fecha_hasta)
	AND (@cliente is null OR c.nombre + c.apellido LIKE '%' + @cliente + '%')
	AND (@empleado is null OR e.nombre + e.apellido LIKE '%' + @empleado + '%')
	AND (@pelicula is null or p.titulo LIKE '%' + @pelicula + '%' );
END;
GO


create PROCEDURE SP_CONSULTAR_DETALLE_TICKET
	@id_ticket int
AS
BEGIN
	SELECT D.*, B.*, fo.formato, s.*, p.titulo, t.total, t.fecha, p.id_pelicula,
			cl.nombre +' '+ cl.apellido 'cliente', H.*, C.*, i.*, g.*
	FROM DETALLES_TICKET D
	JOIN BUTACAS B ON B.id_butaca = D.id_butaca
	JOIN FUNCIONES F ON F.id_funcion = D.id_funcion
	JOIN HORARIOS H ON H.id_horario = F.id_horario
	JOIN FORMATOS FO ON FO.id_formato = f.id_formato
	join SALAS S ON S.id_sala = F.id_sala
	JOIN PELICULAS P ON P.id_pelicula = F.id_pelicula
	JOIN CLASIFICACIONES C ON C.id_clasificacion = P.id_clasificacion
	JOIN IDIOMAS I ON I.id_idioma = P.id_idioma
	JOIN GENEROS G ON G.id_genero = P.id_genero
	JOIN TICKETS T ON T.id_ticket = d.id_ticket
	join CLIENTES CL on T.id_cliente = cl.id_cliente
	AND T.id_ticket = @id_ticket
END;
GO

create proc SP_BAJA_TICKET
@id_ticket int
as
begin
update TICKETS set estado = 0 where id_ticket = @id_ticket
end;
GO



create procedure SP_INSERTAR_DETALLE
@id_detalle int,
@id_ticket int,
@id_funcion int,
@id_butaca int,
@precio_venta money
as
begin
insert into DETALLES_TICKET(id_detalle, id_ticket,id_funcion,id_butaca,precio_venta) 
values(@id_detalle, @id_ticket,@id_funcion,@id_butaca,@precio_venta);
end;
GO
-----------------------------


create proc SP_CONSULTAR_SALAS
as
BEGIN
select * from SALAS
END;
GO

create proc SP_CONSULTAR_HORARIOS
as
BEGIN
select * from HORARIOS
END;
GO


CREATE proc [dbo].[SP_INSERTAR_FUNCION]
@id_sala int,
@id_pelicula int,
@precio money,
@fecha_desde datetime,
@fecha_hasta datetime,
@id_horario int
as
begin
insert into funciones(id_sala, estado, id_pelicula, precio, fecha_desde, fecha_hasta, id_horario, id_formato) 
values (@id_sala,1,@id_pelicula,@precio,@fecha_desde,@fecha_hasta,@id_horario, 3)
end;
GO



create proc SP_CONSULTAR_CLIENTES
as
BEGIN
select id_cliente ID, nombre+' '+apellido Nombre from CLIENTES
END;
GO


CREATE proc SP_GET_TICKETS_FILTROS
@id int,
@fecha datetime,
@cliente varchar(200)
as
BEGIN
select id_ticket 'Numero de ticket', nombre+' '+apellido Cliente, fecha Fecha from TICKETS t
join clientes c on c.id_cliente = t.id_cliente
where (id_ticket = @id or fecha = @fecha or nombre+' '+apellido = @cliente) and estado = 1
END;
GO

CREATE proc [dbo].[SP_CONSULTAR_FUNCIONES_FILTROS]
@id_funcion int,
@desde datetime,
@hasta datetime
as
BEGIN
select f.id_funcion 'Numero de funcion',titulo Pelicula, nro_sala Sala,tipo 'Tipo de sala',horario Horario, fecha_desde 'Fecha desde', fecha_hasta 'Fecha hasta', precio Precio
from FUNCIONES f join PELICULAS p on p.id_pelicula = f.id_pelicula
join SALAS s on s.id_sala = f.id_sala
join Horarios h on h.id_horario = f.id_horario
join TIPOS_SALAS ts on ts.id_tipo_sala = s.id_tipo_sala
where (f.id_funcion = @id_funcion or (fecha_desde >= @desde and fecha_hasta <= @hasta)) and f.estado = 1
END;
GO


create proc SP_CONSULTAR_PROMOCIONES
as
BEGIN
select id_promocion, procentaje_descuento from PROMOCIONES
END;
GO

create proc SP_CONSUTAR_FORMAS_PAGO
AS
BEGIN
SELECT * FROM FORMAS_PAGO
END;
GO

create proc SP_CONSULTAR_MEDIOS_PEDIDOS
as
BEGIN
select * from MEDIOS_PEDIDO
END;
GO

create proc SP_CONSULTAR_BUTACAS
as
BEGIN
select * from BUTACAS
END;
GO


CREATE proc [dbo].[SP_INSERTAR_TICKET]
@nuevo_id_ticket int output,
@fecha datetime,
@id_cliente int,
@id_medio_pedido int,
@id_promocion int,
@total money,
@id_forma_pago int
as
begin
insert into TICKETS(fecha,id_cliente, id_medio_pedido,id_promocion,total,estado, id_forma_pago) 
values (@fecha,@id_cliente, @id_medio_pedido,@id_promocion,@total,1,@id_forma_pago);
	set @nuevo_id_ticket = SCOPE_IDENTITY()
end;
GO


create PROCEDURE [dbo].[SP_PROXIMO_ID]
@next int OUTPUT
AS
BEGIN
	SET @next = (SELECT MAX(id_ticket)+1  FROM TICKETS);
END;
go



-------Para pruebas-------

--select * from PELICULAS
--update PELICULAS set duracion = 120 where sinopsis = 'Sinopsis...'
--delete from PELICULAS where id_pelicula > 5
--DBCC CHECKIDENT(peliculas, NORESEED);
--DBCC CHECKIDENT(peliculas, RESEED, 5);


----------DATOS DB

GO

INSERT INTO PROMOCIONES VALUES ('2023-09-01', '2023-09-15', 20);
INSERT INTO PROMOCIONES VALUES ('2023-10-01', '2023-10-31', 15);
INSERT INTO PROMOCIONES VALUES ('2023-11-01', '2023-11-30', 10);
INSERT INTO PROMOCIONES VALUES ('2023-12-01', '2023-12-31', 25);
INSERT INTO PROMOCIONES VALUES ('2024-01-01', '2024-01-15', 30);

INSERT INTO CLIENTES (nombre, apellido, fecha_nac, email) VALUES 
('Maria', 'Gonz lez', '1990-05-15', 'maria@example.com'),
 ('Juan', 'P rez', '1985-12-10', 'juan@example.com'),
 ('Luis', 'Torres', '1995-03-22', 'luis@example.com'),
 ('Ana', 'Rodr guez', '1998-07-01', 'ana@example.com'),
 ('Diego', 'L pez', '1980-09-30', 'diego@example.com'),
('Juan', 'Gomez', '1990-05-15', 'juan.gomez@example.com'),
('Ana', 'Lopez', '1985-08-23', 'ana.lopez@example.com'),
('Carlos', 'Rodriguez', '1992-02-10', 'carlos.rodriguez@example.com'),
('Maria', 'Martinez', '1988-11-30', 'maria.martinez@example.com'),
('Pablo', 'Fernandez', '1995-07-18', 'pablo.fernandez@example.com'),
('Laura', 'Garcia', '1993-04-05', 'laura.garcia@example.com'),
('Diego', 'Sanchez', '1987-09-12', 'diego.sanchez@example.com'),
('Sofia', 'Diaz', '1991-01-28', 'sofia.diaz@example.com'),
('Alejandro', 'Perez', '1986-06-20', 'alejandro.perez@example.com'),
('Elena', 'Torres', '1994-03-08', 'elena.torres@example.com'),
('Victor', 'Ruiz', '1989-12-14', 'victor.ruiz@example.com'),
('Carmen', 'Navarro', '1996-10-02', 'carmen.navarro@example.com'),
('Javier', 'Jimenez', '1984-07-25', 'javier.jimenez@example.com'),
('Isabel', 'Luna', '1997-04-17', 'isabel.luna@example.com'),
('Adrian', 'Hernandez', '1998-09-05', 'adrian.hernandez@example.com'),
('Lucia', 'Gutierrez', '1983-11-11', 'lucia.gutierrez@example.com'),
('Marcos', 'Molina', '1999-06-28', 'marcos.molina@example.com'),
('Natalia', 'Castro', '1982-08-03', 'natalia.castro@example.com'),
('Hugo', 'Vargas', '2000-01-20', 'hugo.vargas@example.com'),
('Clara', 'Romero', '1981-12-09', 'clara.romero@example.com'),
('Pedro', 'Alvarez', '2001-03-15', 'pedro.alvarez@example.com'),
('Luisa', 'Serrano', '1980-04-22', 'luisa.serrano@example.com'),
('Roberto', 'Ortega', '2002-07-10', 'roberto.ortega@example.com'),
('Ana Maria', 'Flores', '1979-09-18', 'ana.flores@example.com');

INSERT INTO TIPOS_DOC (tipo) VALUES ('DNI');
INSERT INTO TIPOS_DOC (tipo) VALUES ('Pasaporte');
INSERT INTO TIPOS_DOC (tipo) VALUES ('C dula de Ciudadan a');
INSERT INTO TIPOS_DOC (tipo) VALUES ('Licencia de Conducir');
INSERT INTO TIPOS_DOC (tipo) VALUES ('Tarjeta de Residencia');

INSERT INTO BARRIOS (barrio) VALUES ('Centro');
INSERT INTO BARRIOS (barrio) VALUES ('Nueva C rdoba');
INSERT INTO BARRIOS (barrio) VALUES ('G emes');
INSERT INTO BARRIOS (barrio) VALUES ('Alta C rdoba');
INSERT INTO BARRIOS (barrio) VALUES ('Chateu');

INSERT INTO CARGOS (descripcion) VALUES ('Gerente');
INSERT INTO CARGOS (descripcion) VALUES ('Cajero');
INSERT INTO CARGOS (descripcion) VALUES ('Vendedor');
INSERT INTO CARGOS (descripcion) VALUES ('User');
INSERT INTO CARGOS (descripcion) VALUES ('Proyeccionista');
--
INSERT INTO EMPLEADOS (nombre, apellido, id_tipo_doc, documento, fecha_nac, id_barrio, id_cargo, fecha_alta, telefono, email) 
VALUES ('Mar a', 'Mart nez', 1, 12345678, '1980-04-20', 1, 1, '2021-02-01', '555-1234', 'maria@gmail.com');
INSERT INTO EMPLEADOS (nombre, apellido, id_tipo_doc, documento, fecha_nac, id_barrio, id_cargo, fecha_alta, telefono, email) 
VALUES ('Mart n', 'Polliotto', 2, 87654321, '1982-04-17', 2, 2, '2021-06-03', '555-5678', 'martin@polliotto.com');
INSERT INTO EMPLEADOS (nombre, apellido, id_tipo_doc, documento, fecha_nac, id_barrio, id_cargo, fecha_alta, telefono, email) 
VALUES ('David', 'Alonso', 3, 11223344, '1990-09-02', 3, 3, '2021-08-10', '555-9876', 'fargan@gmail.com');
INSERT INTO EMPLEADOS (nombre, apellido, id_tipo_doc, documento, fecha_nac, id_barrio, id_cargo, fecha_alta, telefono, email) 
VALUES ('Guillermo', 'D az', 4, 99887766, '1985-03-11', 4, 4, '2021-08-05', '555-4321', 'willy@gmail.com');
INSERT INTO EMPLEADOS (nombre, apellido, id_tipo_doc, documento, fecha_nac, id_barrio, id_cargo, fecha_alta, telefono, email) 
VALUES ('Sof a', 'Hern ndez', 5, 66554433, '1994-07-25', 5, 5, '2021-08-02', '555-8765', 'sofia@hotmail.com');
--
INSERT INTO MEDIOS_PEDIDO (descripcion) VALUES ('Web');
INSERT INTO MEDIOS_PEDIDO (descripcion) VALUES ('Tel fono');
INSERT INTO MEDIOS_PEDIDO (descripcion) VALUES ('Taquilla');
INSERT INTO MEDIOS_PEDIDO (descripcion) VALUES ('App M vil');
INSERT INTO MEDIOS_PEDIDO (descripcion) VALUES ('Kiosco');

-- Inserts para la tabla FORMAS_PAGO
INSERT INTO FORMAS_PAGO (descripcion, porcentaje_recargo) VALUES ('Efectivo', 0);
INSERT INTO FORMAS_PAGO (descripcion, porcentaje_recargo) VALUES ('Tarjeta de Cr dito', 5);
INSERT INTO FORMAS_PAGO (descripcion, porcentaje_recargo) VALUES ('Tarjeta de D bito', 3);
INSERT INTO FORMAS_PAGO (descripcion, porcentaje_recargo) VALUES ('PayPal', 7);
INSERT INTO FORMAS_PAGO (descripcion, porcentaje_recargo) VALUES ('Transferencia Bancaria', 2);

-- Inserts para la tabla CLASIFICACIONES
INSERT INTO CLASIFICACIONES (clasificacion) VALUES ('Apta para todos los p blicos');
INSERT INTO CLASIFICACIONES (clasificacion) VALUES ('+7');
INSERT INTO CLASIFICACIONES (clasificacion) VALUES ('+12');
INSERT INTO CLASIFICACIONES (clasificacion) VALUES ('+16');
INSERT INTO CLASIFICACIONES (clasificacion) VALUES ('+18');

-- Inserts para la tabla GENEROS
INSERT INTO GENEROS (genero) VALUES ('Acci n');
INSERT INTO GENEROS (genero) VALUES ('Comedia');
INSERT INTO GENEROS (genero) VALUES ('Drama');
INSERT INTO GENEROS (genero) VALUES ('Ciencia Ficci n');
INSERT INTO GENEROS (genero) VALUES ('Romance');

insert into IDIOMAS
values ('Ingles'), ('Espa ol');


-- Inserts para la tabla TIPOS_SALAS
INSERT INTO TIPOS_SALAS (tipo) VALUES ('Sala 2D');
INSERT INTO TIPOS_SALAS (tipo) VALUES ('Sala 3D');
INSERT INTO TIPOS_SALAS (tipo) VALUES ('Sala IMAX');
INSERT INTO TIPOS_SALAS (tipo) VALUES ('Sala VIP');
INSERT INTO TIPOS_SALAS (tipo) VALUES ('Sala 4D');

-- Inserts para la tabla SALAS
INSERT INTO SALAS (nro_sala, id_tipo_sala) VALUES (1, 1);
INSERT INTO SALAS (nro_sala, id_tipo_sala) VALUES (2, 2);
INSERT INTO SALAS (nro_sala, id_tipo_sala) VALUES (3, 3);
INSERT INTO SALAS (nro_sala, id_tipo_sala) VALUES (4, 4);
INSERT INTO SALAS (nro_sala, id_tipo_sala) VALUES (5, 5);

INSERT INTO BUTACAS(numero) 
VALUES
('1A'),
('1B'),
('1C'),
('2A'),
('2B'),
('2C'),
('3A'),
('3B');

INSERT INTO FORMATOS (formato) VALUES ('2D');
INSERT INTO FORMATOS (formato) VALUES ('3D');
INSERT INTO FORMATOS (formato) VALUES ('IMAX');
INSERT INTO FORMATOS (formato) VALUES ('Dolby Atmos');
INSERT INTO FORMATOS (formato) VALUES ('ScreenX');

INSERT INTO HORARIOS(horario)
VALUES ('10:00'),
('12:00'),
('12:30'),
('14:00'),
('15:30'),
('16:00'),
('17:00'),
('18:30'),
('20:30');

INSERT INTO PELICULAS (titulo, duracion, sinopsis, id_clasificacion, id_genero, id_idioma, estado)
VALUES ('Aventuras Explosivas', 120, 'Una pel cula llena de acci n y emoci n.', 1, 1, 1, 1),
	   ('Misi n Imposible', 130, 'Un agente se embarca en misiones imposibles para salvar el mundo.', 2, 1, 2,1),
       ('Misi n Imposible: Protocolo Fantasma', 135, 'Ethan Hunt enfrenta una nueva misi n imposible.', 2, 1, 2, 1),
       ('El  ltimo Guerrero', 110, 'Un guerrero lucha contra fuerzas oscuras para salvar el reino.', 3, 1, 1, 1),
       ('Intr pidos', 105, 'Un grupo de h roes se une para salvar el mundo.', 4, 1, 2, 1),
       ('El Renacer del Drag n', 125, 'Un maestro de las artes marciales busca venganza.', 5, 1, 1, 1);

INSERT INTO PELICULAS (titulo, duracion, sinopsis, id_clasificacion, id_genero, id_idioma, estado)
VALUES ('Risas y M s Risas', 95, 'Una comedia que te har  re r a carcajadas.', 1, 2, 2, 1),
       ('Locuras en la Ciudad', 110, 'Un grupo de amigos vive situaciones c micas en la gran ciudad.', 2, 2, 1, 1),
       ('La Boda del A o', 120, 'Preparativos para una boda que se convierten en un caos divertido.', 3, 2, 2, 1),
       (' Qu  Desastre!', 100, 'Un d a en la vida de un personaje desafortunado.', 4, 2, 1, 1),
       ('Comedia Rom ntica', 115, 'Amor y risas se entrelazan en esta comedia rom ntica.', 5, 2, 2, 1),
	   ('Locuras de Verano', 100, 'Un grupo de amigos vive locuras durante las vacaciones de verano.', 2, 2,1,1)

INSERT INTO PELICULAS (titulo, duracion, sinopsis, id_clasificacion, id_genero, id_idioma, estado)
VALUES ('El Peso del Pasado', 130, 'Un drama profundo sobre la redenci n.', 1, 3, 1, 1),
       ('Secretos Familiares', 115, 'Una familia enfrenta sus secretos m s oscuros.', 2, 3, 2, 1),
       ('Vidas Entrelazadas', 140, 'Historias de diferentes personas que se cruzan en el destino.', 3, 3, 1, 1),
       ('El  ltimo Adi s', 105, 'Una emotiva historia de despedida y aceptaci n.', 4, 3, 2, 1),
       ('M s All  de la Esperanza', 125, 'Una mirada esperanzadora en medio de la adversidad.', 5, 3, 1, 1),
	   ('Sue o Americano', 150, 'La historia de un hombre que persigue el sue o americano.', 3, 3, 1,1)

INSERT INTO PELICULAS (titulo, duracion, sinopsis, id_clasificacion, id_genero, id_idioma, estado)
VALUES ('El Futuro Desconocido', 110, 'Explorando mundos futuros y tecnolog as asombrosas.', 1, 4, 2, 1),
       ('Invasi n Extraterrestre', 125, 'La humanidad lucha contra una invasi n alien gena.', 2, 4, 1, 1),
       ('Viaje a las Estrellas', 140, 'Exploraci n intergal ctica en busca de nuevos horizontes.', 3, 4, 2, 1),
       ('Realidad Virtual', 105, 'Aventuras en un mundo virtual lleno de sorpresas.', 4, 4, 1, 1),
       ('M quinas Conscientes', 120, 'Inteligencia artificial y su impacto en la sociedad.', 5, 4, 2, 1),
	   ('La Guerra de las Galaxias', 180, 'Una saga  pica de ciencia ficci n.', 4, 4,2,1)

INSERT INTO PELICULAS (titulo, duracion, sinopsis, id_clasificacion, id_genero, id_idioma, estado)
VALUES ('Amor Eterno', 115, 'Una historia de amor que trasciende el tiempo.', 1, 5, 1, 1),
       ('Enamorados en Par s', 130, 'Romance florece en las calles de la Ciudad del Amor.', 2, 5, 2, 1),
       ('Cita a Ciegas', 100, 'Dos almas perdidas se encuentran en una cita inesperada.', 3, 5, 1, 1),
       ('Historia de Amor Prohibido', 145, 'Amor que desaf a barreras sociales y culturales.', 4, 5, 2, 1),
       ('El  ltimo Baile', 110, 'Una historia de amor durante una noche m gica.', 5, 5, 1, 1);



-- Inserts para la tabla FUNCIONES en el rango de fechas de los tickets del a o 2021
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 4, 3, 1, 1, 150, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 2, 5, 1, 2, 120, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 6, 2, 1, 5, 180, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 4, 1, 6, 200, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 9, 1, 1, 9, 130, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 3, 3, 1, 14, 220, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 7, 5, 1, 23, 160, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 5, 2, 1, 7, 140, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 8, 4, 1, 27, 250, '2021-01-01', '2021-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 1, 1, 28, 170, '2021-01-01', '2021-12-31');


-- Inserts para la tabla FUNCIONES en el rango de fechas del a o 2022
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 4, 3, 1, 3, 150, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 2, 5, 1, 21, 120, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 6, 2, 1, 24, 180, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 4, 1, 10, 200, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 9, 1, 1, 27, 130, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 3, 3, 1, 12, 220, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 7, 5, 1, 26, 160, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 5, 2, 1, 15, 140, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 8, 4, 1, 29, 250, '2022-01-01', '2022-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 1, 1, 17, 170, '2022-01-01', '2022-12-31');


-- Inserts para la tabla FUNCIONES en el rango de fechas del a o 2023
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 4, 3, 1, 2, 150, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 2, 5, 1, 19, 120, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 6, 2, 1, 14, 180, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 4, 1, 5, 200, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 9, 1, 1, 17, 130, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (3, 3, 3, 1, 21, 220, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (2, 7, 5, 1, 4, 160, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (5, 5, 2, 1, 13, 140, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (1, 8, 4, 1, 24, 250, '2023-01-01', '2023-12-31');
INSERT INTO FUNCIONES (id_sala, id_horario, id_formato, estado, id_pelicula, precio, fecha_desde, fecha_hasta) VALUES (4, 1, 1, 1, 28, 170, '2023-01-01', '2023-12-31');



--2021
-- Enero
INSERT INTO TICKETS (fecha, id_empleado, id_cliente, id_medio_pedido, id_promocion, total) 
VALUES 
  ('2021-01-01', 1, 1, 1, 1, 300),
  ('2021-01-02', 1, 1, 1, 1, 250),
  ('2021-01-05', 1, 1, 1, 1, 400),
  ('2021-01-08', 1, 1, 1, 1, 320),
  ('2021-01-12', 1, 1, 1, 1, 480),
  ('2021-01-15', 1, 1, 1, 1, 350),
  ('2021-01-24', 1, 1, 1, 1, 290),
  ('2021-01-25', 1, 1, 1, 1, 500),
  ('2021-01-27', 1, 1, 1, 1, 200),
  ('2021-01-30', 1, 1, 1, 1, 120);


INSERT INTO DETALLES_TICKET (id_detalle, id_ticket, id_funcion, id_butaca, precio_venta)
VALUES
(1, 1, 1, 2, 150.00), (2, 1, 1, 3, 150.00), (3, 2, 2, 1, 250.00), (4, 3, 3, 6, 400.00), (5, 4, 4, 4, 150.00), (6, 4, 4, 4, 170.00), 
(7, 5, 5, 2, 240.00), (8, 5, 5, 3, 240.00), (9, 6, 6, 2, 350.00), (10, 7, 7, 3, 290.00), (11, 8, 8, 1, 250.00), (12, 8, 8, 1, 250.00), 
(13, 9, 9, 7, 200.00), (14, 10, 10, 8, 120.00);

-- Febrero
INSERT INTO TICKETS (fecha, id_empleado, id_cliente, id_medio_pedido, id_promocion, total) 
VALUES 
  ('2021-02-02', 1, 1, 1, 1, 250),
  ('2021-02-05', 1, 1, 1, 1, 120),
  ('2021-02-08', 1, 1, 1, 1, 200),
  ('2021-02-12', 1, 1, 1, 1, 270),
  ('2021-02-15', 1, 1, 1, 1, 180),
  ('2021-02-20', 1, 1, 1, 1, 150),
  ('2021-02-24', 1, 1, 1, 1, 290),
  ('2021-02-28', 1, 1, 1, 1, 200);

INSERT INTO DETALLES_TICKET (id_detalle, id_ticket, id_funcion, id_butaca, precio_venta)
VALUES
(15, 11, 1, 2, 150.00), 
(16, 11, 1, 3, 100.00), 
(17, 12, 2, 1, 120.00), 
(18, 13, 3, 6, 200.00), 
(19, 14, 4, 4, 270.00), 
(20, 15, 4, 5, 180.00), 
(21, 16, 5, 2, 150.00), 
(22, 17, 5, 3, 290.00), 
(23, 18, 6, 2, 200.00);

-- Marzo
INSERT INTO TICKETS (fecha, id_empleado, id_cliente, id_medio_pedido, id_promocion, total) 
VALUES 
  ('2021-03-02', 4, 5, 3, 2, 320),
  ('2021-03-05', 2, 12, 4, 1, 450),
  ('2021-03-08', 5, 7, 2, 3, 380),
  ('2021-03-12', 1, 18, 1, 5, 420),
  ('2021-03-15', 3, 15, 5, 4, 300),
  ('2021-03-20', 4, 6, 3, 2, 280),
  ('2021-03-24', 5, 8, 2, 1, 490),
  ('2021-03-28', 2, 11, 4, 3, 350),
  ('2021-03-15', 3, 20, 1, 5, 420),
  ('2021-03-18', 1, 14, 5, 4, 250),
  ('2021-03-22', 3, 9, 3, 2, 480),
  ('2021-03-26', 4, 19, 2, 1, 410),
  ('2021-03-29', 5, 13, 4, 3, 300),
  ('2021-03-30', 2, 10, 1, 5, 470);


INSERT INTO DETALLES_TICKET (id_detalle, id_ticket, id_funcion, id_butaca, precio_venta)
VALUES
(24, 19, 1, 2, 150.00), 
(25, 19, 1, 3, 100.00), 
(26, 19, 2, 4, 120.00), 
(27, 20, 3, 6, 200.00), 
(28, 21, 4, 4, 270.00), 
(29, 21, 8, 5, 270.00), 
(30, 22, 4, 5, 180.00), 
(31, 23, 5, 2, 150.00), 
(32, 24, 8, 1, 120.00), 
(33, 25, 4, 5, 180.00), 
(34, 26, 5, 2, 150.00), 
(35, 27, 9, 1, 120.00), 
(36, 27, 3, 2, 200.00), 
(37, 28, 4, 4, 270.00), 
(38, 29, 10, 5, 180.00), 
(39, 30, 10, 2, 150.00), 
(40, 31, 5, 3, 290.00), 
(41, 32, 6, 2, 200.00);

-- Abril
INSERT INTO TICKETS (fecha, id_empleado, id_cliente, id_medio_pedido, id_promocion, total) 
VALUES ('2021-04-03', 5, 14, 2, 4, 420),
('2021-04-10', 2, 7, 1, 3, 310),
('2021-04-15', 4, 18, 3, 2, 480),
('2021-04-22', 1, 10, 5, 1, 250),
('2021-04-28', 3, 5, 4, 5, 370);

INSERT INTO DETALLES_TICKET (id_detalle, id_ticket, id_funcion, id_butaca, precio_venta)
VALUES
(42, 33, 10, 2, 150.00), 
(43, 33, 10, 3, 100.00), 
(44, 34, 2, 4, 120.00), 
(45, 34, 3, 6, 200.00), 
(46, 35, 8, 4, 270.00), 
(47, 36, 8, 5, 270.00), 
(48, 37, 4, 5, 180.00), 
(49, 37, 5, 2, 150.00), 
(50, 37, 5, 3, 150.00);