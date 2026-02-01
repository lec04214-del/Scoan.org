const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("show");
  history.pushState({ sidebar: true }, "");
});

window.addEventListener("popstate", () => {
  sidebar.classList.remove("show");
});

document.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

/* LIGHTBOX */
const images = document.querySelectorAll(".gallery-grid img");
const videos = document.querySelectorAll(".video-grid video");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxVideo = document.querySelector(".lightbox-video");

images.forEach(img => {
  img.onclick = () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
  };
});

videos.forEach(video => {
  video.onclick = () => {
    lightbox.style.display = "flex";
    lightboxVideo.src = video.querySelector("source").src;
    lightboxVideo.style.display = "block";
    lightboxVideo.play();
    lightboxImg.style.display = "none";
  };
});

document.querySelector(".lightbox-close").onclick = () => {
  lightbox.style.display = "none";
  lightboxVideo.pause();
};
