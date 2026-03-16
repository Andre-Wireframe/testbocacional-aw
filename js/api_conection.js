async function get_tests(superkey) {
    const request = await fetch(`http://localhost:3030/get-all-test/${superkey}`);
    if (request.status == 201) {
        return request.body;
    }
    else {
        return false;
    }
}

async function post_test(user, test) {
    const request = await fetch(`http://localhost:3030/post-test/${user}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(test)
    });
    if (request.status == 201) {
        return true;
    }
    else {
        return false;
    }
}

async function post_singin(data) {
    const request = await fetch("http://localhost:3030/sing-in", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (request.status == 201) {
        if (request.body == 'existent') {
            return "existent"
        }
        else {
            return request.body;
        }
    }
    else {
        return false;
    }
}

async function post_login(data) {
    const request = await fetch("http://localhost:3030/login-get-user-info", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (request.status == 201) {
        return request.body;
    }
}