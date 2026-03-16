async function post_login(data) {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const request = await fetch("https://bocational-wireframe-apy.onrender.com/login-get-user-info", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const request_read = await request.json();
    if (request_read.name) {
        return request_read;
    }
    else {
        return false;
    }
}

const log_button = document.getElementById("log-button");
log_button.addEventListener("click", 
    function () {
        log_in()
    }
);
async function log_in() {
    const username = document.getElementById("log-username").value;
    const password = document.getElementById("log-password").value;

    if (username == "" && password == "") {
        Swal.fire({
            title : "Datos faltantes",
            text : "Verifica que todos los datos esten llenos",
            icon : "warning",
            confirmButtonText: 'Ok'
        });
    }
    else {
        const data = {
            name : username,
            password : password
        }
        const response = await post_login(data);
        if (response) {
            window.location.href = `./test.html?user=${await response.name}&ncontrol=${await response.ncontrol}&test=${await response.test}`;
        }
        else {
            Swal.fire({
                title : "Datos incorrectos",
                text : "El usuario o contraseña son incorrectos intente de nuevo",
                icon : "error",
                confirmButtonText: 'Ok'
            });
        }
    }
}