// ==========================
// API DO GOOGLE APPS SCRIPT
// ==========================

const API_URL = "https://script.google.com/macros/s/AKfycbyLjG8YJdueop639IyaPryTrhPAa0Q6hQKJu1N_DLxH7PyvPt9mXHpZad87pEldvkGa/exec";


// ==========================
// PEGAR ID DO PET NA URL
// ==========================

let petId = null;

// ?id=xxxxx
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
// FUNÇÃO AUXILIAR
// ==========================

function setText(id, value){

  const el = document.getElementById(id);

  if(el){
    el.innerText = value || "";
  }

}


// ==========================
// BUSCAR DADOS DA PLANILHA
// ==========================

fetch(`${API_URL}?id=${petId}`)
.then(response => response.json())

.then(data => {

  console.log("RETORNO API:", data);

  if (!data.ok) {

    console.error("Pet não encontrado");
    return;

  }

  const pet = data.data;



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

  if (fotoPrincipal && fotos.length > 0) {

    fotoPrincipal.src = fotos[0].trim();

  }

}



// ==========================
// HISTÓRIA
// ==========================

setText("pet-historia", pet["Como se conheceram"]);



// ==========================
// PERSONALIDADE
// ==========================

setText("pet-personalidade", pet["Descreva a personalidade do seu pet"]);



// ==========================
// TIMELINE
// ==========================

setText("timeline1-titulo", "Chegada na família");
setText("timeline1-texto", pet["Como se conheceram"]);

setText("timeline2-titulo", "Primeiros momentos");
setText("timeline2-texto", pet["Momentos marcantes"]);

setText("timeline3-titulo", "Histórias inesquecíveis");
setText("timeline3-texto", pet["Uma frase que define seu pet"]);



// ==========================
// MOMENTOS MARCANTES
// ==========================

setText("momento1", pet["Momentos marcantes"]);
setText("momento2", pet["Descreva a personalidade do seu pet"]);
setText("momento3", pet["Uma frase que define seu pet"]);



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

let videoLink = pet["Envie o link do vídeo (YouTube ou Google Drive)"];

if (videoLink && videoFrame && videoSection) {

  // converter youtube
  if(videoLink.includes("watch?v=")){

    videoLink = videoLink.replace("watch?v=","embed/");

  }

  videoFrame.src = videoLink;

  videoSection.style.display = "block";

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

console.error("Erro ao carregar API:", error);

});