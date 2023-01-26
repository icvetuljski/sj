function init() {

    document.getElementById('user').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/user/user.html';
    });

    document.getElementById('knjige').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/knjige/knjige.html';
    });

    document.getElementById('izdavac').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/izdavac/izdavac.html';
    });

    document.getElementById('autor').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/autor/autor.html';
    });

    document.getElementById('audioKnjige').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/audioKnjige/audioKnjige.html';
    });

    document.getElementById('ploce').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            window.location.href = '/login.html';
            return;
        }
        window.location.href = '/pages/ploce/ploce.html';
    });
    document.getElementById('login').addEventListener('click', e => {
        window.location.href = '/static/pages/login.html';
    });

    document.getElementById('logout').addEventListener('click', e => {
        if (!localStorage.getItem("token")) {
            alert("You are not logged in");
            return;
        }
        window.location.href = 'login.html';
    });
}