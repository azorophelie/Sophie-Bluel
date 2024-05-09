// Définition des URL des endpoints pour les travaux et les catégories
let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

// Création de la modale principale //
const modal = createModal('modal', 'modal-content', [
  createModalView('gallery-view', 'Galerie Photo', [
      '<div class="gallery-modal"></div>',
      ' <button class="close-button"><i class="fa-solid fa-xmark"></i></button>',
      '<div class="separate-line"></div>'
  ]),
  createModalView('add-photo-view', '', [
      '<button id="open-add-photo-modal">Ajouter une photo</button>'
  ])
]);

// Création de la modale d'ajout de photo //
const addPhotoModal = createModal('add-photo-modal', 'modal-content modal-bis', [
  createModalView('add-photo-hidden', 'Ajout photo', [
      '<form id="addPhotoForm">',
      '<div class="form-modale">',
      createBlueBackground(), // Appel de la fonction createBlueBackground
      '</div>',
      '<div class="title-category">',
      '<label for="photoTitle">Titre </label>',
      '<input type="text" name="photoTitle" id="photoTitle">',
      '<label for="photoCategory" class="selection">Catégorie </label>',
      '<select class="category" id="photoCategory" required>',
      '<option value="" label="Choisissez une catégorie" hidden></option>',
      '</select>',
      '</div>',
      '<button class="close-button"><i class="fa-solid fa-xmark"></i></button>',
      '<button class="back-button"><i class="fa-solid fa-arrow-left"></i></button>',
      '<div class="separate-line ligne"></div>',
      '<div class="modal-view add-photo-view">',
      '<input type="submit" value="Valider" class="valide" id="valide">',
      '</div>',
      '</form>'
  ])
]);

// Fonction pour créer la div avec le background bleu //
function createBlueBackground() {
  const div = document.createElement('div');
  div.className = 'blue-background';
  div.innerHTML = `
    <i id="icon-modale" class="fa-regular fa-image"></i>
    <input type="file" name="image-input" id="image-input">
    <label for="image-input" id="modale-image">+ Ajouter une photo</label>
    <img id="image-preview" src="#" alt="Image preview">
    <p>jpg, png : 4mo max</p>
  `;
  return div.outerHTML;
}

// Fonction de création de modale //
function createModal(id, className, views) {
  const modal = document.createElement('dialog');
  modal.id = id;
  modal.className = className;

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  views.forEach(view => modalContent.appendChild(view));

  modal.appendChild(modalContent);
  return modal;
}


// Fonction de création de vue de modale //
function createModalView(className, heading, innerContents) {
  const view = document.createElement('div');
  view.className = `modal-view ${className}`;
  view.innerHTML = `<h3>${heading}</h3>`;
  innerContents.forEach(content => {
    const element = document.createElement('div');
    element.innerHTML = content;
    view.appendChild(element);
  });
  return view;
}
  
// Ajout des modales au DOM //
document.body.appendChild(modal);
document.body.appendChild(addPhotoModal);

// Ouvrir la modale principale lors du clic sur le bouton "edit" //
var btn = document.querySelector('.edit');
var modeEditionBar = document.querySelector('.edition');

btn.addEventListener('click', function(event) {
  event.preventDefault(); 
  modal.showModal();
  // Afficher la galerie dans la modale principale 
  fetchWorksData();
});

modeEditionBar.addEventListener('click', function() {
  modal.showModal();
});

// Fermer la modale principale lors du clic sur le bouton de fermeture //
var closeBtn = document.querySelector('.close-button');
closeBtn.addEventListener('click', function() {
  modal.close();
});

///////////////OUVERTURE DE LA MODALE LORSQUE LE BOUTON EST CLIQUÉ //////////////

// Fonction pour basculer entre les vues de la modale //
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

// Événement pour ouvrir la modale //
btn.addEventListener('click', async function(event) {
  event.preventDefault();
  modal.showModal();
  await fetchWorksData();
});

///////////////FONCTION POUR RÉCUPÉRER LES TRAVAUX DEPUIS L'API ET AFFICHER LA GALERIE//////////////

