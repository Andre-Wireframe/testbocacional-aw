async function get_tests(superkey) {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: true,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await fetch("https://bocational-wireframe-apy.onrender.com/get-tests", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({superkey:superkey})
    });
    const read = response.json();
    if (read.errorcode === "usuario no identificado") {
        return false;
    }
    else {
        Swal.fire({
            title: 'Datos cargados',
            text: "Los datos han sido datos cargados con éxito",
            icon: "success",
            confirmButtonText: "Ok"
        });
        return read;
    }
}

function create_grafic(data1) {
    const ctx = document.getElementById("grafic");
    ctx.width = window.innerWidth - 100;
    ctx.height = window.innerHeight - 300;

    const data = {
        labels: ['Ingeniería', 'Salud', 'Sociedad', 'Economía', 'Arte', 'Educación', 'Humanidades', 'Ambiente'],
        datasets: [{
        label: 'Resultados generales de alumnos',
        data: data1,
        backgroundColor: 'rgba(140, 255, 0, 0.116)',
        borderColor: 'rgb(127, 255, 212)',
        borderWidth: 1
    }]
    };

    const config = {
        type: 'bar', 
        data: data,
        options: {
            scales: {y: {beginAtZero: true}}
        },
    };

    const grafica = new Chart(ctx, config);
}

function get_max(array) {
    let max = [array[0]];
    let index = [];
    for (let i = 0; i < 8; i++) {
        if (array[i] > max[0]) {
            max = [array[i]];
            index = [i];
        }
        else if (array[i] == max[0]) {
            max.push(array[i]);
            index.push(i);
        }
    }
    return index;
}

function learn_data(data) {
    let array = [0, 0, 0, 0, 0, 0, 0, 0]
    data.forEach(v => {
        let index = get_max(v.test);
        index.forEach(v => {
            array[v] += 1;
        });
    });
    return array;
}

function add_table(data) {
    const table = document.getElementById("table");
    data.forEach(v => {
        const file = document.createElement("tr");
        const name = document.createElement("td");
        name.textContent = v.name;
        const ncontrol = document.createElement("td");
        ncontrol.textContent = v.ncontrol;
        const array = document.createElement("td");
        array.textContent = v.test;
        file.appendChild(name);
        file.appendChild(ncontrol);
        file.appendChild(array);
        table.appendChild(file);
    });
}

const button = document.getElementById("log-button");
button.addEventListener("click", 
    async function () {
        await login();
    }
);
async function login() {
    const user = document.getElementById("log-username").value;
    const superkey = document.getElementById("log-password").value;
    const data = await get_tests(superkey);
    const error = data.errorcode;
    if (!error) {
        const div = document.getElementById("registers");
        div.style.display = "block";

        const read_data = learn_data(data);
        create_grafic(read_data);
        add_table(data);
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