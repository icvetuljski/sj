function init() {

    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:4000/admin/autor/getAll', {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allAutors = document.getElementById('getAllAutors');

            data.forEach( el => {
                allAutors.innerHTML += `<li>autorId: ${el._id}, ime: ${el.ime}, 
                    prezime: ${el.prezime}, godiste: ${el.godiste}, brKnjiga: ${el.brKnjiga},
                    brNagrada: ${el.brNagrada}</li>`;
            });
        });

    document.getElementById('addAutor').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ime: document.getElementById('ime').value,
            prezime: document.getElementById('prezime').value,
            godiste: document.getElementById('godiste').value,
            brKnjiga: document.getElementById('brKnjiga').value,
            brNagrada: document.getElementById('brNagrada').value
        };

        fetch('http://localhost:4000/admin/autor/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),

        })

            .then( res => res.json() )
            .then( el => {

                // document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'autor.html';
            });
    });

    document.getElementById('deleteAutor').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            autorId: document.getElementById('autorId').value
        };

        fetch('http://localhost:4000/admin/autor/delete', { //+ ID.value, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })
            .then( res => res.json() )
            .then( el => {
                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'autor.html';
            });
    });


    document.getElementById('updateAutor').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ime: document.getElementById('ime').value,
            prezime: document.getElementById('prezime').value,
            godiste: document.getElementById('godiste').value,
            brKnjiga: document.getElementById('brKnjiga').value,
            brNagrada: document.getElementById('brNagrada').value
        };

        fetch('http://localhost:4000/admin/autor/update', { //+id.value, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })

            .then( res => res.json() )
            .then( el => {

                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'autor.html';
            });
    });


    document.getElementById('getAutor').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            autornId: document.getElementById('autorId').value
        };

        fetch('http://localhost:4000/admin/autor/getOne', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}

        })

            .then( res => res.json() )
            .then( el => {

                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'user.html';
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        //document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
