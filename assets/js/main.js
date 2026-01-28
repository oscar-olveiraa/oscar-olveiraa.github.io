// Pequeño efecto de escritura en la terminal
const terminal = document.querySelector(".terminal");

const text = "> uptime: 99.99% | status: online";
let i = 0;

terminal.textContent = "";

function typeEffect() {
  if (i < text.length) {
    terminal.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 40);
  }
}

typeEffect();
