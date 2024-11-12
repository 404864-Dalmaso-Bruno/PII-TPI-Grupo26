function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");
}
function redirectToLogin() {
    window.location.href = "Login.html";
}

const showRegisterFormButton = document.getElementById("show-register-form");
const registerForm = document.getElementById("registerForm");
const errorMessage = document.getElementById("register-error-message");


if (showRegisterFormButton) {
    console.log("Botón para mostrar el formulario encontrado.");
    showRegisterFormButton.addEventListener("click", function() {
        document.getElementById("register-form").style.display = 'block';
        showRegisterFormButton.style.display = 'none';
        console.log("Formulario de registro mostrado.");
    });
} else {
    console.error("El botón para mostrar el formulario no se encontró.");
}

if (registerForm) {
    console.log("Formulario de registro encontrado.");
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("new-password2").value;




        try {
            const response = await fetch('https://localhost:7283/api/Logins/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUsername)//==========================
            });

            if (response.ok) {

                errorMessage.textContent = "El nombre de usuario ya ta";
                return;
            } 
        } catch (error) {
            errorMessage.textContent = "Error en la conexión con el servidor.";
            console.error("Error en la conexión:", error);
        }




        if (newPassword !== confirmPassword ) {
            errorMessage.textContent = "Las contraseñas no coinciden.";
            console.log("Las contraseñas no coinciden.");
            return;
        }

        const newUserData = { Usuario: newUsername, Contraseña: newPassword };
        console.log("Datos del usuario:", newUserData);

        try {
            const response = await fetch('https://localhost:7283/api/logins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });

            if (response.ok) {
                showNotification("Volver al Login.");
                errorMessage.textContent = "Usuario registrado con éxito.";
                
                //alert('Usuario registrado con exito'); 
                //window.location.href = `Login.html`;
                registerForm.reset();
                
            } else {
                const result = await response.json();
                errorMessage.textContent = result.message || "Error al registrar el usuario.";
                console.error("Error del servidor:", result.message);
            }
        } catch (error) {
            errorMessage.textContent = "Error en la conexión con el servidor.";
            console.error("Error en la conexión:", error);
        }
    });
} else {
    console.error("El formulario de registro no se encontró.");
}