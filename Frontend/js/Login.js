// login.js

// Credenciales predefinidas
const validUsername = "admin";
const validPassword = "admin";


document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === validUsername && password === validPassword) {
            // Guardar el estado de sesión en localStorage
            localStorage.setItem("isLoggedIn", "true");
            // Redirigir al usuario a la página principal
            window.location.href = "index.html";
        } else {
            document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos";
        }
    });
});