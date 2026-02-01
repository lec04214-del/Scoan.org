// ---------------- SIDEBAR DROPDOWN ----------------
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

if (hamburger && sidebar) {

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // 🔴 critical fix
    const isOpen = sidebar.classList.contains("show");

    if (!isOpen) {
      sidebar.classList.add("show");
      history.pushState({ sidebarOpen: true }, "");
    } else {
      closeSidebar();
    }
  });

  function closeSidebar() {
    sidebar.classList.remove("show");
    if (history.state && history.state.sidebarOpen) {
      history.back();
    }
  }

  // Click outside closes sidebar
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // Back button support
  window.addEventListener("popstate", () => {
    sidebar.classList.remove("show");
  });
}

// ---------------- LIGHTBOX (UNCHANGED LOGIC) ----------------
const images = document.querySelectorAll(".gallery-grid img");
const videos = document.querySelectorAll(".video-grid video");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxVideo = document.querySelector(".lightbox-video");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
  });
});

videos.forEach(video => {
  video.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxVideo.src = video.querySelector("source").src;
    lightboxVideo.style.display = "block";
    lightboxVideo.play();
    lightboxImg.style.display = "none";
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxVideo.pause();
  lightboxVideo.src = "";
});
