
const errorEl = document.querySelector('.error');
const nomeInput = document.querySelector('#nome');
const emailInput = document.querySelectorAll('#email');
const senhaInput = document.querySelectorAll('#senha');
const modal = document.querySelector('#modal');

const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];


// Funções

// Validações
function verifyName(userName) {
    const name = userName.trim();

    const pattern = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return pattern.test(name);
};

function verifyEmail(userEmail) {
    const email = userEmail.trim();

    const pattern = /^\w+[.|-]?\w+\@\w+\.\w+(\.\w+)?$/;
    return pattern.test(email);
};

function verifyPassword(password) {
    const senha = password.trim();

    const pattern = /^[\w|\W]{6,20}$/; // Aceita alfanumérico e símbolos
    console.log(pattern.test(senha));
    return pattern.test(senha);
};


function showMessage() {
    const style = errorEl.style;
    style.display = 'block';

    setTimeout(() => {
        style.opacity = 1;
    }, 100);
};

function showHiddenModal() {
    modal.style.display === 'flex' ?  modal.style.display = 'none' : modal.style.display = 'flex';

    setTimeout(() => {
        modal.style.opacity = 1;
    }, 200);
};


async function saveUserToLocalStorage(name, userEmail, password) {

    const userFound = await registeredUsers.find(user => user.email === userEmail);
    // console.log('Localizado: ', userFound);

    if (userFound) {
        alert('Já existe um cadastro com o e-mail informado!');
        return;
    };

    const registerUser = { nome: name, email: userEmail, senha: password };
    localStorage.setItem('users', JSON.stringify([...registeredUsers, registerUser]));
    alert(`Olá, ${name}! Seu cadastro foi realizado com sucesso!`)
};


async function login(userEmail, password) {

    console.log('Lista de usuários cadastrados: ', registeredUsers)

    // find: pega o primeiro registro localizado
    const userFound = await registeredUsers.find(user => user.email === userEmail);

    console.log('Localizado? ', userFound);

    if (userFound) {
        const { senha } = userFound;

        if (senha === password) {
            localStorage.setItem('loggedUser', JSON.stringify(userFound)); // salva o usuário logado
            window.location = `${window.location.origin}/pages/profile.html`;
        } else {
            errorEl.innerText = 'Senha inválida!';
        };

    } else {
        errorEl.innerText = 'Usuário não localizado!';
    };

    showMessage();
};


// Eventos

nomeInput.addEventListener('input', (event) => {
    const input = event.target;
    let validName = verifyName(input.value);

    // Mensagem personalizada de campo obrigatório
    if (validName)
        input.setCustomValidity('');
    else
        input.setCustomValidity('Informe seu nome e sobrenome. Ex.: Fulano Silva');
});


emailInput.forEach(email => {

    email.addEventListener('input', (event) => {
        const input = event.target;

        let validEmail = verifyEmail(input.value);

        // Mensagem personalizada de campo obrigatório
        if (validEmail)
            input.setCustomValidity('');
        else
            input.setCustomValidity('Preencha este campo com um e-mail válido. Ex.: nome@dominio.com');
    });

});

senhaInput.forEach(senha => {
    senha.addEventListener('input', (event) => {
        const input = event.target;
        let validPassword = verifyPassword(input.value);

        // Mensagem personalizada de campo obrigatório
        if (validPassword)
            input.setCustomValidity('');
        else
            input.setCustomValidity('Sua senha deve conter de 6 a 20 caracteres, podendo ter letras, números e caracteres especiais.');
    });
});



document.querySelector('#btn-register').addEventListener('click', showHiddenModal);
document.querySelector('#btn-login').addEventListener('click', showHiddenModal);


// Cadastra usuário
document.querySelector('#form-register').addEventListener('submit', (event) => {
    event.preventDefault();

    saveUserToLocalStorage(nomeInput.value, emailInput[1].value, senhaInput[1].value);

});

// Realiza o login
document.querySelector('#form-login').addEventListener('submit', (event) => {
    event.preventDefault();

    login(emailInput[0].value, senhaInput[0].value);
});
