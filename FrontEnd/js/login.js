// Fonction pour valider l'adresse e-mail avec une expression régulière
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Événement de remise de formulaire + blocage par défaut
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const email = emailInput.value;
    const password = passwordInput.value;

    // Vérification de l'adresse e-mail
    if (!validateEmail(email)) {
        alert("Erreur dans l’identifiant ou le mot de passe");
        return;
    }

    // Appel à l'API de connexion
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    // Vérification de la réponse de l'API
    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Stockage du token dans le local storage
        localStorage.setItem('token', token);

        // Redirection vers la page d'accueil
        window.location.href = './index.html';
    } else {
        alert("Erreur dans l’identifiant ou le mot de passe");
    }
});

// Modifier la page index.html si l'utilisateur est connecté
document.addEventListener('DOMContentLoaded', () => {
    const userSection = document.querySelector('.user-section');

    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (token) {
        userSection.style.display = 'block';

        // Création des éléments HTML de la section utilisateur
        // Ajouter la classe "connected" à l'élément
        const backbeiElement = document.querySelector('.backbei');
        backbeiElement.classList.add('connected');

        const containerLog = document.createElement('div');
        containerLog.className = 'containerlog';

        const logPlus = document.createElement('span');
        logPlus.className = 'logplus';

        const penIcon = document.createElement('i');
        penIcon.className = 'fa-regular fa-pen-to-square';

        const modeEditionText = document.createElement('p');
        modeEditionText.textContent = 'Mode édition';

        const buttonLog = document.createElement('button');
        buttonLog.className = 'buttonlog';
        buttonLog.textContent = 'Publier les changements';

        const editIconUn = document.createElement('span');
        editIconUn.className = 'edit-iconun';

        const editIconDeux = document.createElement('span');
        editIconDeux.className = 'edit-icondeux';

        const editIconTrois = document.createElement('span');
        editIconTrois.className = 'edit-icontrois';

        const editImage = document.createElement('img');
        editImage.className = 'edit';
        editImage.src = './assets/icons/edit.svg';
        editImage.alt = 'Modifier';

        const modifierText = document.createElement('span');
        modifierText.textContent = 'Modifier';

        // Construction de la structure de la section utilisateur
        logPlus.appendChild(penIcon);
        logPlus.appendChild(modeEditionText);
        logPlus.appendChild(buttonLog);

        editIconUn.appendChild(editImage.cloneNode(true));
        editIconUn.appendChild(modifierText.cloneNode(true));

        editIconDeux.appendChild(editImage.cloneNode(true));
        editIconDeux.appendChild(modifierText.cloneNode(true));

        editIconTrois.appendChild(editImage.cloneNode(true));
        editIconTrois.appendChild(modifierText.cloneNode(true));

        containerLog.appendChild(logPlus);

        userSection.appendChild(containerLog);
        userSection.appendChild(editIconUn);
        userSection.appendChild(editIconDeux);
        userSection.appendChild(editIconTrois);

        // Ajout de la section utilisateur à la page
        const mainContent = document.querySelector('main');
        mainContent.prepend(userSection);
    } else {
        userSection.style.display = 'none';
    }

    // Déconnexion de l'utilisateur lors de la fermeture du navigateur
    window.addEventListener('beforeunload', (event) => {
        // Vérifier si l'actualisation est due à l'appui sur F5
        if ((event.clientY < 0) || (event.clientX < 0)) {
            // Supprimer le token et l'expiration du local storage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
        }
    });



});

