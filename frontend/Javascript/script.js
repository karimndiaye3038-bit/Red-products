const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
});
// Ouvrire si on clique 

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
   modal.classList.add("flex");
});

// fermer si on clique en dehors
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");

  }
})

//  pour que le bouton ferme
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
  

  