const Hotel = require("../models/Hotel");

// ============================
// Ajouter un hôtel
// ============================
exports.createHotel = async (req, res) => {
  try {
    const hotelData = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      pricePerNight: req.body.pricePerNight,
      currency: req.body.currency,
      image: req.file ? req.file.filename : null
    };

    const hotel = await Hotel.create(hotelData);

    // ✅ renvoyer l’hôtel créé
    res.status(201).json({ hotel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// Liste des hôtels
// ============================
exports.getHotels = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } }
      ]
    };

    const hotels = await Hotel.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Hotel.countDocuments(filter);

    // ✅ renvoyer un objet avec hotels
    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      hotels
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Modifier un hôtel
// ======================
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hôtel introuvable" });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Supprimer un hôtel
// ======================
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hôtel introuvable" });
    }

    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hôtel supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
