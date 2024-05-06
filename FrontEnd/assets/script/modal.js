// Définition des URL des endpoints pour les travaux et les catégories

let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";


///////////////OUVERTURE DE LA MODALE LORSQUE LE BOUTON EST CLIQUÉ //////////////

var modal = document.getElementById('modal');
    var btn = document.querySelector('.edit');
    var modeEditionBar = document.querySelector('.edition');

    btn.addEventListener('click', function(event) {
      event.preventDefault(); 
      modal.showModal();
    });
    
    modeEditionBar.addEventListener('click', function() {
      modal.showModal();
    });
   ///////////////FERMETURE DE LA MODALE//////////////
    var closeBtn = document.querySelector('.close-button');
    closeBtn.addEventListener('click', function() {
      modal.close();
    });


// Fonction pour basculer entre les vues de la modale
function switchView(view) {
  var views = document.querySelectorAll('.modal-view');
  views.forEach(function(v) {
    v.classList.remove('active');
  });
  document.querySelector('.' + view).classList.add('active');
}

// Exemple d'utilisation pour basculer entre les vues
// switchView('gallery-view'); // Pour afficher la vue galerie
// switchView('add-photo-view'); // Pour afficher la vue ajout photo

///////////////AFFICHER LA GALLERIE DANS LA MODALE//////////////

btn.addEventListener('click', async function(event) {
    event.preventDefault();
    modal.showModal();
  
    try {
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
        throw new Error('Erreur de réseau.');
      }
      const data = await response.json();
      displayGallery(data);
    } catch (error) {
      console.error('Error fetching works data:', error);
    }
  });

  function displayGallery(data) {
    const galleryModal = document.querySelector('.gallery-modal');
  
    galleryModal.innerHTML = '';
  
    // Ajouter chaque image de la galerie à la modale
    data.forEach(objet => {
      const figure = document.createElement('figure');
      figure.classList.add('gallery-item');
  
      // Création de l'image //
      const image = new Image();
      image.src = objet.imageUrl;
      image.alt = objet.title;
      figure.appendChild(image);
  
    // Création de l'icône de corbeille pour supprimer l'image //
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-trash-can');
      deleteIcon.dataset.workId = objet.id; 
      deleteIcon.addEventListener('click', deleteWork);
      figure.appendChild(deleteIcon);
      galleryModal.appendChild(figure);
    });
  }
  
        
///////////////SUPPRIMER LES PROJETS DE LA MODALE ET DE LA GALERIE//////////////
const storedToken = localStorage.getItem('token');

function deleteWork(event) {
  const workId = event.target.dataset.workId;
  const figureToDelete = event.target.closest('.gallery-item'); // Trouver l'élément figure parent à supprimer
  
  // Demander confirmation avant de supprimer le projet
  if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
    // Effectuer la requête de suppression
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        accept: "*/*",
        authorization: `Bearer ${storedToken}` // Utilisation de storedToken
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du projet.');
      }
      // Vérifier si la réponse n'est pas vide avant de la traiter comme JSON
      if (response.status !== 204) {
        return response.json();
      }
    })
    .then(() => {
      // Actualiser la galerie après suppression
      fetchWorksData();
    })
    .catch(error => {
      console.error('Error deleting work:', error);
    });
  }
}

///////////////FONCTION POUR RÉCUPÉRER LES TRAVAUX DEPUIS L'API ET AFFICHER LA GALERIE//////////////
async function fetchWorksData() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
      throw new Error('Erreur de réseau.');
    }
    const data = await response.json();
    displayGallery(data);
  } catch (error) {
    console.error('Error fetching works data:', error);
  }
}

// Appeler cette fonction pour afficher la galerie initiale //
fetchWorksData();

