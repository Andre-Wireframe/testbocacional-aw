async function get_tests(superkey) {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await fetch("https://bocational-wireframe-apy.onrender.com/sing-in", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:{superkey:superkey}
    });
    if (response.status == 201) {
        return response.json();
    }
    else {
        return false;
    }
}

const button = document.getElementById("log-button");
button.addEventListener("click", 
    function () {
        login();
    }
)

async function login() {
    const user = document.getElementById("log-username").value;
    const superkey = document.getElementById("log-password").value;
    const data = await get_tests(superkey);
    if (data) {
        //Poner los registros en esta misma pagina, enviar los datos o la superkey por url no es opcion.
    }
    else {
        //Crear una alerta
    }
}