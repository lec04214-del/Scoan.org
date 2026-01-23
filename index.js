const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const dashboard = document.getElementById("dashboard");

// Toggle dropdown sidebar
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate close
  sidebar.style.display = sidebar.style.display === "flex" ? "none" : "flex";
});

// Close sidebar when tapping anywhere else
dashboard.addEventListener("click", () => {
  sidebar.style.display = "none";
});

// Close sidebar when clicking a link
sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
});