///////////////BOUTON DE RETOUR A LA PAGE PRÉCÉDENTE//////////////
document.querySelector('.back-button').addEventListener('click', function() {
  // Vérifier si les champs du formulaire sont remplis
  if (checkFields()) {
    // Si les champs sont remplis, fermer la modale actuelle et ouvrir la modale précédente
    document.getElementById('add-photo-modal').close();
    document.getElementById('modal').showModal();
  } else {
    // Si les champs ne sont pas remplis, demander confirmation à l'utilisateur
    if (confirm("Voulez-vous vraiment quitter sans enregistrer les données ?")) {
      // Si l'utilisateur confirme, fermer la modale actuelle et ouvrir la modale précédente
      document.getElementById('add-photo-modal').close();
      document.getElementById('modal').showModal();
    } else {
      // Si l'utilisateur annule, ne pas fermer la modale actuelle
      // L'utilisateur souhaite rester sur la modale actuelle, donc aucun code n'est nécessaire ici
    }
  }
});

///////////////CLIQUER SUR LE BOUTON 'AJOUTER UNE PHOTO'//////////////
  const openAddPhotoModalButton = document.getElementById("open-add-photo-modal");

  // Récupération de la modale contenant le formulaire d'ajout de photo //
  const addPhotoModal = document.getElementById("add-photo-modal");
  
  // Ajout d'un gestionnaire d'événements pour l'événement click sur le bouton //
  openAddPhotoModalButton.addEventListener("click", function() {
    // Ouverture de la modale contenant le formulaire
    addPhotoModal.showModal();
  });

// Fermeture de la modale lorsque l'on clique en dehors du contenu //
  const closeButton = document.querySelector(".modal-bis .close-button");
  closeButton.addEventListener("click", function() {
  addPhotoModal.close();
});

// fermer la modale lorsque l'utilisateur clique en dehors de la modale
addPhotoModal.addEventListener("click", function(event) {
  if (event.target === addPhotoModal) {
    addPhotoModal.close();
  }
});


// Récupération des éléments du formulaire et du bouton "Valider" //
const photoTitleInput = document.getElementById("photoTitle");
const photoCategorySelect = document.getElementById("photoCategory");
const imageInput = document.getElementById("image-input");
const addButton = document.querySelector(".valide");

// Fonction pour vérifier si tous les champs du formulaire sont remplis //
function checkFields() {
    const title = photoTitleInput.value.trim();
    const category = photoCategorySelect.value;
    const image = imageInput.files [0];

    return title !== "" && category !== "" && image !== undefined;
}

// Mettre à jour le style du bouton en fonction des champs remplis //
function updateButtonState() {
    if (checkFields()) {
        addButton.removeAttribute("disabled"); // Activer le bouton
    } else {
        addButton.setAttribute("disabled", "disabled"); // Désactiver le bouton
    }
}

// Écouteurs d'événements pour les changements dans les champs du formulaire //
photoTitleInput.addEventListener("input", updateButtonState);
photoCategorySelect.addEventListener("change", updateButtonState);

// Appelez updateButtonState une fois pour initialiser l'état du bouton au chargement de la page
updateButtonState();

///////////////PRÉVISUALISATION DE L'IMAGE//////////////

const inputImage = document.getElementById("image-input");
const labelImage = document.getElementById("modale-image");
const pImage = document.querySelector(".form-modale p");
const iconeImage = document.getElementById("icon-modale");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

// style pour positionner l'image dans la bordure //
  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.position = "absolute"; 
  imgPreview.style.top = "50%"; 
  imgPreview.style.left = "50%"; 
  imgPreview.style.transform = "translate(-50%, -50%)"; 
  imgPreview.style.maxHeight = "100%"; 
  imgPreview.style.maxWidth = "100%"; 

  // Masquer les éléments inutiles //
  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iconeImage.style.display = "none";
  document.querySelector(".form-modale").appendChild(imgPreview);
});

const formModale = document.querySelector(".form-modale");
formModale.style.position = "relative"; 

