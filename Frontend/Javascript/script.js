// ============================
// PROTECTION DE LA PAGE
// ============================

const token = localStorage.getItem("token");

    if (!token) {
        window.location.replace("index.html");
        return;
    }
// ============================
// MODAL
// ============================

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Fermer en cliquant en dehors
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

// ============================
// SIDEBAR
// ============================

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

// ============================
// AJOUT D'HÔTEL
// ============================

const saveBtn = document.getElementById("saveHotel");
saveBtn.addEventListener("click", async () => {
  try {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté");
      window.location.href = "index.html";
      return;
    }

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("pricePerNight", document.getElementById("pricePerNight").value);
    formData.append("currency", document.getElementById("currency").value);

    const image = document.getElementById("image").files[0];

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("https://red-products.onrender.com/api/hotels", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Hôtel ajouté avec succès");

      modal.classList.add("hidden");
      modal.classList.remove("flex");

      location.reload();
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Erreur serveur");
  }
});


async function loadHotels() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://red-products.onrender.com/api/hotels", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Vérifier si le token est invalide
        if (response.status === 401 || response.status === 403) {

            localStorage.removeItem("token");

            window.location.replace("index.html");

            return;
        }

        const data = await response.json();

        const hotelList = document.getElementById("hotelList");

        data.hotels.forEach(hotel => {

            hotelList.innerHTML += `
<div class="bg-white rounded-xl shadow overflow-hidden">

    <div class="relative">

        <img
            src="${hotel.image
                ? `https://red-products.onrender.com/uploads/${hotel.image}`
                : "../Images/hot.png"}"
            class="w-full h-[150px] object-cover">

        <div class="absolute top-2 right-2 flex gap-2">

            <button
                onclick="editHotel('${hotel._id}')"
                class="bg-white/80 hover:bg-white text-blue-600 w-9 h-9 rounded-full shadow flex items-center justify-center">

                <i class="fa-solid fa-pen-to-square"></i>

            </button>

            <button
                onclick="deleteHotel('${hotel._id}')"
                class="bg-white/80 hover:bg-white text-red-600 w-9 h-9 rounded-full shadow flex items-center justify-center">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    </div>

    <div class="p-3">

        <p class="text-sm text-red-500">${hotel.address}</p>

        <h3 class="font-bold">${hotel.name}</h3>

        <p class="font-semibold">
            ${hotel.pricePerNight} ${hotel.currency} / nuit
        </p>

    </div>

</div>
`;
        });

    } catch (error) {

        console.error(error);

    }

}

loadHotels();
// ============================
// SUPPRIMER UN HÔTEL
// ============================

async function deleteHotel(id) {

    const confirmation = confirm("Voulez-vous vraiment supprimer cet hôtel ?");

    if (!confirmation) return;

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`https://red-products.onrender.com/api/hotels/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            location.reload();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Erreur serveur");

    }

}
// ============================
// MODIFIER UN HÔTEL
// ============================

async function editHotel(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://red-products.onrender.com/api/hotels", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        const hotel = data.hotels.find(h => h._id === id);

        if (!hotel) {
            alert("Hôtel introuvable");
            return;
        }

        // Remplir le formulaire
        document.getElementById("name").value = hotel.name;
        document.getElementById("address").value = hotel.address;
        document.getElementById("email").value = hotel.email;
        document.getElementById("phone").value = hotel.phone;
        document.getElementById("pricePerNight").value = hotel.pricePerNight;
        document.getElementById("currency").value = hotel.currency;

        // Ouvrir le modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        // Sauvegarder l'id à modifier
        saveBtn.dataset.id = hotel._id;

    } catch (error) {

        console.log(error);

    }

}

// ============================
// DÉCONNEXION
// ============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {

            localStorage.removeItem("token");

            window.location.replace("index.html");

        }

    });

}