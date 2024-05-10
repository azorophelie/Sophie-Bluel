// Définition des URL des endpoints pour les travaux et les catégories
let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

//////////////// CRÉATION DE LA MODALE PRINCIPALE ////////////////
const modalContainer = document.createElement('dialog');
modalContainer.id = 'modal';

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

const modalView = document.createElement('div');
modalView.classList.add('modal-view', 'gallery-view');

const modalTitle = document.createElement('h3');
modalTitle.textContent = "Galerie Photo";
modalView.appendChild(modalTitle);

const galleryModal = document.createElement('div');
galleryModal.classList.add('gallery-modal');
modalView.appendChild(galleryModal);

// Création du bouton de fermeture pour la première modal
const closeButtonModal1 = document.createElement('button');
closeButtonModal1.classList.add('close-button');
closeButtonModal1.innerHTML = "<i class='fa-solid fa-xmark'></i>";

// Ajout du bouton de fermeture à la première modal
const separateLine = document.createElement('div');
separateLine.classList.add('separate-line');
modalView.appendChild(separateLine);

const addPhotoView = document.createElement('div');
addPhotoView.classList.add('modal-view', 'add-photo-view');

// Bouton ajouter une photo sur la première modale 
const addPhotoButton = document.createElement('button');
addPhotoButton.id = 'open-add-photo-modal';
addPhotoButton.textContent = "Ajouter une photo";
addPhotoView.appendChild(addPhotoButton);

// Ajouter les éléments à la modale
modalContent.appendChild(modalView);
modalContent.appendChild(closeButtonModal1);
modalContent.appendChild(addPhotoView);
modalContainer.appendChild(modalContent);

// Fonction pour ouvrir la modale
function openModal() {
modalContainer.showModal();
}

//////////////// CRÉATION DE LA MODALE AJOUTER UNE PHOTO ////////////////
const addPhotoModal = document.createElement('dialog');
addPhotoModal.id = 'add-photo-modal';
addPhotoModal.classList.add('modal-bis');
addPhotoModal.style.display = 'none';

const addPhotoModalContent = document.createElement('div');
addPhotoModalContent.classList.add('modal-content');
addPhotoModalContent.classList.add('modal-view');

const modalCont = document.createElement('div');
modalCont.id = 'add-photo-hidden';

// Bouton pour retourner à la modale précédente
const backButton = document.createElement('button');
backButton.classList.add('back-button');
backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
 

// Bouton fermer pour la deuxième modale 
const closeButtonModal2 = document.createElement('button');
closeButtonModal2.classList.add('close-button');
closeButtonModal2.innerHTML = "<i class='fa-solid fa-xmark'></i>";

const addPhotoTitle = document.createElement('h3');
addPhotoTitle.textContent = 'Ajout photo';
addPhotoModalContent.appendChild(addPhotoTitle);

// Bouton pour valider l'ajout de photos 
const submitButton = document.createElement('button');
submitButton.classList.add('valide');
submitButton.id = 'valide';
submitButton.textContent = 'Valider';

// Création du formulaire pour ajouter une photo
const addModalForm = document.createElement('form');
addModalForm.id = 'addPhotoForm';

// Création du conteneur pour les éléments d'ajout de photo
const formBlue = document.createElement('div');
formBlue.classList.add('blue-background');

// Création de l'icône pour ajouter une photo
const iconModale = document.createElement('i');
iconModale.id = 'icon-modale';
iconModale.classList.add('fa-regular', 'fa-image');

// Création de l'élément input pour le chargement de l'image
const imageInput = document.createElement('input');
imageInput.setAttribute('type', 'file');
imageInput.setAttribute('name', 'image-input');
imageInput.id = 'image-input';

const imageInputLabel = document.createElement('label');
imageInputLabel.setAttribute('for', 'image-input');
imageInputLabel.id = 'modale-image';
imageInputLabel.textContent = '+ Ajouter une photo';

const fileInfoParagraph = document.createElement('p');
fileInfoParagraph.textContent = 'jpg, png : 4mo max';