///////////////RÉCUPÉRATION ET AFFICHAGE DES CATÉGORIES DANS LE FORMULAIRE//////////////
fetch("http://localhost:5678/api/categories")
   .then(response => {
     if (!response.ok) {
       throw new Error("Erreur lors de la récupération des catégories");
     }
     return response.json();
   })
   .then(data => {
     const selectCategory = document.getElementById("photoCategory");
     // Effacer les options existantes pour éviter les doublons lors de rechargements
     selectCategory.innerHTML = "";
     
     const defaultOption = document.createElement("option");
     defaultOption.value = "";
     defaultOption.textContent = "Choisissez une catégorie";
     defaultOption.hidden = true;
     selectCategory.appendChild(defaultOption);
     // Boucle sur les catégories pour les ajouter au sélecteur
     data.forEach(category => {
       const option = document.createElement("option");
       option.value = category.id;
       option.textContent = category.name;
       selectCategory.appendChild(option);
     });
   })
   .catch(error => {
     console.error("Erreur lors de la récupération des catégories :", error);
     
   });



   const addPhotoForm = document.getElementById('addPhotoForm');

   // Ajout d'un gestionnaire d'événements pour la soumission du formulaire
   addPhotoForm.addEventListener('submit', (event) => {
     event.preventDefault(); // Empêche le rechargement de la page
   
     // Récupération de l'objet File de l'image
     const imageFile = document.getElementById('image-input').files[0];
   
     // Récupération du titre et de la catégorie depuis les champs du formulaire
     const title = document.getElementById('photoTitle').value;
     const category = document.getElementById('photoCategory').value;
   
     // Création d'un nouvel objet FormData
     const formData = new FormData();
   
     // Ajout de l'objet File pour l'image
     formData.append('image', imageFile);
   
     // Ajout du titre et de la catégorie
     formData.append('title', title);
     formData.append('category', category);
   
     // Envoi des données à l'API via une requête POST
     sendFormData(formData);
   });


   
 
 /////////////// FONCTION POUR ENVOYER LE FORMULAIRE //////////////
async function sendFormData(formData) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // Utilisez directement la variable token
      },
      body: formData
    });
    
    if (response.ok) {
      // Réinitialisation du formulaire après l'ajout du projet
      const addPhotoForm = document.getElementById('addPhotoForm');
      addPhotoForm.reset();

      // Fermeture de la modale d'ajout de photo
      const addPhotoModal = document.getElementById('add-photo-modal');
      addPhotoModal.close();
      
      // Ajout de la photo à la galerie //
      const responseData = await response.json();
      displayAddedPhoto(responseData); // Appel de la fonction pour ajouter la photo à la galerie
    } else {
      alert('Erreur lors de l\'ajout de la photo. Veuillez réessayer.');
    }
  } catch (error) {
    console.error('Erreur lors de la communication avec l\'API :', error);
    alert('Erreur lors de la communication avec l\'API. Veuillez réessayer.');
  }
}

// Ajoutez une fonction pour afficher la photo ajoutée à la galerie //
function displayAddedPhoto(photoData) {
  const galleryModal = document.querySelector('.gallery-modal');

  // Créez un élément figure pour la nouvelle photo //
  const figure = document.createElement('figure');
  figure.classList.add('gallery-item');

  // Créez une balise image pour afficher la photo //
  const image = new Image();
  image.src = photoData.imageUrl;
  image.alt = photoData.title;

  // Ajoutez l'image à la figure //
  figure.appendChild(image);

  // Ajoutez la figure à la galerie //
  galleryModal.appendChild(figure);
}



 // Fonction pour vérifier si tous les champs sont remplis //
 function validateForm(form) {
   let isValid = true;
   form.querySelectorAll('input[type="text"], select').forEach((input) => {
     if (!input.value.trim()) {
       isValid = false;
     }
   });
   return isValid;
 }
  
 function DeleteIcon() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lastItem = galleryItems[galleryItems.length - 1];
  
  // Création de l'icône de corbeille


  // Ajoutez l'icône de corbeille à la dernière figure dans la galerie
  lastItem.appendChild(deleteIcon);
}
 // Vérification de la présence du token d'authentification//
let token = localStorage.getItem('token');
if (token) {
    // Utilisez le token dans vos requêtes API
    console.log("Token d'authentification récupéré :", token);
  } else {
    console.log("Aucun token d'authentification trouvé dans le sessionStorage.");
  }

 
 



