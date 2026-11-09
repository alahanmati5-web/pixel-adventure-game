
let score = 0;
let isPlaying = false;

function startGame() {
  score = 0;
  isPlaying = true;

  document.getElementById("score").innerText =
    "Skor: " + score;

  alert("Petualangan dimulai! 🎮");
}

const player = document.getElementById("player");

document.addEventListener("keydown", function(e) {
  if (!isPlaying) return;

  if (e.key === "ArrowRight") {
    player.style.left =
      Math.min(player.offsetLeft + 15, 450) + "px";
  }

  if (e.key === "ArrowLeft") {
    player.style.left =
      Math.max(player.offsetLeft - 15, 0) + "px";
  }

  if (e.key === " " || e.key === "ArrowUp") {
    player.style.bottom = "120px";

    setTimeout(function() {
      player.style.bottom = "40px";
    }, 400);
  }
});
