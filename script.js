
// ==================================
// PIXEL ADVENTURE - JAVASCRIPT
// ==================================

let score = 0;
let lives = 3;
let level = 1;

let isPlaying = false;
let isJumping = false;
let collected = false;

let moveTimer = null;
let jumpTimer = null;
let collisionTimer = null;
let respawnTimer = null;

let coinPosition = 70;

const player = document.getElementById("player");
const screen = document.getElementById("game-screen");
const coin = document.querySelector(".coin");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const levelText = document.getElementById("level");
const message = document.getElementById("game-message");

// ==================================
// MULAI GAME
// ==================================

function startGame() {

  clearInterval(moveTimer);
  clearInterval(collisionTimer);
  clearTimeout(jumpTimer);
  clearTimeout(respawnTimer);

  score = 0;
  lives = 3;
  level = 1;

  isPlaying = true;
  isJumping = false;
  collected = false;

  player.style.left = "30px";
  player.style.bottom = "40px";

  coinPosition = 70;

  scoreText.innerText = score;
  livesText.innerText = lives;
  levelText.innerText = level;

  message.innerText =
    "Petualangan dimulai! Ayo kumpulkan koin!";

  document.getElementById("start-button").innerText =
    "🎮 GAME BERJALAN";

  coin.style.display = "block";
  coin.style.left = coinPosition + "%";

  // Memeriksa tabrakan secara terus-menerus
  collisionTimer = setInterval(checkCoin, 30);
}

// ==================================
// GERAK KE KIRI
// ==================================

function moveLeft() {

  if (!isPlaying) return;

  clearInterval(moveTimer);

  function gerak() {

    let posisi = player.offsetLeft - 8;

    if (posisi < 0) posisi = 0;

    player.style.left = posisi + "px";

    checkCoin();
  }

  gerak();

  moveTimer = setInterval(gerak, 35);
}

// ==================================
// GERAK KE KANAN
// ==================================

function moveRight() {

  if (!isPlaying) return;

  clearInterval(moveTimer);

  function gerak() {

    let batas =
      screen.clientWidth - player.offsetWidth;

    let posisi = player.offsetLeft + 8;

    if (posisi > batas) posisi = batas;

    player.style.left = posisi + "px";

    checkCoin();
  }

  gerak();

  moveTimer = setInterval(gerak, 35);
}

// ==================================
// BERHENTI BERGERAK
// ==================================

function stopMove() {

  clearInterval(moveTimer);
  moveTimer = null;

}

// ==================================
// LOMPAT
// ==================================

function jump() {

  if (!isPlaying || isJumping) return;

  isJumping = true;

  player.style.bottom = "120px";

  checkCoin();

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

  if (coin.style.display === "none") return;

  const playerRect = player.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  // Area tabrakan diberi toleransi
  const bertabrakan =
    playerRect.left - 15 < coinRect.right &&
    playerRect.right + 15 > coinRect.left &&
    playerRect.top - 20 < coinRect.bottom &&
    playerRect.bottom + 20 > coinRect.top;

  if (bertabrakan) {

    collected = true;

    // Tambah skor
    score += 10;

    scoreText.innerText = score;

    // Sembunyikan koin
    coin.style.display = "none";

    message.innerText =
      "🎉 Hebat! Kamu mendapatkan 10 koin!";

    // Naik level setiap 50 poin
    if (score % 50 === 0) {

      level++;

      levelText.innerText = level;

      message.innerText =
        "🏆 Selamat! Kamu naik ke level " + level;
    }

    // Munculkan koin baru
    clearTimeout(respawnTimer);

    respawnTimer = setTimeout(function() {

      if (!isPlaying) return;

      coinPosition = 15 + Math.random() * 70;

      coin.style.left = coinPosition + "%";

      coin.style.display = "block";

      collected = false;

    }, 1000);

  }

}

// ==================================
// GAME OVER
// ==================================

function gameOver() {

  isPlaying = false;

  stopMove();

  clearInterval(collisionTimer);

  clearTimeout(jumpTimer);
  clearTimeout(respawnTimer);

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

// ==================================
// LEPAS TOMBOL KEYBOARD
// ==================================

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
