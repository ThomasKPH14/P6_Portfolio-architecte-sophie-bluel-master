// Fonction pour valider l'adresse e-mail + Regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Événement de remise de formulaire + block par défault                                           
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
