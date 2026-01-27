// ---------------- HAMBURGER MENU ----------------
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

if (hamburger && sidebar) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = sidebar.classList.contains("show");
    if (!isOpen) { sidebar.classList.add("show"); history.pushState({ sidebarOpen:true }, ""); } 
    else { closeSidebar(); }
  });
  function closeSidebar() { sidebar.classList.remove("show"); if(history.state && history.state.sidebarOpen) history.back(); }
  document.addEventListener("click", (e) => { if(sidebar.classList.contains("show") && !sidebar.contains(e.target) && !hamburger.contains(e.target)) closeSidebar(); });
  sidebar.querySelectorAll("a").forEach(link => { link.addEventListener("click", () => closeSidebar()); });
  window.addEventListener("popstate", ()=> sidebar.classList.remove("show"));
}

// ---------------- LAZY LOAD IMAGES ----------------
const lazyImages = document.querySelectorAll('.lazy');
const imageObserver = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
},{ rootMargin:"0px 0px 50px 0px" });
lazyImages.forEach(img=>imageObserver.observe(img));

// ---------------- VIDEO & YOUTUBE PLACEHOLDER ----------------
const videoPlaceholders = document.querySelectorAll('.video-placeholder');
const ytPlaceholders = document.querySelectorAll('.youtube-placeholder');

let lightboxItems = [];
let currentIndex = 0;

// Initialize lightboxItems
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.gallery-grid img').forEach(img=>{ lightboxItems.push({type:'image', src:img.dataset.src||img.src}); });
  videoPlaceholders.forEach(div=>{
    lightboxItems.push({type:'video', src:div.dataset.src});
    div.addEventListener('click', ()=> openLightbox(lightboxItems.findIndex(item=>item.src===div.dataset.src)));
    div.addEventListener('click', ()=> loadVideo(div));
  });
  ytPlaceholders.forEach(div=>{
    lightboxItems.push({type:'youtube', src:div.dataset.src});
    div.addEventListener('click', ()=> openLightbox(lightboxItems.findIndex(item=>item.src===div.dataset.src)));
    div.addEventListener('click', ()=> loadYouTube(div));
  });
});

// Lazy-load video
function loadVideo(div){
  const video = document.createElement('video');
  video.src = div.dataset.src;
  video.poster = div.dataset.poster;
  video.controls = true;
  video.autoplay = true;
  video.style.width = "100%";
  video.style.height = "100%";
  div.innerHTML='';
  div.appendChild(video);
}
function loadYouTube(div){
  const iframe = document.createElement('iframe');
  iframe.src = div.dataset.src;
  iframe.width="100%";
  iframe.height="200";
  iframe.frameBorder="0";
  iframe.allow="fullscreen";
  div.innerHTML='';
  div.appendChild(iframe);
}

// ---------------- LIGHTBOX ----------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxVideo = document.querySelector('.lightbox-video');

function openLightbox(index){
  currentIndex = index;
  showLightboxItem();
  lightbox.style.display='flex';
}

function showLightboxItem(){
  const item = lightboxItems[currentIndex];
  lightboxImg.style.opacity=0;
  lightboxVideo.style.opacity=0;
  setTimeout(()=>{
    if(item.type==='image'){
      lightboxImg.src=item.src;
      lightboxImg.style.display='block';
      lightboxVideo.pause(); lightboxVideo.style.display='none';
      setTimeout(()=> lightboxImg.style.opacity=1,50);
    } else {
      lightboxVideo.src=item.src;
      lightboxVideo.style.display='block';
      lightboxImg.style.display='none';
      lightboxVideo.play();
      setTimeout(()=> lightboxVideo.style.opacity=1,50);
    }
  },200);
}

document.querySelector('.lightbox-prev').addEventListener('click', ()=>{
  currentIndex=(currentIndex-1+lightboxItems.length)%lightboxItems.length;
  showLightboxItem();
});
document.querySelector('.lightbox-next').addEventListener('click', ()=>{
  currentIndex=(currentIndex+1)%lightboxItems.length;
  showLightboxItem();
});

document.querySelector('.lightbox-close').addEventListener('click', ()=>{
  lightbox.style.display='none';
  lightboxVideo.pause(); lightboxVideo.src=''; lightboxImg.style.display='block';
});
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) lightbox.querySelector('.lightbox-close').click(); });

document.addEventListener('keydown', e=>{
  if(lightbox.style.display==='flex'){
    if(e.key==='ArrowRight'){ currentIndex=(currentIndex+1)%lightboxItems.length; showLightboxItem(); }
    else if(e.key==='ArrowLeft'){ currentIndex=(currentIndex-1+lightboxItems.length)%lightboxItems.length; showLightboxItem(); }
    else if(e.key==='Escape') lightbox.querySelector('.lightbox-close').click();
  }
});
