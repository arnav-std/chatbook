import { auth, provider, signInWithPopup, signOut } from './firebase-config.js';

let user = null;

window.onload = () => {
  // Attach event listener for the hamburger button
  const hamburgerButton = document.querySelector('.hamburger');
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
  }

  // Attach event listener for closing the offcanvas when clicking outside
  document.addEventListener('click', (event) => {
    const offcanvas = document.getElementById('offcanvas');
    const hamburger = document.querySelector('.hamburger');

    // Check if the click is outside the off-canvas or hamburger button
    if (!offcanvas.contains(event.target) && !hamburger.contains(event.target)) {
      offcanvas.classList.remove('show');
    }
  });

  auth.onAuthStateChanged(currentUser => {
    user = currentUser;
    updateAuthUI();
  });
};

function toggleMenu() {
  document.getElementById("offcanvas").classList.toggle("show");
}

function updateAuthUI() {
  const authArea = document.getElementById("authArea");
  if (user) {
    authArea.innerHTML = `
      <img src="${user.photoURL}" alt="Profile" style="width: 60px; border-radius: 50%;"/>
      <p>${user.displayName}</p>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    authArea.innerHTML = `<button onclick="login()">Login</button>`;
  }
  
}

window.login = async function login() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert("Login failed");
  }
};

window.logout = async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    alert("Logout failed");
  }
};

window.goToPage = function (page) {
  const warningMyChats = document.getElementById('warningMyChats');
  const warningUpload = document.getElementById('warningUpload');

  if (!user) {
    // Show warning for the current button and clear the other
    if (page === 'mychats') {
      warningMyChats.textContent = "Login first";
      warningUpload.textContent = "";
    } else if (page === 'upload') {
      warningUpload.textContent = "Login first";
      warningMyChats.textContent = "";
    }
  } else {
    // Clear all warnings and navigate
    warningMyChats.textContent = "";
    warningUpload.textContent = "";

    if (page === 'mychats') {
     window.location.href = 'guide/guide.html';
  } 
    else if (page === 'upload') {
     window.location.href = 'https://wa.me/';
  }
  }
};

// Canvas background animation
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
    ctx.fillStyle = '#00a3c850';
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;

    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();
