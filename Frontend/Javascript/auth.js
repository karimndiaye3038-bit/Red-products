// ===============================
// INSCRIPTION
// ===============================
const registerForm = document.getElementById("registerform");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    const token = generateToken(user._id);

    // 👉 Envoi de l'email de confirmation ici
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

    // Réponse API
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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
