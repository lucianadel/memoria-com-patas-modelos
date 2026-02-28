// ==========================
// CONFIGURAÇÃO DO VÍDEO
// ==========================

const videoUrl = ""; 
// const videoUrl = "https://www.youtube.com/embed/abc123";

if (videoUrl !== "") {

  const section = document.getElementById("video-section");
  const iframe = document.getElementById("video-frame");

  if (section && iframe) {
    iframe.src = videoUrl;
    section.style.display = "block";
  }
}


// ==========================
// CONFIGURAÇÃO DA MÚSICA
// ==========================

const musicUrl = "assets/audio/musica.mp3";
// const musicUrl = "";

if (musicUrl !== "") {

  const audio = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");

  if (audio && button) {

    audio.src = musicUrl;
    button.style.display = "block";

    let isPlaying = false;

    button.addEventListener("click", () => {
      if (!isPlaying) {
        audio.play();
        button.textContent = "🔇 Pausar";
        isPlaying = true;
      } else {
        audio.pause();
        button.textContent = "🎵 Música";
        isPlaying = false;
      }
    });

  }
}


// ==========================
// TROCA DE TEMA INTERATIVA
// ==========================

const select = document.getElementById("theme-select");
const root = document.documentElement;

function applyTheme(theme) {

  if (theme === "delicado") {
    root.style.setProperty("--accent", "#e8a6c1");
    root.style.setProperty("--bg", "#fff7fb");
  }

  if (theme === "alegre") {
    root.style.setProperty("--accent", "#ff7a00");
    root.style.setProperty("--bg", "#fff9f2");
  }

  if (theme === "moderno") {
    root.style.setProperty("--accent", "#3a86ff");
    root.style.setProperty("--bg", "#f5f7fa");
  }

  if (theme === "minimalista") {
    root.style.setProperty("--accent", "#1f1f1f");
    root.style.setProperty("--bg", "#ffffff");
  }

  localStorage.setItem("theme", theme);
}

// Só adiciona evento se o select existir
if (select) {

  select.addEventListener("change", (e) => {
    applyTheme(e.target.value);
  });

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
    select.value = savedTheme;
  }

}