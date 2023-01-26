function init() {

    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:4000/admin/izdavac/getAll', {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allIzdavacs = document.getElementById('getAllIzdavac');

            data.forEach( el => {
                allIzdavacs.innerHTML += `<li>izdavacId: ${el._id}, ime: ${el.ime}, 
                    pib: ${el.pib}, osnivanje: ${el.osnivanje}</li>`;
            });
        });

    document.getElementById('addIzdavac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ime: document.getElementById('ime').value,
            pib: document.getElementById('pib').value,
            osnivanje: document.getElementById('osnivanje').value
           
        };

        fetch('http://localhost:4000/admin/izdavac/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),

        })

            .then( res => res.json() )
            .then( el => {

                // document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'izdavac.html';
            });
    });

    document.getElementById('deleteIzdavac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            izdavacId: document.getElementById('izdavacId').value
        };

        fetch('http://localhost:4000/admin/izdavac/delete', { //+ ID.value, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })
            .then( res => res.json() )
            .then( el => {
                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'izdavac.html';
            });
    });


    document.getElementById('updateIzdavac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ime: document.getElementById('ime').value,
            pib: document.getElementById('pib').value,
            osnivanje: document.getElementById('osnivanje').value
        };

        fetch('http://localhost:4000/admin/izdavac/update', { //+id.value, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })

            .then( res => res.json() )
            .then( el => {

                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'izdavac.html';
            });
    });


    document.getElementById('getIzdavac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            izdavacId: document.getElementById('izdavacId').value
        };

        fetch('http://localhost:4000/admin/izdavac/getOne', {
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
