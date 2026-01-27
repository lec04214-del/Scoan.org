// SIDEBAR
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", e => {
  e.stopPropagation();
  sidebar.classList.toggle("show");
});

document.addEventListener("click", e => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove("show");
  }
});

// LAZY LOAD IMAGES
document.addEventListener("DOMContentLoaded", () => {
  const lazyImgs = document.querySelectorAll(".lazy");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });

  lazyImgs.forEach(img => observer.observe(img));
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lbImg = document.querySelector(".lightbox-img");
const lbVid = document.querySelector(".lightbox-video");

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lbVid.pause();
    lbVid.style.display = "none";
    lbImg.style.display = "block";
    lbImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

document.querySelectorAll(".video-box").forEach(box => {
  box.addEventListener("click", () => {
    lbImg.style.display = "none";
    lbVid.style.display = "block";
    lbVid.src = box.dataset.video;
    lbVid.play();
    lightbox.style.display = "flex";
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.style.display = "none";
  lbVid.pause();
  lbVid.src = "";
});
