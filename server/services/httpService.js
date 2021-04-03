const fetch = require('node-fetch');

exports.domain = "http://localhost:3030";


exports.post = async (url, body, token) => {
    var headers = {
        "Content-type": "application/json; charset=UTF-8"
    }
    if (token) {
        headers.authorization = token
    }
    var response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
    });
    try {
        return await response.json();
    } catch (e){
        console.log(e);
        return null;
    }
}

exports.put = async (url, body, token) => {
    var headers = {
        "Content-type": "application/json; charset=UTF-8"
    }
    if (token) {
        headers.authorization = token
    }
    var response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: headers
    });
    try {
        return await response.json();
    } catch (e){
        console.log(e);
        return null;
    }
}

exports.get = async (url, token) => {
    var headers = {};
    if (token) {
        headers.authorization = token
    }
    var response = await fetch(url, {
        method: "GET",
        headers: headers
    });
    try {
        return await response.json();
    } catch (e){
        console.log(e);
        return null;
    }
}

exports.delete = async (url, token) => {
    var headers = {};
    if (token) {
        headers.authorization = token
    }
    await fetch(url, {
        method: "DELETE",
        headers: headers
    });
}