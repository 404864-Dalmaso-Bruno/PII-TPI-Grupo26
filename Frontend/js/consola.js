const nuevaPelicula = {
    titulo: document.getElementById("titulo").value,
    duracion: parseInt(document.getElementById("duracion").value),
    sinopsis: document.getElementById("sinopsis").value,
    idClasificacion: parseInt(document.getElementById("clasificacion").value),
    idGenero: parseInt(document.getElementById("genero").value),
    idIdioma: parseInt(document.getElementById("idioma").value),
};

console.log(nuevaPelicula); // Verifica los datos antes de enviarlos