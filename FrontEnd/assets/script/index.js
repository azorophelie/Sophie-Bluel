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
                
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const figcaption = document.createElement('figcaption');

                
                img.src = work.imageUrl;
                img.alt = work.title;
                figcaption.textContent = work.title;

                
                figure.appendChild(img);
                figure.appendChild(figcaption);

                
                gallery.appendChild(figure);
            });
        })
        .catch(error => {
            // Gérer les erreurs de réseau ou de réponse de l'API
            console.error(error);
        });
        
});


    // Récupération des catégories depuis le back-end
    fetch('http://localhost:5678/api/categories')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        return response.json();
    })
    .then(categories => {
        const filterButtonsContainer = document.querySelector('#filter-buttons');

        // Fonction pour appliquer les styles aux boutons et gérer le survol
        function applyButtonStyles(button) {
            button.classList.add('filter-button');
            button.style.borderRadius = '20px'; 
            button.style.borderWidth = '1px'; 
            button.style.borderColor = '#1D6154'; 
            button.style.padding = '5px 15px'; 
            button.style.backgroundColor = 'white'; 
            button.style.color = '#1D6154'; 
            button.style.marginRight = '10px';
            button.style.fontSize = '16px';
            
            
            button.addEventListener('mouseover', function() {
                button.style.backgroundColor = '#1D6154'; 
                button.style.color = 'white'; 
            });

            button.addEventListener('mouseout', function() {
                button.style.backgroundColor = 'white'; 
                button.style.color = '#1D6154'; 
            });
        }

        
        const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            applyButtonStyles(allButton); 
            allButton.style.padding = '5px 25px'; 
            filterButtonsContainer.appendChild(allButton);
            
        // Génération des boutons pour chaque catégorie
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            applyButtonStyles(button); 
            filterButtonsContainer.appendChild(button);
        });
        
        filterButtonsContainer.style.display = 'flex';
        filterButtonsContainer.style.justifyContent = 'center';
        filterButtonsContainer.style.marginBottom = '20px';
        
    })

    .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
    });

    