async function loadDashboard() {

    // Vérifier si le token existe
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.replace("index.html");
        return;
    }

    try {

        const response = await fetch("https://red-products.onrender.com/api/dashboard/kpis", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Si le token est invalide ou expiré
        if (response.status === 401 || response.status === 403) {

            localStorage.removeItem("token");

            window.location.replace("index.html");

            return;
        }

        const data = await response.json();

        document.getElementById("users").innerText = data.users;
        document.getElementById("hotels").innerText = data.hotels;
        document.getElementById("messages").innerText = data.messages;
        document.getElementById("emails").innerText = data.emails;

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();

const menufot = document.getElementById("menufot");
const sidebare = document.getElementById("sidebare");

menufot.addEventListener("click", () => {
    sidebare.classList.toggle("-translate-x-full");
});

document.addEventListener("click", (e) => {
    if (!sidebare.contains(e.target) && !menufot.contains(e.target)) {
        sidebare.classList.add("-translate-x-full");
    }
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    // Supprimer le token
    localStorage.removeItem("token");

    // Rediriger vers la page de connexion
    window.location.replace("index.html");

});