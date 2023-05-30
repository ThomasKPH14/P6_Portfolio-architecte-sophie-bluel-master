// Variables pour gérer les modales
const modalStack = [];
const modalDiv = document.getElementById('modal');
let contentDiv; // Déclaration de la variable contentDiv

// Fonction pour ouvrir une modal
function openModal(modalContent) {
  modalStack.push(modalContent);
  modalDiv.innerHTML = '';
  modalDiv.appendChild(modalContent);
  modalDiv.classList.add('active');
  document.body.classList.add('modal-open');
}

// Fonction pour fermer une modal
function closeModal() {
  modalStack.pop();
  modalDiv.removeChild(modalDiv.lastChild);
  modalDiv.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// Fonction pour créer la galerie
function createGalleryItem(work, id) {
  const figure = document.createElement('figure');
  const buttonSVG = document.createElement('img');
  buttonSVG.setAttribute('src', './assets/icons/trashh.svg');
  buttonSVG.setAttribute('class', 'trashh');
  const image = document.createElement('img');
  image.src = work.imageUrl;
  image.alt = work.title;
  const caption = document.createElement('figcaption');
  caption.textContent = 'Éditer';
  figure.appendChild(buttonSVG);
  figure.appendChild(image);
  figure.appendChild(caption);
  
  // Ajout de l'ID en tant qu'attribut personnalisé
  figure.setAttribute('data-id', id);

  return figure;
}
// Fonction pour récupérer les travaux depuis le serveur
function fetchWorks() {
  console.log('Fetching works from the server...'); // Ajout d'un log avant la requête fetch
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .catch(error => {
      console.error('Une erreur est survenue lors de la récupération des travaux:', error);
    });
}

// Fonction pour créer la modal d'ajout de photo
function createAddPhotoModal() {
  const modalContentDiv = document.createElement('div');
  modalContentDiv.classList.add('modal-content');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = 'Ajout photo';

  const closeButton = document.createElement('i');
  closeButton.classList.add('fa-solid', 'fa-xmark', 'cross');
  closeButton.addEventListener('click', function () {
    closeModal();
  });
  modalContentDiv.appendChild(closeButton);

  const backButton = document.createElement('button');
  backButton.classList.add('back-button');
  const arrowLeftIcon = document.createElement('img');
  arrowLeftIcon.src = './assets/icons/Arrow_Back.svg';
  arrowLeftIcon.classList.add('arrow-left-icon', 'back-button-arrow');

  backButton.appendChild(arrowLeftIcon);
  backButton.addEventListener('click', function () {
    if (modalStack.length > 1) {
      modalStack.pop();
      modalDiv.removeChild(modalDiv.lastChild);
      const previousModal = modalStack[modalStack.length - 1];
      modalDiv.appendChild(previousModal);
    }
  });

  const form = document.createElement('form');
  form.classList.add('add-photo-form','monform');
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre';
  const titleInput = document.createElement('input');
  titleInput.classList.add('ClasseInput');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie';
  const categoryInput = document.createElement('select');
  categoryInput.classList.add('ClasseSelect');
  categoryInput.setAttribute('name', 'category');
  const separatorDivdeux = document.createElement('div');
  separatorDivdeux.classList.add('separatordeux');
  const submitButton = document.createElement('button');
  submitButton.classList.add('button-submit')
  submitButton.textContent = 'Valider';

  const blueField = document.createElement('div');
  blueField.classList.add('blue-field');

  form.appendChild(blueField);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);

  // Aperçu de l'image
  const imagePreview = document.createElement('img');
  imagePreview.src = './assets/icons/Groupimg.svg';
  imagePreview.classList.add('grpimg');
  form.appendChild(imagePreview);

  const subtitle = document.createElement('p');
  subtitle.textContent = 'jpg, png : 4mo max';
  subtitle.classList.add('formatp');

  // Champ de sélection de fichier
  const fileLabel = document.createElement('label');
  fileLabel.textContent = '+ Ajouter photo';
  fileLabel.setAttribute('for', 'file-input');
  fileLabel.classList.add('add-button-text');
  
  const fileInput = document.createElement('input');
  fileInput.classList.add('add-button');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('name', 'photo');
  fileInput.setAttribute('accept', 'image/*');
  fileInput.required = true;

  //###############################################//       
    

    // Ajout des éléments à la div conteneur
    blueField.appendChild(imagePreview);
    blueField.appendChild(subtitle);
    blueField.appendChild(fileInput);
    blueField.appendChild(fileLabel);

    // Ajout de la div conteneur au formulaire
    

  // Événement d'écoute du changement de l'input file
  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      imagePreview.src = URL.createObjectURL(file);;
      imagePreview.classList.remove('grpimg');
      imagePreview.style.objectFit = 'contain';
      imagePreview.style.width = '100%';
      imagePreview.style.height = '100%';
      fileLabel.style.display = 'none';
      subtitle.style.display = 'none';
      fileInput.style.display = 'none';
    };
    console.log(reader, "")
  
    reader.readAsDataURL(file);
  });

    //###############################################//       

  form.appendChild(fileLabel);
  form.appendChild(fileInput);

  modalContentDiv.appendChild(modalTitle);
  modalContentDiv.appendChild(closeButton);
  modalContentDiv.appendChild(backButton);
  modalContentDiv.appendChild(form);
  modalContentDiv.appendChild(separatorDivdeux);
  modalContentDiv.appendChild(submitButton);

  // Gestionnaire d'événement de soumission du formulaire
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Vérification des champs requis
    if (fileInput.files.length === 0 || titleInput.value.trim() === '' || categoryInput.value === '') {
      // Afficher un message d'erreur ou effectuer une action appropriée lorsque les champs requis ne sont pas remplis
      console.error('Veuillez remplir tous les champs requis');
      return;
    }
  
    const formData = new FormData(form);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4'; 
    const token = localStorage.getItem('token');

    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);

    console.log(fileInput, "");
    console.log(titleInput, "");
    console.log(categoryInput, "");
    

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,  
      headers: {
        'Authorization': `Bearer` + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Photo ajoutée avec succès:', data);
        
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la photo:', error);
      });
  
    closeModal();
  });

  // Récupérer les catégories depuis le serveur
  fetch('http://localhost:5678/api/categories', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryInput.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récup de données des catégories:', error);
    });

  return modalContentDiv;
}


