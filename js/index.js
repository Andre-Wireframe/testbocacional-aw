function show_vocations(id) {
    const ul = document.getElementById(id);
    console.log(ul);
    if (ul.style.display === "block") {
        ul.style.display = "none";
    }
    else {
        ul.style.display = "block";
    }
}