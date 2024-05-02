///////////////OUVERTURE DE LA MODALE //////////////

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
   ///////////////FERMER LA MODALE//////////////
    var closeBtn = document.querySelector('.close-button');
    closeBtn.addEventListener('click', function() {
      modal.close();
    });


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
  
  ///////////////AJOUTER CHAQUE IMAGE DE LA GALERIE A LA MODALE//////////////
    data.forEach(objet => {
      const figure = document.createElement('figure');
      figure.classList.add('gallery-item');
  
      /* Creer l'image*/
      const image = new Image();
      image.src = objet.imageUrl;
      image.alt = objet.title;
      figure.appendChild(image);
  
     ///////////////CREER L'ICONE DE LA CORBEILLE//////////////
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-trash-can');
      deleteIcon.dataset.workId = objet.id; 
      deleteIcon.addEventListener('click', deleteWork);
      figure.appendChild(deleteIcon);
      galleryModal.appendChild(figure);
    });
  }
  
  
///////////////SUPPRIMER LES PROJETS DE LA MODALE//////////////

  function deleteWork(event) {
    const workId = event.target.dataset.workId;
    
    
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      
      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du projet.');
        }
        
        if (response.status !== 204) {
          return response.json();
        }
      })
      .then(() => {
        
        fetchWorksData();
      })
      .catch(error => {
        console.error('Error deleting work:', error);
      });
    }
  }
  
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
  
  // Appeler cette fonction pour afficher la galerie initiale
  fetchWorksData();
  
  
///////////////CLIQUER SUR LE BOUTON 'AJOUTER UNE PHOTO'//////////////
  const openAddPhotoModalButton = document.getElementById("open-add-photo-modal");

  // Récupération de la modale contenant le formulaire d'ajout de photo
  const addPhotoModal = document.getElementById("add-photo-modal");
  
  // Ajout d'un gestionnaire d'événements pour l'événement click sur le bouton
  openAddPhotoModalButton.addEventListener("click", function() {
    // Ouverture de la modale contenant le formulaire
    addPhotoModal.showModal();
  });


  const closeButton = document.querySelector(".modal-bis .close-button");
closeButton.addEventListener("click", function() {
  // Fermer la modale
  addPhotoModal.close();
});

// fermer la modale lorsque l'utilisateur clique en dehors de la modale
addPhotoModal.addEventListener("click", function(event) {
  // Vérifier si l'événement provient de l'arrière-plan de la modale (en dehors de son contenu)
  if (event.target === addPhotoModal) {
    // Fermer la modale
    addPhotoModal.close();
  }
});


// Récupération des éléments du formulaire et du bouton "Valider"
const photoTitleInput = document.getElementById("photoTitle");
const photoCategorySelect = document.getElementById("photoCategory");
const addButton = document.querySelector(".valide");

// Fonction pour vérifier si tous les champs du formulaire sont remplis
function checkFields() {
    const title = photoTitleInput.value.trim();
    const category = photoCategorySelect.value;

    return title !== "" && category !== "";
}

// Mettre à jour le style du bouton en fonction des champs remplis ou non
function updateButtonState() {
    if (checkFields()) {
        addButton.removeAttribute("disabled"); // Activer le bouton
    } else {
        addButton.setAttribute("disabled", "disabled"); // Désactiver le bouton
    }
}

// Écouteurs d'événements pour les changements dans les champs du formulaire
photoTitleInput.addEventListener("input", updateButtonState);
photoCategorySelect.addEventListener("change", updateButtonState);

// Appelez updateButtonState une fois pour initialiser l'état du bouton au chargement de la page
updateButtonState();

///////////////PREVISUALISATION DE L'IMAGE//////////////

const inputImage = document.getElementById("image-input");
const labelImage = document.getElementById("modale-image");
const pImage = document.querySelector(".form-modale p");
const iconeImage = document.getElementById("icon-modale");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

//STYLE POUR POSITIONNER L'IMAGE DANS LE CADRE //
  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.position = "absolute"; 
  imgPreview.style.top = "50%"; 
  imgPreview.style.left = "50%"; 
  imgPreview.style.transform = "translate(-50%, -50%)"; 
  imgPreview.style.maxHeight = "100%"; 
  imgPreview.style.maxWidth = "100%"; 
  //MASQUER LES ELEMENTS INUTILES//
  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iconeImage.style.display = "none";
  document.querySelector(".form-modale").appendChild(imgPreview);
});

const formModale = document.querySelector(".form-modale");
formModale.style.position = "relative"; 

 //Fonction pour envoyer le formulaire
document.getElementById('addPhotoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Récupération des valeurs du formulaire
  const title = document.getElementById('photoTitle').value;
  const category = document.getElementById('photoCategory').value;
  const image = document.getElementById('image-input').files[0];

  // Vérification de la taille de l'image
  if (image && image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }

  // Création de l'objet FormData et ajout des données
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  // Envoi des données à l'API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Problème de réponse de l\'API');
    }
    return response.json();
  }) 
  .then(work => {
    alert('La photo a été ajoutée avec succès.');
    // Ajouter ici le code pour mettre à jour la galerie et la modale
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
    alert('Une erreur est survenue lors de l\'ajout de la photo.');
  });
});

// Code pour récupérer et afficher les catégories dans le formulaire
fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return response.json();
    })
    .then((data) => {
      const categories = data.map((category) => ({
        id: category.id,
        name: category.name,
      }));

      const selectCategory = document.getElementById("photoCategory");
      // Créer une option "Tous" et l'ajouter au début du sélecteur
      const allOption = document.createElement("option");
      allOption.value = ""; // Vous pouvez attribuer une valeur spécifique si nécessaire
      allOption.innerText = "Tous";
      selectCategory.appendChild(allOption);

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        selectCategory.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories :", error);
      // Gérer l'erreur (afficher un message à l'utilisateur, par exemple)
    });
/*
    document.addEventListener("DOMContentLoaded", function() {
      const addButton = document.querySelector(".valide");
    
      async function addProject() {
        try {
          // Votre code pour envoyer les données du formulaire à l'API
          const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            // Ajoutez ici les options de la requête, comme le corps du formulaire
          });
          
          if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du projet");
          }
          
          // Réinitialiser les champs après l'ajout du projet
          const titleInput = document.getElementById("photoTitle");
          const categorySelect = document.getElementById("photoCategory");
          const imageInput = document.getElementById("image-input");
          titleInput.value = "";
          categorySelect.value = "";
          imageInput.value = "";
    
          // Afficher une alerte pour indiquer que le projet a été ajouté avec succès
          alert("Projet ajouté avec succès !");
        } catch (error) {
          console.error("Erreur lors de l'ajout du projet:", error);
          alert("Une erreur est survenue lors de l'ajout du projet. Veuillez réessayer.");
        }
      }
    
      // Attacher un écouteur d'événement pour le clic sur le bouton "Valider"
      addButton.addEventListener("click", addProject);
    });*/
    