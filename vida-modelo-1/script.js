// URL da sua API do Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbyLjG8YJdueop639IyaPryTrhPAa0Q6hQKJu1N_DLxH7PyvPt9mXHpZad87pEldvkGa/exec";

// pegar o ID da URL
let petId = null;

// tenta pegar ?id=
const params = new URLSearchParams(window.location.search);
petId = params.get("id");

// se não tiver, tenta pegar da rota /thor
if (!petId) {

  const path = window.location.pathname;

  const parts = path.split("/");

  petId = parts[parts.length - 1];

}

if (!petId) {
  alert("ID do pet não encontrado na URL.");
}

// buscar dados da planilha
fetch(`${API_URL}?id=${petId}`)
  .then(response => response.json())
  .then(data => {

    console.log("RETORNO API:", data);

    if (!data.ok) {
      alert("Pet não encontrado.");
      return;
    }

    const pet = data.data;

    const pet = data.data;

// ======================
// GALERIA DE FOTOS
// ======================

const galleryContainer = document.getElementById("galeria");

if (pet["Envie as fotos do seu pet (boa qualidade)"] && galleryContainer) {

  const fotos = pet["Envie as fotos do seu pet (boa qualidade)"]
    .split(",");

  fotos.forEach(link => {

    const img = document.createElement("img");

    img.src = link.trim();

    img.alt = "Foto do pet";

    galleryContainer.appendChild(img);

  });

}

    // ======================
    // HERO
    // ======================

    if (document.getElementById("pet-nome"))
      document.getElementById("pet-nome").innerText =
        pet["Nome do pet"] || "";

    if (document.getElementById("pet-meta"))
      document.getElementById("pet-meta").innerText =
        "Idade: " + (pet["Qual a idade atual do seu pet?"] || "") +
        " • Adoção: " + (pet["Data de adoção (opcional)"] || "");

    if (document.getElementById("pet-frase"))
      document.getElementById("pet-frase").innerText =
        pet["Uma frase que define seu pet"] || "";


    // ======================
    // FOTO DO PET
    // ======================

    if (pet["Envie as fotos do seu pet (boa qualidade)"] && document.getElementById("pet-foto")) {
      document.getElementById("pet-foto").src =
        pet["Envie as fotos do seu pet (boa qualidade)"];
    }


    // ======================
    // INFORMAÇÕES
    // ======================

    if (document.getElementById("info-nome"))
      document.getElementById("info-nome").innerText =
        pet["Nome do pet"] || "";

    if (document.getElementById("info-idade"))
      document.getElementById("info-idade").innerText =
        pet["Qual a idade atual do seu pet?"] || "";

    if (document.getElementById("info-adocao"))
      document.getElementById("info-adocao").innerText =
        pet["Data de adoção (opcional)"] || "";

    if (document.getElementById("info-cidade"))
      document.getElementById("info-cidade").innerText =
        pet["Cidade"] || "";

    if (document.getElementById("info-raca"))
      document.getElementById("info-raca").innerText =
        pet["Raça"] || "";


    // ======================
    // HISTÓRIA
    // ======================

    if (document.getElementById("pet-historia"))
      document.getElementById("pet-historia").innerText =
        pet["Como se conheceram"] || "";


    // ======================
    // PERSONALIDADE
    // ======================

    if (document.getElementById("pet-personalidade"))
      document.getElementById("pet-personalidade").innerText =
        pet["Descreva a personalidade do seu pet"] || "";


    // ======================
    // VÍDEO
    // ======================

    if (pet["Envie o link do vídeo (YouTube ou Google Drive)"]) {

      const videoFrame = document.getElementById("video-frame");
      const videoSection = document.getElementById("video-section");

      if (videoFrame && videoSection) {
        videoFrame.src = pet["Envie o link do vídeo (YouTube ou Google Drive)"];
        videoSection.style.display = "block";
      }
    }


    // ======================
    // FOTO COM TUTOR
    // ======================

    if (pet["Envie a foto com o tutor/família"]) {

      const tutorPhoto = document.getElementById("tutor-photo");
      const juntosSection = document.getElementById("juntos");

      if (tutorPhoto && juntosSection) {
        tutorPhoto.src = pet["Envie a foto com o tutor/família"];
        juntosSection.style.display = "block";
      }
    }


    // ======================
    // MÚSICA
    // ======================

    if (pet["Deseja incluir música de fundo no site?"] === "Sim, música instrumental padrão") {

      const music = document.getElementById("bg-music");
      const button = document.getElementById("music-toggle");

      if (music && button) {
        music.src = "assets/music/musica.mp3";
        button.style.display = "block";

        button.addEventListener("click", () => {
          if (music.paused) {
            music.play();
            button.innerText = "⏸ Pausar música";
          } else {
            music.pause();
            button.innerText = "🎵 Música";
          }
        });
      }
    }

  })

  .catch(error => {
    console.error("Erro:", error);
    alert("Erro ao carregar dados.");
  });