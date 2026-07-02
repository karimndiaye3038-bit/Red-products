const API_URL = "https://red-products.onrender.com/api";

function getToken() {
    return localStorage.getItem("token");
}

async function apiRequest(endpoint, method = "GET", body = null) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    return response.json();
}