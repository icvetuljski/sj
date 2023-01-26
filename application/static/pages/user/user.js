function init() {

    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:5000/admin/getAll', {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allUsers = document.getElementById('getAllUsers');

            data.forEach( el => {
                allUsers.innerHTML += `<li>ID: ${el._id}, Full Name: ${el.fullName}, 
                username: ${el.username}, User Type: ${el.userType}, Banned: ${el.isBanned}</li>`;
            });
        });


    document.getElementById('addUser').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            fullName: document.getElementById('fullName').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            userType: document.getElementById('userType').value,
            isBanned: document.getElementById('isBanned').value
        };

        fetch('http://localhost:5000/admin/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),

        })

            .then( res => res.json() )
            .then( el => {

                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'user.html';
            });
    });

    document.getElementById('deleteUser').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            userId: document.getElementById('userId').value
        };

        fetch('http://localhost:5000/admin/user/delete', { //+ ID.value, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })
            .then( res => res.json() )
            .then( el => {
                window.location.href = 'user.html';
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        //document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}