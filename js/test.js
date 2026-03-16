async function post_test(user, test) {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const request = await fetch(`https://bocational-wireframe-apy.onrender.com/post-test/${user}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(test)
    });
    if (await request.text()) {
        return true;
    }
    else {
        return false;
    }
}

const uri = window.location.search;
const uriquest = new URLSearchParams(uri);

const user = uriquest.get("user");
const ncontrol = uriquest.get("ncontrol");
const test = uriquest.get("test");

const link = document.getElementById("link");
link.addEventListener("click", 
    function () {
        window.location.href = `./test_result.html?user=${user}&ncontrol=${ncontrol}&test=${test}`;
    }
);

const send = document.getElementById("send");
send.addEventListener("click",
    function () {
        send_test()
    }
);
async function send_test() {
    let test = []

    let math = 0;
    let salud = 0;
    let social = 0;
    let econ = 0;
    let arte = 0;
    let educ = 0;
    let huma = 0;
    let ambi = 0;
    try {
        for (let i = 1; i < 7; i++) {
            math += parseInt(document.querySelector(`input[name='${i}']:checked`).value);
        }
        test[0] = math;
        
        for (let i = 7; i < 13; i++) {
            salud += parseInt(document.querySelector(`input[name='${i}']:checked`).value);
        }
        test[1] = salud;

        for (let i = 13; i < 19; i++) {
            social += parseInt(document.querySelector(`input[name='${i}']:checked`).value);
        }
        test[2] = social;

        for (let i = 19; i < 25; i++) {
            econ += parseInt(document.querySelector(`input[name="${i}"]:checked`).value);
        }
        test[3] = econ;

        for (let i = 25; i < 31; i++) {
            arte += parseInt(document.querySelector(`input[name="${i}"]:checked`).value);
        }
        test[4] = arte;

        for (let i = 31; i < 37; i++) {
            educ += parseInt(document.querySelector(`input[name="${i}"]:checked`).value);
        }
        test[5] = educ;

        for (let i = 37; i < 43; i++) {
            huma += parseInt(document.querySelector(`input[name="${i}"]:checked`).value);
        }
        test[6] = huma;

        for (let i = 43; i < 49; i++) {
            ambi += parseInt(document.querySelector(`input[name="${i}"]:checked`).value);
        }
        test[7] = ambi;

        try {
            const response = await post_test(user, test);
            if (await response) {
                window.location.href = `./test_result.html?user=${user}&ncontrol=${ncontrol}&test=${test}`;
            }
        }
        catch {
            Swal.fire({
            title : "Error de envio",
            text : "A ocurrido un error interno en el servidor por favor intente de nuevo mas tarde",
            icon : "error",
            confirmButtonText: 'Ok'
        });
        }
    }
    catch {
        Swal.fire({
            title : "Preguntas sin contestar",
            text : "Por favor contesta todas las preguntas para continuar",
            icon : "error",
            confirmButtonText: 'Ok'
        });
    }
}