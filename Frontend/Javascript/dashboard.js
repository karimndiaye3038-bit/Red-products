async function loadDashboard() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://red-products.onrender.com/api/dashboard/kpis", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(data);

        document.getElementById("users").innerText = data.users;
        document.getElementById("hotels").innerText = data.hotels;
        document.getElementById("messages").innerText = data.messages;
        document.getElementById("emails").innerText = data.emails;

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();
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