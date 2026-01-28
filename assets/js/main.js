const terminal = document.querySelector(".terminal");

if (terminal) {
  const text = "> role: computer_engineer | focus: IT & networking";
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
}
