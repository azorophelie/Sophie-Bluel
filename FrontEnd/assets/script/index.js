/* Fonction pour initialiser la galerie */

function initGallery(data) {
    const galleryElement = document.querySelector('.gallery');
  
    for (const objet of data) {
        const figure = document.createElement("figure");
        figure.classList.add("figure");
        figure.dataset.categoryId = objet.category.id; 
        galleryElement.appendChild(figure);

        const image = new Image();
        image.src = objet.imageUrl;
        image.alt = objet.title;
        figure.appendChild(image);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = objet.title;
        figure.appendChild(figcaption);
    } 
}

/* Fonction pour filtrer les projets par catégorie */

function filterByCategory(categoryId) {
    const galleryItems = document.querySelectorAll('.figure');
    galleryItems.forEach(item => {
        const itemCategoryId = item.dataset.categoryId;
        if (itemCategoryId === categoryId || categoryId === '0') {
            item.style.display = '';
        } else {
            item.style.display = 'none'; 
        }
    });
}

/* Récupérer les données des travaux depuis l'API */

fetch('http://localhost:5678/api/works')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        return response.json();
    })
    .then(data => {
        initGallery(data); 
    })
    .catch(error => {
        console.error('Error fetching works data:', error);
    });

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
    
// Récupérer les données des catégories depuis l'API
fetch('http://localhost:5678/api/categories')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        return response.json();
    })
    .then(categories => {
        const filterButtonsContainer = document.querySelector('#filter-buttons');

        
        // Fonction pour gérer le clic sur les boutons de filtre
    
        function handleClick(categoryId, filterButtons) {
            const allFilterButtons = document.querySelectorAll(".filter-button");
            filterByCategory(categoryId);
            allFilterButtons.forEach(currentFilterButton => {
                if (currentFilterButton === filterButtons) {
                    currentFilterButton.classList.add("active-button");
                } else {
                    currentFilterButton.classList.remove("active-button");
                }
            });
        }
       

        /*Créer le bouton 'Tous'*/

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.id = '0';
        allButton.classList.add("active-filter-btn");
        applyButtonStyles(allButton);
        allButton.style.padding = '5px 25px';
        allButton.style.width = '100px';
        allButton.style.backgroundColor = '#1D6154'; 
        allButton.style.color = 'white';
        allButton.addEventListener('click', () => handleClick('0', allButton));
        filterButtonsContainer.appendChild(allButton);
            
        // Générer les boutons pour chaque catégorie

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.id = category.id.toString();
            button.classList.add('filter-button');
            applyButtonStyles(button);
            button.addEventListener('click', () => handleClick(category.id.toString(), button));
            filterButtonsContainer.appendChild(button);
        });
        
        filterButtonsContainer.style.display = 'flex';
        filterButtonsContainer.style.justifyContent = 'center';
        filterButtonsContainer.style.marginBottom = '60px';
        filterButtonsContainer.style.marginTop = '50px';


        
    })
    .catch(error => {
        console.error('Error fetching categories data:', error);
    });

    /* Affciher la commande Logout quand la personne est connectée*/

    document.addEventListener("DOMContentLoaded", function () {
        const loginLogoutLink = document.getElementById("login-logout-button");
    
        
        const token = localStorage.getItem("token");
        if (token) {
            
            loginLogoutLink.textContent = "logout";
        } else {
            
            loginLogoutLink.textContent = "login";
        }
    

        loginLogoutLink.addEventListener("click", function () {
            if (token) {
                
                localStorage.removeItem("token");
                
                window.location.href = "login.html";
            } else {
                
                window.location.href = "index.html";
            }
        });
    });