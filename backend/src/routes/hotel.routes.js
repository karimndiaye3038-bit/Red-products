const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotel.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Créer
// Créer
router.post("/", authMiddleware, upload.single("image"), hotelController.createHotel);

// Lister
router.get("/", authMiddleware, hotelController.getHotels);

// Modifier
router.put("/:id", (req, res) => {
    res.json({
        message: "Route PUT avec ID fonctionne",
        id: req.params.id
    });
});

// Supprimer
router.delete("/:id", authMiddleware, hotelController.deleteHotel);

module.exports = router;