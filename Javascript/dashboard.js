
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