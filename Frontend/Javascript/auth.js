// ===============================
// INSCRIPTION
// ===============================
const registerForm = document.getElementById("registerform");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("https://red-products.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }) // <-- nom au lieu de name
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inscription réussie !");
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de contacter le serveur.");
    }
  });
  // Après la création de l'utilisateur
await sendEmail({
  to: user.email,
  subject: "Bienvenue sur RED PRODUCT",
  html: `
    <div style="font-family:Arial,sans-serif;padding:20px">
      <h2>Bonjour ${user.name},</h2>
      <p>Votre inscription a été réalisée avec succès.</p>
      <p>Vous pouvez maintenant vous connecter et accéder à votre tableau de bord.</p>
      <hr>
      <p><strong>RED PRODUCT</strong></p>
    </div>
  `
});

}

// ===============================
// CONNEXION
// ===============================
const loginForm = document.getElementById("loginform"); // <-- ciblage précis

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim(); // <-- email
    const password = document.getElementById("password").value.trim(); // <-- password

    try {
      const response = await fetch("https://red-products.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Connexion réussie !");
        window.location.href = "dashboard.html";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Impossible de contacter le serveur.");
    }
  });
}
