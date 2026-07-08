const form = document.getElementById("resetForm");

const params = new URLSearchParams(window.location.search);

const token = params.get("token");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            `https://red-products.onrender.com/api/auth/reset-password/${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "index.html";

        }

    } catch (error) {

        console.error(error);

        alert("Erreur serveur");

    }

});