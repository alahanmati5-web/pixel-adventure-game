
// ==================================
// PIXEL ADVENTURE - JAVASCRIPT
// ==================================

let score = 0;
let lives = 3;
let level = 1;

let isPlaying = false;
let isJumping = false;

let moveTimer = null;
let jumpTimer = null;

let coinPosition = 70;
let collected = false;

const player = document.getElementById("player");
const screen = document.getElementById("game-screen");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const levelText = document.getElementById("level");
const message = document.getElementById("game-message");

// ==================================
// MULAI GAME
// ==================================

function startGame() {

  score = 0;
  lives = 3;
  level = 1;

  isPlaying = true;
  isJumping = false;
  collected = false;

  clearInterval(moveTimer);
  clearTimeout(jumpTimer);

  player.style.left = "30px";
  player.style.bottom = "40px";

  coinPosition = 70;

  scoreText.innerText = score;
  livesText.innerText = lives;
  levelText.innerText = level;

  message.innerText = "Petualangan dimulai! Ayo kumpulkan koin!";

  document.getElementById("start-button").innerText =
    "🎮 GAME BERJALAN";

  const coin = document.querySelector(".coin");
  coin.style.display = "block";
  coin.style.left = coinPosition + "%";
}

// ==================================
// GERAK KE KIRI
// ==================================

function moveLeft() {

  if (!isPlaying) return;

  clearInterval(moveTimer);

  moveTimer = setInterval(function() {

    let posisi = player.offsetLeft - 5;

    if (posisi < 0) posisi = 0;

    player.style.left = posisi + "px";

    checkCoin();

  }, 30);
}

// ==================================
// GERAK KE KANAN
// ==================================

function moveRight() {

  if (!isPlaying) return;

  clearInterval(moveTimer);

  moveTimer = setInterval(function() {

    let batas =
      screen.clientWidth - player.offsetWidth;

    let posisi = player.offsetLeft + 5;

    if (posisi > batas) posisi = batas;

    player.style.left = posisi + "px";

    checkCoin();

  }, 30);
}

// ==================================
// BERHENTI BERGERAK
// ==================================

function stopMove() {

  clearInterval(moveTimer);

}

// ==================================
// LOMPAT
// ==================================

function jump() {

  if (!isPlaying || isJumping) return;

  isJumping = true;

  player.style.bottom = "120px";

  jumpTimer = setTimeout(function() {

    player.style.bottom = "40px";

    isJumping = false;

    checkCoin();

  }, 500);

}

// ==================================
// MENGUMPULKAN KOIN
// ==================================

function checkCoin() {

  if (!isPlaying || collected) return;

  const coin = document.querySelector(".coin");

  const playerRect = player.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  const bertabrakan =
    playerRect.left < coinRect.right &&
    playerRect.right > coinRect.left &&
    playerRect.top < coinRect.bottom &&
    playerRect.bottom > coinRect.top;

  if (bertabrakan) {

    collected = true;

    score += 10;

    scoreText.innerText = score;

    coin.style.display = "none";

    message.innerText = "🎉 Hebat! Kamu mendapatkan 10 koin!";

    setTimeout(function() {

      if (!isPlaying) return;

      coinPosition = 15 + Math.random() * 70;

      coin.style.left = coinPosition + "%";

      coin.style.display = "block";

      collected = false;

    }, 1000);

    // Naik level setiap 50 poin
    if (score % 50 === 0) {

      level++;

      levelText.innerText = level;

      message.innerText =
        "🏆 Selamat! Kamu naik ke level " + level;

    }

  }

}

// ==================================
// GAME OVER
// ==================================

function gameOver() {

  isPlaying = false;

  stopMove();

  clearTimeout(jumpTimer);

  message.innerText =
    "GAME OVER! Skor akhir: " + score;

  document.getElementById("start-button").innerText =
    "▶ MAIN LAGI";

}

// ==================================
// KONTROL KEYBOARD
// ==================================

document.addEventListener("keydown", function(e) {

  if (!isPlaying) return;

  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === " "
  ) {
    e.preventDefault();
  }

  if (e.key === "ArrowRight") {

    moveRight();

  }

  if (e.key === "ArrowLeft") {

    moveLeft();

  }

  if (e.key === "ArrowUp" || e.key === " ") {

    jump();

  }

});

document.addEventListener("keyup", function(e) {

  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft"
  ) {

    stopMove();

  }

});

// ==================================
// SELESAI
// ==================================

