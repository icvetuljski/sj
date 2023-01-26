function init() {

    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:4000/admin/audioKnjige/getAll', {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const allKnjiges = document.getElementById('getAllKnjige');

            data.forEach( el => {
                allKnjiges.innerHTML += `<li>audioKnjigeId: ${el._id}, naslov: ${el.naslov}, 
                    autor: ${el.autor}, GodinaIzdavanja: ${el.GodinaIzdavanja}, izdavac: ${el.izdavac},trajanje: ${el.trajanje}
                    ,cena: ${el.cena}</li>`;
            });
        });

    document.getElementById('addKnjige').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            naslov: document.getElementById('naslov').value,
            autor: document.getElementById('autor').value,
            GodinaIzdavanja: document.getElementById('GodinaIzdavanja').value,
            izdavac: document.getElementById('izdavac').value,
            trajanje: document.getElementById('trajanje').value,
            cena: document.getElementById('cena').value
        };

        fetch('http://localhost:4000/admin/audioKnjige/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),

        })

            .then( res => res.json() )
            .then( el => {

                // document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'audioKnjige.html';
            });
    });

    document.getElementById('deleteKnjige').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            audioKnjigeId: document.getElementById('audioKnjigeId').value
        };

        fetch('http://localhost:4000/admin/audioKnjige/delete', { //+ ID.value, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })
            .then( res => res.json() )
            .then( el => {
                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'audioKnjige.html';
            });
    });


    document.getElementById('updateKnjige').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            naslov: document.getElementById('naslov').value,
            autor: document.getElementById('autor').value,
            GodinaIzdavanja: document.getElementById('GodinaIzdavanja').value,
            izdavac: document.getElementById('izdavac').value,
            trajanje: document.getElementById('trajanje').value,
            cena: document.getElementById('cena').value
        };

        fetch('http://localhost:4000/admin/audioKnjige/update', { //+id.value, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}`},
            body: JSON.stringify(data),
        })

            .then( res => res.json() )
            .then( el => {

                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'audioKnjige.html';
            });
    });


    document.getElementById('getKnjige').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            audioKnjigeId: document.getElementById('audioKnjigeId').value
        };

        fetch('http://localhost:4000/admin/audioKnjige/getOne', {
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