// Création de l'aperçu de l'image
const imagePreview = document.createElement('img');
imagePreview.id = 'image-preview';
imagePreview.setAttribute('src', '#');
imagePreview.setAttribute('alt', 'Image preview');

// Ajout des éléments au conteneur
formBlue.appendChild(iconModale);
formBlue.appendChild(imageInput);
formBlue.appendChild(imageInputLabel);
formBlue.appendChild(fileInfoParagraph);
formBlue.appendChild(imagePreview);

// Creation des elements titre et catégories pour le formulaire 
const titleLabel = document.createElement('label');
titleLabel.setAttribute('for', 'photoTitle');
titleLabel.textContent = 'Titre';

// Création du label pour le champ de sélection de la catégorie
const categoryLabel = document.createElement('label');
categoryLabel.setAttribute('for', 'photoCategory');
categoryLabel.textContent = 'Catégorie';

const titleInput = document.createElement('input');
titleInput.setAttribute('type', 'text');
titleInput.id = 'photoTitle';
titleInput.setAttribute('placeholder', 'Titre');

// Ajout des libellés avant les champs correspondants dans le formulaire
const categorySelect = document.createElement('select');
categorySelect.id = 'photoCategory';

// Création de l'option de placeholder
const placeholderOption = document.createElement('option');
placeholderOption.value = '';
placeholderOption.textContent = 'Choisissez une catégorie';
placeholderOption.disabled = true;
placeholderOption.selected = true;
categorySelect.appendChild(placeholderOption);

// Ajout des éléments au formulaire
addModalForm.appendChild(imageInput);
addModalForm.appendChild(titleInput);
addModalForm.appendChild(categorySelect);

// Ajout des éléments à la modale
addPhotoModalContent.appendChild(formBlue);
addPhotoModalContent.appendChild(backButton);
addPhotoModalContent.appendChild(closeButtonModal2);
addPhotoModalContent.appendChild(addModalForm);
addPhotoModalContent.appendChild(submitButton);

// Ajout des labels au formulaire
addModalForm.appendChild(titleLabel);
addModalForm.appendChild(titleInput);
addModalForm.appendChild(categoryLabel);
addModalForm.appendChild(categorySelect);

// Création de la ligne séparatrice
const separateLinePhoto = document.createElement('div');
separateLinePhoto.classList.add('separate-line');
addPhotoModalContent.insertBefore(separateLinePhoto, submitButton);

// Ajout du conteneur au formulaire
addPhotoModal.appendChild(addPhotoModalContent);

function openAddPhotoModal() {
  addPhotoModal.showModal();
}

// Ajout des modales au corps du document
document.body.appendChild(addPhotoModal);
document.body.appendChild(modalContainer);

// Fonction pour ouvrir la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
  addPhotoModal.showModal();
}

// Sélection des boutons d'édition
var btn = document.querySelector('.edit');
var modeEditionBar = document.querySelector('.edition');

// Fonction pour basculer entre les vues de la modale
function switchView(view) {
  var views = document.querySelectorAll('.gallery-view');
  views.forEach(function(v) {
    v.classList.remove('active');
  });
  document.querySelector('.' + view).classList.add('active');
}

// Exemple d'utilisation pour basculer entre les vues
// switchView('gallery-view'); // Pour afficher la vue galerie
// switchView('add-photo-view'); // Pour afficher la vue ajout photo

////////////////FONCTION POUR RÉCUPÉRER LES TRAVAUX DEPUIS L'API ET AFFICHER LA GALERIE////////////////

// Fonction pour récupérer les données des travaux pour la modale
async function fetchWorksData() {

  try {
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
          throw new Error('Erreur de réseau.');
      }
      const data = await response.json();
      console.log(data);
      displayGallery(data); // Afficher la galerie de photos une fois les données récupérées
  } catch (error) {
      console.error('Error fetching works data:', error);
  }
}

