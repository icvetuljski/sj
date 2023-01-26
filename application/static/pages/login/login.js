function init() {

    document.getElementById('loginBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                localStorage.setItem("token", JSON.stringify(data))
                if (!(typeof data === "string")){
                    alert(JSON.stringify(data.message));
                    return;
                }
                //document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = '/';
            });
    });
}