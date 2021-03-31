const fetch = require('node-fetch');

exports.domain = "http://localhost:3030";


exports.post = async (url, body) => {
    var response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return await response.json();
}

exports.put = async (url, body) => {
    var response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return await response.json();
}

exports.get = async (url, body) => {
    var response = await fetch(url);
    return await response.json();
}

exports.delete = async (url, body) => {
    await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}