// Gestionnaire d'événement au chargement de la page
window.addEventListener('load', function () {
  document.querySelector('.user-section .edit-icontrois').addEventListener('click', function () {
    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('modal-content');
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Galerie photo';
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark', 'cross');
    closeIcon.addEventListener('click', function () {
      closeModal();
    });

    contentDiv = document.createElement('div'); // Assignation de la variable contentDiv
    contentDiv.id = 'content';
    const separatorDiv = document.createElement('div');
    separatorDiv.classList.add('separator');
    const addPhotosBtn = document.createElement('button');
    addPhotosBtn.classList.add('add-photos-btn');
    addPhotosBtn.textContent = 'Ajouter une photo';
    addPhotosBtn.addEventListener('click', function () {
      const addPhotoModal = createAddPhotoModal();
      modalStack.push(addPhotoModal);
      modalDiv.removeChild(modalDiv.lastChild);
      modalDiv.appendChild(addPhotoModal);
    });

    const deletePhotoBtn = document.createElement('button');
    deletePhotoBtn.classList.add('delete-photo-btn');
    deletePhotoBtn.textContent = 'Supprimer la galerie';

    modalContentDiv.appendChild(modalTitle);
    modalContentDiv.appendChild(closeIcon);
    modalContentDiv.appendChild(contentDiv);
    modalContentDiv.appendChild(separatorDiv);
    modalContentDiv.appendChild(addPhotosBtn);
    modalContentDiv.appendChild(deletePhotoBtn);

    openModal(modalContentDiv);

    // Récupérer les données des travaux et générer les éléments d'image
    fetchWorks().then(worksData => {
      console.log('Works fetched successfully:', worksData);
      const gallery = document.createElement('div');
      gallery.classList.add('gallery');
    
      worksData.forEach(work => {
        const figure = createGalleryItem(work);
        gallery.appendChild(figure);
      });
    
      const firstFigure = gallery.querySelector('figure');
      if (firstFigure) {
        const moveSVG = document.createElement('img');
        moveSVG.setAttribute('src', './assets/icons/move.svg');
        moveSVG.setAttribute('class', 'move');
        firstFigure.insertBefore(moveSVG, firstFigure.firstChild);
      }
      contentDiv.appendChild(gallery);
    });
  });

  // Gestionnaire d'événement pour le bouton de flèche
  const backButton = document.querySelector('.back-button.back-button-arrow');
  if (backButton) {
    backButton.addEventListener('click', function () {
      if (modalStack.length > 1) {
        modalStack.pop();
        modalDiv.removeChild(modalDiv.lastChild);
        const previousModal = modalStack[modalStack.length - 1];
        modalDiv.appendChild(previousModal);
      }
    });
  }
});