// Fonction pour récupérer les données des travaux //
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
  deleteWork();
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

  // Ajout d'un gestionnaire d'événements pour l'événement click sur le bouton "ajouter une photo 
  openAddPhotoModalButton.addEventListener("click", function() {
    resetFormFields();
    // Ouverture de la modale contenant le formulaire
    addPhotoModal.showModal();
  });

// Fermeture de la modale lorsque l'on clique en dehors du contenu //
const closeButton = document.querySelector(".modal-bis .close-button");
closeButton.addEventListener("click", function() {
  addPhotoModal.close();
});

// fermer la modale lorsque l'utilisateur clique en dehors de la modale //
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
    const image = imageInput.files[0];

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
const pImage = document.querySelector(".blue-background p");
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
  document.querySelector(".blue-background").appendChild(imgPreview);
});

const formModale = document.querySelector(".blue-background");
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

// Fonction pour supprimer un travail (ou une photo) //
   const addPhotoForm = document.getElementById('addPhotoForm');

    function displayAddedPhotoInModal(photoData) {
      // Récupérer la galerie dans la modale principale //
      const galleryModal = document.querySelector('.gallery-modal');
    
      // Créer une figure pour représenter la photo ajoutée //
      const figure = document.createElement('figure');
      figure.classList.add('gallery-item');
    
      // Créer l'image de la photo ajoutée //
      const image = new Image();
      image.src = photoData.imageUrl;
      image.alt = photoData.title;
    
      // Création de l'icône de corbeille //
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-trash-can');
      // Ajouter un attribut data-work-id pour identifier l'élément à supprimer
      deleteIcon.dataset.workId = photoData.id;
      // Ajouter un gestionnaire d'événements pour la suppression
      deleteIcon.addEventListener('click', deleteWork);
    
      // Ajouter l'image et l'icône de corbeille à la figure //
      figure.appendChild(image);
      figure.appendChild(deleteIcon);
    
      // Ajouter la figure à la galerie dans la modale //
      galleryModal.appendChild(figure);
    }
    
    const validateButton = document.getElementById('valide');

    // Ajout du gestionnaire d'événements pour le clic sur le bouton Valider //
    validateButton.addEventListener('click', sendFormData);

    ///////////////AJOUTER UNE PHOTO A LA GALERIE//////////////
    async function sendFormData(event) {
      event.preventDefault();  // Empêcher le rechargement de la page
    
      // Récupération de l'objet File de l'image 
      const imageFile = imageInput.files[0];
    
      // Récupération du titre et de la catégorie depuis les champs du formulaire
      const title = document.getElementById('photoTitle').value;
      const category = document.getElementById('photoCategory').value;
    
      // Création d'un nouvel objet FormData //
      const formData = new FormData();
    
      // Ajout de l'objet File pour l'image //
      formData.append('image', imageFile);
    
      // Ajout du titre et de la catégorie //
      formData.append('title', title);
      formData.append('category', category);
    
      // Récupération du token d'authentification //
      const token = localStorage.getItem('token');
    
      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
          body: formData
        });
    
        if (response.ok) {
          // Réinitialisation du formulaire après l'ajout du projet
          resetFormFields();
          alert("Projet a été ajouté avec succès !");
    
          // Fermeture de la modale d'ajout de photo
          const addPhotoModal = document.getElementById('add-photo-modal');
          addPhotoModal.close();
    
          // Ajout de la photo à la galerie
          const responseData = await response.json();
          displayAddedPhotoInModal(responseData);
    
          // Supprimer la galerie existante
          const galleryElement = document.querySelector('.gallery');
          galleryElement.innerHTML = '';
    
          // Récupérer les données les plus récentes de l'API GET et afficher la galerie mise à jour
          regenerateGalleryFromAPI();
    
        } else {
          alert('Erreur lors de l\'ajout de la photo. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de la communication avec l\'API :', error);
        alert('Erreur lors de la communication avec l\'API. Veuillez réessayer.');
      }
    }

    ///////////////REGÉNÉRER LA GALERIE//////////////
    async function regenerateGalleryFromAPI() {
      try {
          const response = await fetch('http://localhost:5678/api/works');
          if (!response.ok) {
              throw new Error('Erreur de réseau.');
          }
          const data = await response.json();
    
          // Initialiser la galerie avec les nouvelles données
          initGallery(data);
      } catch (error) {
          console.error('Erreur lors de la récupération des données de la galerie:', error);
      }
    }
    ///////////////REINITIALISER LE FORMULAIRE APRES AJOUT D'UNE PHOTO //////////////
    function resetFormFields() {
      // Reinitialiser le champ de titre
      const photoTitleInput = document.getElementById('photoTitle');
      photoTitleInput.value = '';
      const photoCategoryInput = document.getElementById('photoCategory');
      photoCategoryInput.value = '';
  
      // Réinitialiser le champ d'entrée de fichier
      const imageInput = document.getElementById('image-input');
      imageInput.value = '';
  
      // Supprimer l'aperçu de l'image s'il existe déjà
      const imgPreview = document.querySelector('.blue-background img');
      if (imgPreview) {
          imgPreview.remove();
      }
      labelImage.style.display = 'block';
      pImage.style.display = 'block';
      inputImage.style.display = 'none';
      iconeImage.style.display = 'block';
  }
  
  // Supprimer la photo de la galerie principale
