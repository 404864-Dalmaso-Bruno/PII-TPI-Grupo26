document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const loginData = { 
            Usuario: username,
             Contraseña: password 
            };

        try {
            const response = await fetch('https://localhost:7283/api/logins/login', { // Endpoint para login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                // Si las credenciales son correctas, redirige a la página principal
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "Paginas_html\Menus_html\index.html";
            } else if (response.status === 401) {
                const data = await response.json();
                errorMessage.textContent = data.message || "Usuario o contraseña incorrectos";
            } else {
                errorMessage.textContent = "Hubo un error en el servidor. Inténtalo de nuevo.";
            }
        } catch (error) {
            errorMessage.textContent = "No se pudo conectar con el servidor. Inténtalo de nuevo.";
        }
    });
});
