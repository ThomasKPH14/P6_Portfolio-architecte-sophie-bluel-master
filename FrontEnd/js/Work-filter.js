// Se référer aux les éléments HTML ( dont la class gallery et categories )
const gallery = document.querySelector('.gallery');
const categoriesContainer = document.querySelector('.categories');

// Utilisez fetch pour appeler l'API des catégories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categoriesData => {
    // Générez les boutons de catégorie
    generateCategoryButtons(categoriesData);

    // Utilisez fetch pour appeler l'API des travaux
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(worksData => {
        // Affichez tous les travaux
        displayWorks(worksData);

        // Ajoutez un gestionnaire d'événement
        const categoryButtons = document.querySelectorAll('.category-button');
        categoryButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Récupérez l'ID 
            const categoryId = button.dataset.categoryId;

            // Filtrer les travaux
            if (categoryId === 'all') {
              // Afficher tous les travaux
              displayWorks(worksData);
            } else {
              const filteredWorks = worksData.filter(work => work.categoryId == categoryId);
              // Afficher les travaux filtrés
              displayWorks(filteredWorks);
            }
          });
        });
      })
      .catch(error => {
        console.error('Une erreur est survenue lors de la récupération des travaux:', error);
      });
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des catégories:', error);
  });

// Fonction pour afficher les travaux
function displayWorks(works) {
  gallery.innerHTML = '';

  works.forEach(work => {
    // Création d'un élément de figure
    const figure = document.createElement('figure');

    // Création d'un élément d'image
    const image = document.createElement('img');
    image.src = work.imageUrl;
    image.alt = work.title;

    // Création d'un élément de légende pour le titre
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;

    // Ajoutez l'image et la légende à la figure
    figure.appendChild(image);
    figure.appendChild(caption);

    // Ajoutez la figure à la galerie
    gallery.appendChild(figure);
  });
}

// Fonction pour générer les boutons
function generateCategoryButtons(categories) {
  // Création du bouton "Tous"
  const allButton = document.createElement('button');
  allButton.classList.add('category-button');
  allButton.textContent = 'Tous';
  allButton.dataset.categoryId = 'all';

  // Ajoutez le bouton "Tous"
  categoriesContainer.appendChild(allButton);

  // Création des autres boutons
  categories.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('category-button');
    button.textContent = category.name;
    button.dataset.categoryId = category.id;



    // Ajoutez le bouton
    categoriesContainer.appendChild(button);
  });
}