function deletePhotoFromGallery(photoId) {
  // Sélectionner l'élément de la galerie correspondant à l'ID de la photo
  const photoElement = document.querySelector(`.gallery-item[data-work-id="${photoId}"]`);
  
  // Vérifier si l'élément existe
  if (photoElement) {
      // Supprimer l'élément de la galerie
      photoElement.remove();
  }
}

///////////////SUPPRIMER LES PROJETS DE LA MODALE ET DE LA GALERIE//////////////
function displayGallery(data) {
  const galleryModal = document.querySelector('.gallery-modal');
  galleryModal.innerHTML = '';

  // Ajouter chaque image de la galerie à la modale
  data.forEach(objet => {
      const figure = document.createElement('figure');
      figure.classList.add('gallery-item');

      // Création de l'image
      const image = new Image();
      image.src = objet.imageUrl;
      image.alt = objet.title;
      figure.appendChild(image);

      // Création de l'icône de corbeille pour supprimer l'image
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-trash-can');
      deleteIcon.dataset.workId = objet.id; 
      deleteIcon.addEventListener('click', deleteWork);
      figure.appendChild(deleteIcon);
      
      galleryModal.appendChild(figure);
  });
}
const storedToken = localStorage.getItem('token');

// supprimer la photo //
async function deleteWork(event) {
  
      event.preventDefault();
      const workId = event.target.dataset.workId;
      const figureToDelete = event.target.closest('.gallery-item'); // Trouver l'élément figure parent à supprimer
      const modalImageToDelete = document.querySelector(`.modal-image[data-work-id="${workId}"]`); // Trouver l'image correspondante dans la modale

      // Demander confirmation avant de supprimer le projet
      try { if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
          // Effectuer la requête de suppression
          const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
              method: 'DELETE',
              headers: {
                  'accept': '*/*',
                  'authorization': `Bearer ${token}` // Utilisation de storedToken
              }
          });

          if (!response.ok) {
              throw new Error('Erreur lors de la suppression du projet.');
          }
          
          // Vérifier si la réponse n'est pas vide avant de la traiter comme JSON
          if (response.status !== 204) {
              return response.json();
          }
          
          const galleryElement = document.querySelector('.gallery-view, .gallery');
          galleryElement.innerHTML = '';
          alert("Photo supprimée avec succès");
          // Supprimer l'élément de la galerie
          figureToDelete.remove();
          // Supprimer l'image de la modale
          
          await regenerateGalleryFromAPI();
      }
  } catch (error) {
      console.error('Error deleting work:', error);
      alert('Erreur lors de la suppression de la photo. Veuillez réessayer.');
  }
}

// Définissez la fonction pour ajouter la photo à la galerie existante
function displayAddedPhoto(photoData) {
  const galleryModal = document.querySelector('.gallery-modal');
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

// Vérification de la présence du token d'authentification//
let token = localStorage.getItem('token');
if (token) {
  // Utilisez le token dans vos requêtes API
  console.log("Token d'authentification récupéré :", token);
} else {
  console.log("Aucun token d'authentification trouvé dans le sessionStorage.");
}

 
 



