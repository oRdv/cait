'use strict'
const btnLogin = document.getElementById('login');

async function loginValidation() {
   
    const inputEmail = document.getElementById('email').value;
    const inputPassword = document.getElementById('senha').value;

    let userStatus = false; 

    const getUsers = async () => {
        const url = 'http://back-login.vercel.app/usuarios';
        try {
            const response = await fetch(url);
            const usuarios = await response.json();
            return usuarios;
        } catch (error) {
            alert('Houve um problema com a solicitação de login.');
            return null;
        }
    };

    const usuarios = await getUsers();

    usuarios.forEach(function (user) {
        if(user.email === inputEmail && user.senha === inputPassword) {
            userStatus = true;
            localStorage.setItem('userId', user.id)
            window.location.href = './pages/home.html';
            return;
        } 
    });

    if (!userStatus) {
        alert('Credenciais inválidas. Tente novamente.');
    }
}

btnLogin.addEventListener('click', loginValidation);