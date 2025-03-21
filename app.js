const video1 = document.getElementById("projectVideo1");
const video2 = document.getElementById("projectVideo2");
const videoList = [video1, video2];

const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

// Add event listener with logging to debug
menu.addEventListener("click", function () {
  console.log("Menu clicked"); // For debugging
  sideBar.classList.remove("close-sidebar");
  sideBar.classList.add("open-sidebar");

  console.log("Sidebar classes:", sideBar.classList);
});

closeIcon.addEventListener("click", function () {
  console.log("Close clicked"); // For debugging
  sideBar.classList.add("close-sidebar");
  console.log("Sidebar classes after close:", sideBar.classList);
});

// Mobile detection
const isMobile = () => window.matchMedia("(max-width: 700px)").matches;

// Configure videos for mobile autoplay
function configureVideos() {
  videoList.forEach((video) => {
    video.muted = true; // Required for mobile autoplay
    video.playsInline = true; // Prevent fullscreen on iOS
    video.removeAttribute("controls"); // Hide native controls
  });
}

// Intersection Observer setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1; // Smooth transition
        entry.target.play().catch(() => {
          // Fallback if autoplay fails
          entry.target.style.display = "none";
        });
      } else {
        entry.target.style.opacity = 0.5; // Visual indicator
        entry.target.pause();
      }
    });
  },
  {
    threshold: 0.25, // Trigger when 25% visible
    rootMargin: "0px",
  }
);

// Initialize
configureVideos();

if (isMobile()) {
  // Mobile-specific setup
  videoList.forEach((video) => {
    // Add smooth transition
    video.style.transition = "opacity 0.5s ease";
    video.style.opacity = 0.5;

    // Observe videos
    observer.observe(video);

    // Add tap fallback
    video.addEventListener("click", () => {
      video.play().catch(() => {
        video.style.display = "block";
        video.play();
      });
    });
  });
} else {
  // Desktop hover behavior
  const hoverSign = document.querySelector(".hover-sign");

  videoList.forEach((video) => {
    video.addEventListener("mouseover", () => {
      video.play();
      hoverSign.classList.add("active");
    });
    video.addEventListener("mouseout", () => {
      video.pause();
      hoverSign.classList.remove("active");
    });
  });
}

let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // User is scrolling down → Hide the header
    header.style.top = "-70px";
  } else {
    // User is scrolling up → Show the header
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
});
