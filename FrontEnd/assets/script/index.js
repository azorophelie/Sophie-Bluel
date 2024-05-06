/////////////// FONCTION POUR INITIALISER LA GALERIE //////////////
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

/////////////// FONCTION POUR FILTRER LES PROJETS PAR CATÉGORIE //////////////
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

// Récupérer les données des travaux depuis l'API //
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

    
// Récupérer les données des catégories depuis l'API //
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories data:', error);
        return [];
    }
}

let allButton; 

async function displayCategories() {
    const categories = await fetchCategories();
    const filterButtonsContainer = document.querySelector('#filter-buttons');

    function handleClick(categoryId, filterButton) {
        const allFilterButtons = document.querySelectorAll(".filter-button");
        filterByCategory(categoryId);
        allFilterButtons.forEach(button => {
            if (button === filterButton) {
                button.classList.add("active-button");
            } else {
                button.classList.remove("active-button");
            }
        });
        
    }

   
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.id = '0';
    allButton.classList.add("active-button");
    allButton.classList.add('filter-button');
    allButton.addEventListener('click', () => handleClick('0', allButton));
    filterButtonsContainer.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.id = category.id.toString();
        button.classList.add('filter-button');
        button.addEventListener('click', () => handleClick(category.id.toString(), button));
        filterButtonsContainer.appendChild(button);
    });

}

displayCategories();

    // Affciher la commande Logout quand la personne est connectée //

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

    document.addEventListener("DOMContentLoaded", function () {
        const loginForm = document.getElementById("login-form");
        const errorMessage = document.getElementById("error-message");
        const editModeSection = document.getElementById("admin");
        const modifierDiv = document.querySelector("#portfolio .edit");
        
    
        /* Vérifie si l'utilisateur est connecté en vérifiant la présence du token dans le localStorage  */
        const isLoggedIn = !!localStorage.getItem("token");
    
        /* Affiche ou masque le mode édition en fonction de la connexion de l'utilisateur */
        if (isLoggedIn) {
            editModeSection.style.display = "block"; 
            modifierDiv.style.display = "block";  
        } else {
            editModeSection.style.display = "none"; 
            modifierDiv.style.display = "none"; 
        }
    });
    
    