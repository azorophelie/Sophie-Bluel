document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        
        if (!email || !validateEmail(email)) {
            errorMessage.innerText = "Veuillez entrer une adresse e-mail valide.";
            errorMessage.style.display = "block";
            return; 
        }

        
        if (!password || password.length < 5 || !password.match(/^[a-zA-Z0-9]+$/g)) {
            errorMessage.innerText = "Le mot de passe doit avoir au moins 5 caractères et ne contenir que des lettres (minuscules ou majuscules) et des chiffres.";
            errorMessage.style.display = "block";
            return; 
        }

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                
                localStorage.setItem("token", data.token);

                
                window.location.href = "index.html";
            } else {
                
                errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            
            errorMessage.innerText = "Une erreur est survenue lors de la connexion.";
            errorMessage.style.display = "block";
            console.error(error);
        }
    });

    
    function validateEmail(email) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

