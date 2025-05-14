// Canvas animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
for (let i = 0; i < 20; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 20 + 10,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of circles) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00a3c8c0';
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;

    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Guide Slide Logic
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

// Generate dots
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.display = "none";
  });

  dotsContainer.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  slides[index].style.display = "block";
  dotsContainer.querySelectorAll(".dot")[index].classList.add("active");

  currentSlide = index;
}

window.nextSlide = () => showSlide(currentSlide + 1);
window.prevSlide = () => showSlide(currentSlide - 1);
window.goBack = () => window.location.href = "../index.html";

// Initialize first slide
showSlide(currentSlide);

// Touch events
let touchStartX = 0;
document.getElementById("slider").addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
});

document.getElementById("slider").addEventListener("touchend", e => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
});
