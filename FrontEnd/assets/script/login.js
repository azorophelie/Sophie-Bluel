document.addEventListener("DOMContentLoaded", function() {
	///////////////RECUPERATION DES ELEMENTS DU DOM//////////////
	const loginForm = document.getElementById("login-form");
	const errorMessage = document.getElementById("error-message");
	//ajout d'un écouteur d'événement sur la soumission du formulaire//
	loginForm.addEventListener("submit", async function(event) {
		event.preventDefault();
		//Récupération des valeurs des champs email et mot de passe//
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		// Vérification de l'email //
		if (!email || !validateEmail(email)) {
			errorMessage.innerText = "Veuillez entrer une adresse e-mail valide.";
			errorMessage.style.display = "block";
			errorMessage.style.color = "red";
			return;
		}
		// Vérification du mot de passe //
		if (!password || password.length < 5 || !password.match(/^[a-zA-Z0-9]+$/g)) {
			errorMessage.innerText = "Le mot de passe doit avoir au moins 5 caractères et ne contenir que des lettres (minuscules ou majuscules) et des chiffres.";
			errorMessage.style.display = "block";
			errorMessage.style.color = "red";
			return;
		}
		try {
			// Tentative de connexion avec les identifiants fournis //
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
			// Récupération des données de la réponse //
			const data = await response.json();
			if (response.ok) {
				// Si la connexion réussit, sauvegarde du token dans le stockage local //
				localStorage.setItem("token", data.token);
				// Redirection vers la page d'accueil //
				window.location.href = "index.html";
			} else {
				errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe.";
				errorMessage.style.display = "block";
				errorMessage.style.color = "red";
			}
		} catch (error) {
			errorMessage.innerText = "Une erreur est survenue lors de la connexion.";
			errorMessage.style.display = "block";
			errorMessage.style.color = "red";
			console.error(error);
		}
	});
	// Fonction de validation d'email //
	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
});
///////////////DEFILEMENT VERS LA SECTION CONTACT DE LA PAGE INDEX DEPUIS LA PAGE LOGIN//////////////
const sectionToScroll = window.location.hash.substring(1);
if (sectionToScroll) {
	setTimeout(function() {
		const targetSection = document.getElementById(sectionToScroll);
		if (targetSection) {
			window.scrollTo({
				top: targetSection.offsetTop,
			});
		}
	}, 100);
}