// Définir les éléments du formulaire et les boutons après la création des modales
document.addEventListener("DOMContentLoaded", function() {
  // Votre code ici
  const photoTitleInput = document.getElementById("photoTitle");
  const photoCategorySelect = document.getElementById("photoCategory");
  const imageInput = document.getElementById("image-input");
  const addButton = document.querySelector(".valide");

  // Fonction pour vérifier si tous les champs du formulaire sont remplis //
  function checkFields() {
    // Récupérer les valeurs des champs du formulaire
    const titleValue = document.getElementById('photoTitle').value;
    const categoryValue = document.getElementById('photoCategory').value;
    const imageValue = document.getElementById('image-input').value;

    // Vérifier si les champs sont remplis
    if (titleValue && categoryValue && imageValue) {
      return true;
    } else {
      return false;
    }
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

  // updateButtonState pour initialiser l'état du bouton au chargement de la page
  updateButtonState();
});

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
      addPhotoModal.style.display = 'none';
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
    imgPreview.parentNode.removeChild(imgPreview);
}
  
  labelImage.style.display = 'block';
  pImage.style.display = 'block';
  inputImage.style.display = 'none';
  iconeImage.style.display = 'block';
}

resetFormFields();

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

  // Affiche la galerie de photos à partir des données récupérées
function displayGallery(data) {
  // Sélectionner l'élément contenant la galerie
  const galleryModal = document.querySelector('.gallery-modal');
  
  // Effacer le contenu précédent de la galerie
  galleryModal.innerHTML = '';
  
  // Parcourir les travaux et créer des éléments pour chaque photo
  data.forEach(work => {
    // Créer un élément de photo
    const photoElement = document.createElement('div');
    photoElement.classList.add('gallery-item');
    
    // Créer une image pour la photo
    const imageElement = document.createElement('img');
    const image = new Image();
    imageElement.src = work.imageUrl; // Remplacer imageUrl par le nom de la propriété contenant l'URL de l'image dans vos données
    imageElement.alt = work.title; // Ajouter l'attribut alt avec le titre de la photo
    
    // Création de l'icône de corbeille pour supprimer l'image
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can');
    deleteIcon.dataset.workId = work.id;
    deleteIcon.addEventListener('click', deleteWork); // Utiliser work.id pour l'identifiant du travail
    
    // Ajouter l'image à l'élément de photo
    photoElement.appendChild(imageElement);
    
    // Ajouter l'icône de suppression à l'élément de photo
    photoElement.appendChild(deleteIcon);
    
    // Ajouter l'élément de photo à la galerie
    galleryModal.appendChild(photoElement);
  });
}
const storedToken = localStorage.getItem('token');

////////////// SUPPRIMER LES PHOTOS //////////////
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

/////////////// ECOUTEURS D'EVENEMENTS //////////////
// Fermer la première modal avec la croix //
closeButtonModal1.addEventListener('click', function() {
  if (confirm("Voulez-vous vraiment quitter sans enregistrer les données ?")) {
      modalContainer.close(); // Ferme la première modal
  }
});

// Bouton ajouter une photo sur la premiére modal
addPhotoButton.addEventListener("click", function() {
// Appeler la fonction pour ouvrir la modale d'ajout de photo
openAddPhotoModal();
});
// Bouton pour retrouner a la modale précédente //
backButton.addEventListener('click', function() {
 // Confirmation avant de quitter la modal
 if (confirm("Voulez-vous vraiment quitter sans enregistrer les données ?"))
// Code pour masquer la modal actuelle et afficher la modal précédente
document.getElementById('add-photo-modal').close();
  document.getElementById('modal').showModal();
  addPhotoModal.style.display = 'none';
});

// Fermer la deuxiéme modal avec la croix //
closeButtonModal2.addEventListener('click', function() {
  if (confirm("Voulez-vous vraiment quitter sans enregistrer les données ?")) {
      addPhotoModal.close();
      modalContainer.close(); // Ferme la première modal
      addPhotoModal.style.display = 'none';
  }
});

// Ouvrir la modale principale lors du clic sur modeEditionBar//
modeEditionBar.addEventListener('click', function() {
  openModal();
  fetchWorksData();
});

// Ouvrir la modale principale lors du clic sur modifier //
btn.addEventListener('click', async function(event) {
event.preventDefault();
openModal(); // Utilisez openModal() pour ouvrir la modale principale
await fetchWorksData();
});

// Bouton pour valider le formulaire //
validateButton.addEventListener('click', sendFormData);
