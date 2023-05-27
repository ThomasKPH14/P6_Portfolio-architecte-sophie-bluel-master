// Variables pour gérer les modales
const modalStack = [];
const modalDiv = document.getElementById('modal');

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
  if (modalStack.length === 0) {
    modalDiv.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// Fonction pour créer la galerie
function createGalleryItem(work) {
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
  return figure;
}

// Fonction pour créer la modal d'ajout de photo
function createAddPhotoModal() {
  const modalContentDiv = document.createElement('div');
  modalContentDiv.classList.add('modal-content');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = 'Ajout photo';
  const backButton = document.createElement('button');
  backButton.classList.add('back-button');
  const arrowLeftIcon = document.createElement('img');
  arrowLeftIcon.src = './assets/icons/Arrow_Back.svg';
  arrowLeftIcon.classList.add('arrow-left-icon', 'back-button-arrow');

  backButton.appendChild(arrowLeftIcon);
  backButton.addEventListener('click', function () {
    closeModal();
  });

  const blueField = document.createElement('div');
  blueField.classList.add('blue-field');
  const imgspot = document.createElement('img');
  imgspot.src = './assets/icons/Groupimg.svg';
  imgspot.classList.add('grpimg');
  const addButton = document.createElement('button');
  addButton.classList.add('add-button');
  addButton.innerHTML = '<i class="fa-solid fa-plus"></i> Ajouter photo';
  const subtitle = document.createElement('p');
  subtitle.textContent = 'jpg, png : 4mo max';
  subtitle.classList.add('formatp');
  const form = document.createElement('form');
  form.classList.add('monform');
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre';
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.classList.add('ClasseInput'); 
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie';
  const categoryInput = document.createElement('select');
  categoryInput.classList.add('ClasseSelect');
  const separatorDivdeux = document.createElement('div');
  separatorDivdeux.classList.add('separatordeux');
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Valider';
  
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);
  modalContentDiv.appendChild(modalTitle);
  modalContentDiv.appendChild(backButton);
  modalContentDiv.appendChild(blueField);
  modalContentDiv.appendChild(addButton);
  modalContentDiv.appendChild(subtitle);
  modalContentDiv.appendChild(form);
  modalContentDiv.appendChild(separatorDivdeux);
  blueField.appendChild(imgspot);

  addButton.addEventListener('click', function () {
    // Traitez l'ajout de la photo ici
  });

  return modalContentDiv;
}

// Fonction pour récupérer les travaux depuis le serveur
function fetchWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .catch(error => {
      console.error('Une erreur est survenue lors de la récupération des travaux:', error);
    });
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

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    const separatorDiv = document.createElement('div');
    separatorDiv.classList.add('separator');
    const addPhotosBtn = document.createElement('button');
    addPhotosBtn.classList.add('add-photos-btn');
    addPhotosBtn.textContent = 'Ajouter une photo';
    addPhotosBtn.addEventListener('click', function () {
      const addPhotoModal = createAddPhotoModal();
      openModal(addPhotoModal);
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

  document.querySelector('.user-section .edit-icondeux').addEventListener('click', function () {
    // Proto pour la suite des modales p
  });

  document.querySelector('.user-section .edit-iconun').addEventListener('click', function () {
    // Proto pour la suite des modales photos profil
  });
});
