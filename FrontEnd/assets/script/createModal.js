import { createModal } from './assets/script/modal.js';

// Appeler la fonction createModal
const createModal = () => {
    // Création de la div pour la modal
    const modalDiv = document.createElement('dialog');
    modalDiv.id = 'modal';
    modalDiv.classList.add('modal');
  
    // Contenu de la modal
    modalDiv.innerHTML = `
        <div class="modal-content">
            <div class="modal-view gallery-view">
                <h3>Galerie Photo</h3>
                <div class="gallery-modal"></div>
                <button class="close-button"><i class="fa-solid fa-xmark"></i></button>
                <div class="separate-line"></div>
            </div>
            <div class="modal-view add-photo-view">
                <button id="open-add-photo-modal">Ajouter une photo</button>
            </div>
        </div>
    `;
  
    // Ajout de la modal à la fin du corps du document
    document.body.appendChild(modalDiv);
  
    // Récupération du bouton pour fermer la modal
    const closeButton = modalDiv.querySelector('.close-button');
  
    // Ajout d'un gestionnaire d'événements pour fermer la modal lorsque vous cliquez sur le bouton de fermeture
    closeButton.addEventListener('click', () => {
        modalDiv.close(); // Fermer la modal
    });
  
    // Récupération du bouton "Ajouter une photo" pour ouvrir la modal d'ajout de photo
    const openAddPhotoModalButton = document.getElementById("open-add-photo-modal");
  
    // Ajout d'un gestionnaire d'événements pour l'événement click sur le bouton "Ajouter une photo"
    openAddPhotoModalButton.addEventListener("click", () => {
        modalDiv.showModal(); // Afficher la modal
    });
  
    // Sélection du titre h3 à l'intérieur de la modal
    const galeriePhotoTitle = modalDiv.querySelector('.gallery-view h3');
    // Modification du contenu du titre
    galeriePhotoTitle.textContent = "Galerie Photo";
  
    // Afficher la modal après sa création
    modalDiv.showModal();
  };
  
  // Appel de la fonction pour créer et afficher la modal
  createModal();
  
  const modal = document.createElement('dialog');
modal.id = 'modal';
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

// Vue galerie
const galleryView = document.createElement('div');
galleryView.className = 'modal-view gallery-view';
const galleryTitle = document.createElement('h3');
galleryTitle.textContent = 'Galerie Photo';
const galleryModal = document.createElement('div');
galleryModal.className = 'gallery-modal';
const closeButton = document.createElement('button');
closeButton.className = 'close-button';
closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
const separateLine = document.createElement('div');
separateLine.className = 'separate-line';

galleryView.appendChild(galleryTitle);
galleryView.appendChild(galleryModal);
galleryView.appendChild(closeButton);
galleryView.appendChild(separateLine);

// Vue ajout photo
const addPhotoView = document.createElement('div');
addPhotoView.className = 'modal-view add-photo-view';
const openAddPhotoButton = document.createElement('button');
openAddPhotoButton.id = 'open-add-photo-modal';
openAddPhotoButton.textContent = 'Ajouter une photo';
addPhotoView.appendChild(openAddPhotoButton);

modalContent.appendChild(galleryView);
modalContent.appendChild(addPhotoView);

modal.appendChild(modalContent);
document.body.appendChild(modal);

// Création de la modal ajout photo
const addPhotoModal = document.createElement('dialog');
addPhotoModal.id = 'add-photo-modal';
addPhotoModal.className = 'modal-bis';

const addPhotoModalContent = document.createElement('div');
addPhotoModalContent.className = 'modal-content';

// Vue ajout photo cachée
const addPhotoHiddenView = document.createElement('div');
addPhotoHiddenView.className = 'modal-view add-photo-hidden';
const addPhotoTitle = document.createElement('h3');
addPhotoTitle.textContent = 'Ajout photo';
const addPhotoForm = document.createElement('form');
addPhotoForm.id = 'addPhotoForm';

// Formulaire ajout photos
// ... (Ajoutez ici le reste du formulaire)

const closeButton2 = document.createElement('button');
closeButton2.className = 'close-button';
closeButton2.innerHTML = '<i class="fa-solid fa-xmark"></i>';
const backButton = document.createElement('button');
backButton.className = 'back-button';
backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
const separateLine2 = document.createElement('div');
separateLine2.className = 'separate-line ligne';

addPhotoHiddenView.appendChild(addPhotoTitle);
addPhotoHiddenView.appendChild(addPhotoForm);
addPhotoHiddenView.appendChild(closeButton2);
addPhotoHiddenView.appendChild(backButton);
addPhotoHiddenView.appendChild(separateLine2);

addPhotoModalContent.appendChild(addPhotoHiddenView);
addPhotoModal.appendChild(addPhotoModalContent);
document.body.appendChild(addPhotoModal);

// Fonction pour ouvrir la modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal();
    }
}

// Fonction pour fermer la modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
    }
}

// Écouteurs d'événements pour ouvrir/fermer les modals
document.querySelector('.edit').addEventListener('click', (event) => {
  event.preventDefault();
  openModal('modal');

});
document.querySelector('.edition').addEventListener('click', () => {
    openModal('modal');
});
document.querySelector('.close-button').addEventListener('click', () => {
    closeModal('modal');
});
document.querySelector('.back-button').addEventListener('click', () => {
    closeModal('add-photo-modal');
    openModal('modal');
});
document.getElementById('open-add-photo-modal').addEventListener('click', () => {
    openModal('add-photo-modal');
});
document.querySelector('.modal-bis .close-button').addEventListener('click', () => {
    closeModal('add-photo-modal');
});
addPhotoModal.addEventListener('click', (event) => {
    if (event.target === addPhotoModal) {
        closeModal('add-photo-modal');
    }
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
