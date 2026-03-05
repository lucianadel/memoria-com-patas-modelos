// ==========================
// API DO GOOGLE APPS SCRIPT
// ==========================

const API_URL = "https://script.google.com/macros/s/AKfycbyLjG8YJdueop639IyaPryTrhPAa0Q6hQKJu1N_DLxH7PyvPt9mXHpZad87pEldvkGa/exec";


// ==========================
// PEGAR ID DO PET NA URL
// ==========================

let petId = null;

const params = new URLSearchParams(window.location.search);
petId = params.get("id");

// tentar pegar da rota
if (!petId) {

  const path = window.location.pathname;
  const parts = path.split("/");

  petId = parts[parts.length - 1];

}


// ==========================
// SE NÃO EXISTIR ID
// ==========================

if (!petId || petId === "index.html") {

  console.log("Modo institucional ativado");
  return;

}


// ==========================
// BUSCAR DADOS DA PLANILHA
// ==========================

fetch(`${API_URL}?id=${petId}`)
.then(response => response.json())

.then(data => {

  console.log("RETORNO API:", data);

  if (!data.ok) {
    alert("Pet não encontrado.");
    return;
  }

  const pet = data.data;



// ==========================
// FUNÇÃO AUXILIAR
// ==========================

function setText(id, value){

  const el = document.getElementById(id);

  if(el){
    el.innerText = value || "";
  }

}



// ==========================
// HERO
// ==========================

setText("pet-nome", pet["Nome do pet"]);

setText(
  "pet-meta",
  "Idade: " + (pet["Qual a idade atual do seu pet?"] || "") +
  " • Adoção: " + (pet["Data de adoção (opcional)"] || "")
);

setText("pet-frase", pet["Uma frase que define seu pet"]);



// ==========================
// FOTO PRINCIPAL
// ==========================

const fotoPrincipal = document.getElementById("pet-foto");

if (pet["Envie as fotos do seu pet (boa qualidade)"]) {

  const fotos = pet["Envie as fotos do seu pet (boa qualidade)"].split(",");

  if (fotoPrincipal) {

    fotoPrincipal.src = fotos[0].trim();

  }

}



// ==========================
// INFORMAÇÕES
// ==========================

setText("info-nome", pet["Nome do pet"]);
setText("info-idade", pet["Qual a idade atual do seu pet?"]);
setText("info-adocao", pet["Data de adoção (opcional)"]);
setText("info-cidade", pet["Cidade"]);
setText("info-raca", pet["Raça"]);



// ==========================
// HISTÓRIA
// ==========================

setText("pet-historia", pet["Como se conheceram"]);



// ==========================
// PERSONALIDADE
// ==========================

setText("pet-personalidade", pet["Descreva a personalidade do seu pet"]);



// ==========================
// GALERIA
// ==========================

const galleryContainer = document.getElementById("galeria");

if (pet["Envie as fotos do seu pet (boa qualidade)"] && galleryContainer) {

  const fotos = pet["Envie as fotos do seu pet (boa qualidade)"].split(",");

  galleryContainer.innerHTML = "";

  fotos.forEach(link => {

    const img = document.createElement("img");

    img.src = link.trim();
    img.alt = "Foto do pet";

    galleryContainer.appendChild(img);

  });

}



// ==========================
// VÍDEO
// ==========================

const videoFrame = document.getElementById("video-frame");
const videoSection = document.getElementById("video-section");

if (pet["Envie o link do vídeo (YouTube ou Google Drive)"]) {

  if (videoFrame && videoSection) {

    videoFrame.src =
      pet["Envie o link do vídeo (YouTube ou Google Drive)"];

    videoSection.style.display = "block";

  }

}



// ==========================
// FOTO COM TUTOR
// ==========================

const tutorPhoto = document.getElementById("tutor-photo");
const juntosSection = document.getElementById("juntos");

if (pet["Envie a foto com o tutor/família"]) {

  if (tutorPhoto && juntosSection) {

    tutorPhoto.src =
      pet["Envie a foto com o tutor/família"];

    juntosSection.style.display = "block";

  }

}



// ==========================
// MÚSICA
// ==========================

const music = document.getElementById("bg-music");
const button = document.getElementById("music-toggle");

if (pet["Deseja incluir música de fundo no site?"] === "Sim, música instrumental padrão") {

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



// ==========================
// TEMA VIDA / MEMORIAL
// ==========================

if (pet["Tipo de página"] === "Memorial") {

  document.body.classList.add("tema-memorial");

  if(fotoPrincipal && !fotoPrincipal.src){

    fotoPrincipal.src = "assets/img/memorial-placeholder.jpg";

  }

} else {

  document.body.classList.add("tema-vida");

}



})

.catch(error => {

console.error("Erro:", error);
alert("Erro ao carregar dados.");

});