// ---------------- HAMBURGER MENU ----------------
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

if (hamburger && sidebar) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
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

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("show") && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      closeSidebar();
    }
  });

  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeSidebar());
  });

  window.addEventListener("popstate", () => sidebar.classList.remove("show"));
}

// ---------------- LIGHTBOX ----------------
const galleryImages = document.querySelectorAll('.gallery-grid img');
const videoElements = document.querySelectorAll('.video-grid video');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxVideo = document.querySelector('.lightbox-video');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = 0;

// --- IMAGE LIGHTBOX ---
if (galleryImages.length > 0) {
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.style.display = 'block';
      lightboxVideo.style.display = 'none';
      lightboxImg.src = img.src;
      currentIndex = index;
    });
  });
}

// --- VIDEO LIGHTBOX ---
if (videoElements.length > 0) {
  videoElements.forEach((vid, index) => {
    vid.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = vid.querySelector('source').src;
      lightboxVideo.play();
      currentIndex = index;
    });
  });
}

// --- NAVIGATION ---
function showPrev() {
  if (lightboxVideo.style.display === 'block') {
    currentIndex = (currentIndex - 1 + videoElements.length) % videoElements.length;
    lightboxVideo.src = videoElements[currentIndex].querySelector('source').src;
    lightboxVideo.play();
  } else {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  }
}

function showNext() {
  if (lightboxVideo.style.display === 'block') {
    currentIndex = (currentIndex + 1) % videoElements.length;
    lightboxVideo.src = videoElements[currentIndex].querySelector('source').src;
    lightboxVideo.play();
  } else {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  }
}

lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

// --- CLOSE LIGHTBOX ---
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxVideo.pause();
  lightboxVideo.src = '';
  lightboxVideo.style.display = 'none';
  lightboxImg.style.display = 'block';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// --- KEYBOARD ---
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'Escape') closeLightbox();
  }
});
