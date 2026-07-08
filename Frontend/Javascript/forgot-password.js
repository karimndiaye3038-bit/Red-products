document.getElementById("forgotForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    try {

        const response = await fetch(
            "https://red-products.onrender.com/api/auth/forgot-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.error(error);

        alert("Erreur serveur");

    }

});