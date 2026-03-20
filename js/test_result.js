const uri = window.location.search;
const uriquest = new URLSearchParams(uri);

const user = uriquest.get("user");
const ncontrol = uriquest.get("ncontrol");
const test = uriquest.get("test");

const ctx = document.getElementById('results-g');
ctx.width = window.innerWidth - 100;
ctx.height = window.innerHeight - 300;

const data = {
    labels: ['Ingeniería', 'Salud', 'Sociedad', 'Economía', 'Arte', 'Educación', 'Humanidades', 'Ambiente'],
    datasets: [{
    label: 'Resultados del test',
    data: test.split(","),
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

new Chart(ctx, config);

function get_max() {
    let array = [];
    const test_split = test.split(",");
    for (let i = 0; i < 8; i++) {
        array.push(parseInt(test_split[i]));
    }
    
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

const index = get_max();
console.log(index);

index.forEach((c,v) => {
    const zone = document.getElementById(`z${c+1}`);
    zone.style.display = "block";
});