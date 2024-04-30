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
    /*Fermer la modale*/
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


btn.addEventListener('click', async function(event) {
    event.preventDefault();
    modal.showModal();
  
    /* Récupérer les données des travaux depuis l'API */
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
  
      /* Creer l'image*/
      const image = new Image();
      image.src = objet.imageUrl;
      image.alt = objet.title;
      figure.appendChild(image);
  
     /* Créer l'îcone de corbeille */
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-trash-can');
      deleteIcon.dataset.workId = objet.id; 
      deleteIcon.addEventListener('click', deleteWork);
      figure.appendChild(deleteIcon);
      galleryModal.appendChild(figure);
    });
  }
  
  
// Supprimer un projet dans la modale

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
  
  

  