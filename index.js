const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

if (hamburger && sidebar) {

  // Open / Close sidebar
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = sidebar.style.display === "flex";

    if (!isOpen) {
      sidebar.style.display = "flex";

      // Add a history step when sidebar opens
      history.pushState({ sidebarOpen: true }, "");
    } else {
      closeSidebar();
    }
  });

  // Close sidebar function
  function closeSidebar() {
    sidebar.style.display = "none";

    // Remove fake history step safely
    if (history.state && history.state.sidebarOpen) {
      history.back();
    }
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      sidebar.style.display === "flex" &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // Close when clicking a link
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });

  // Handle BACK button (Android / browser)
  window.addEventListener("popstate", (e) => {
    if (sidebar.style.display === "flex") {
      sidebar.style.display = "none";
    }
  });
}
