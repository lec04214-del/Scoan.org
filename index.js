const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const dashboard = document.querySelector(".dashboard");

// Toggle sidebar
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// Tap anywhere to hide sidebar
dashboard.addEventListener("click", () => {
  sidebar.classList.remove("show");
});
