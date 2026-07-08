const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// ======================
// REGISTER
// ======================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({
                message: "Email déjà utilisé"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hash
        });
 await sendEmail({

    to: user.email,

    subject: "Réinitialisation du mot de passe",

    html: `
        <h2>Bonjour ${user.name}</h2>

        <p>Cliquez sur le bouton ci-dessous pour modifier votre mot de passe.</p>

        <a href="${resetUrl}"
        style="
        background:#334155;
        color:white;
        padding:12px 25px;
        border-radius:8px;
        text-decoration:none;
        ">
        Réinitialiser mon mot de passe
        </a>
    `
});

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ======================
// LOGIN
// ======================
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Utilisateur introuvable"
            });
        }

        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            return res.status(400).json({
                message: "Mot de passe incorrect"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ======================
// LOGOUT
// ======================
exports.logout = (req, res) => {
    res.status(200).json({
        message: "Déconnexion réussie"
    });
};
exports.forgotPassword = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Générer un token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // URL du frontend (Vercel)
        const resetUrl = `https://red-products-6t78.vercel.app/reset-password.html?token=${resetToken}`;

        // Envoi de l'e-mail avec Brevo
        await sendEmail({
            to: user.email,
            subject: "Réinitialisation du mot de passe - RED PRODUCT",
            html: `
                <div style="font-family:Arial,sans-serif;padding:20px">
                    <h2>Bonjour ${user.name},</h2>

                    <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>

                    <p>Cliquez sur le bouton ci-dessous :</p>

                    <a href="${resetUrl}"
                       style="
                            display:inline-block;
                            padding:12px 24px;
                            background:#334155;
                            color:#ffffff;
                            text-decoration:none;
                            border-radius:8px;
                       ">
                        Réinitialiser mon mot de passe
                    </a>

                    <p style="margin-top:20px">
                        Ce lien est valable pendant <strong>10 minutes</strong>.
                    </p>

                    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet e-mail.</p>

                    <hr>

                    <p><strong>RED PRODUCT</strong></p>
                </div>
            `
        });

        res.status(200).json({
            message: "Email de réinitialisation envoyé."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

};
exports.resetPassword = async (req, res) => {

    try {

        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Token invalide ou expiré"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({
            message: "Mot de passe mis à jour"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};