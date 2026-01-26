const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const dashboard = document.getElementById("dashboard");

/* Safety check */
if (hamburger && sidebar) {

  // Toggle sidebar
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.style.display =
      sidebar.style.display === "flex" ? "none" : "flex";
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.style.display = "none";
    }
  });

  // Close sidebar when clicking a link
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.style.display = "none";
    });
  });
}
