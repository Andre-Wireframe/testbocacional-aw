async function post_singin(data) {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const request = await fetch("https://bocational-wireframe-apy.onrender.com/sing-in", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (request.status == 201) {
        const request_read = request.json()
        if (await request_read.name === "1") {
            return "1"
        }
        else {
            return await request_read;
        }
    }
    else {
        return false;
    }
}

const sing_button = document.getElementById("sing-button");
sing_button.addEventListener("click", 
    function () {
        sing_in()
    }
);

async function sing_in() {
    const username1 = document.getElementById("sing-username").value;
    const password = document.getElementById("sing-password").value;
    const ncontrol = document.getElementById("ncontrol").value;

    if (password.length > 7 && username1 != "" && ncontrol != 0) {
        const username = username1.replace(" ", "")
        const data = {
            name : username,
            password : password,
            ncontrol : ncontrol
        }
        const response = await post_singin(data);
        const check = await response.name;
        if (await response) {
            if (await check === "1") {
                Swal.fire({
                    title : "Usuario ya existente",
                    text : "El usuario imgresado ya se encuantra registrado, intente con otro",
                    icon : "warning",
                    confirmButtonText: 'Ok'
                });
            }
            else {
                window.location.href = `./test.html?user=${await response.name}&ncontrol=${await response.ncontrol}&test=${await response.test}`;
            }
        }
        else {
            Swal.fire({
                title : "Error",
                text : "Error interno en la base de datos, intente de nuevo",
                icon : "error",
                confirmButtonText: 'Ok'
            });
        }
    }
    else {
        Swal.fire({
            title : "Contraseña insegura o datos faltantes",
            text : "Usa una contraseña de al menos 8 caracteres y verifica que todos los datos esten llenos",
            icon : "warning",
            confirmButtonText: 'Ok'
        });
    }
}