document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réseau.');
            }
            return response.json();
        })
        .then(data => {
            // Suppression des travaux statiques de la galerie
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML = ''; 

            // Parcourir les données récupérées et ajouter à la galerie
            data.forEach(work => {
                // Créer les éléments HTML pour chaque travail
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const figcaption = document.createElement('figcaption');

                // Ajouter les attributs et le contenu aux éléments
                img.src = work.imageUrl;
                img.alt = work.title;
                figcaption.textContent = work.title;

                // Ajouter les éléments à la figure
                figure.appendChild(img);
                figure.appendChild(figcaption);

                // Ajouter la figure à la galerie
                gallery.appendChild(figure);
            });
        })
        .catch(error => {
            // Gérer les erreurs de réseau ou de réponse de l'API
            console.error(error);
        });
});