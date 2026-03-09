// ======================
// API
// ======================

const API_URL = "https://script.google.com/macros/s/AKfycbyLjG8YJdueop639IyaPryTrhPAa0Q6hQKJu1N_DLxH7PyvPt9mXHpZad87pEldvkGa/exec";


// ======================
// PEGAR ID DO PET
// ======================

let petId = null;

const params = new URLSearchParams(window.location.search);
petId = params.get("petId");

if (!petId) {

const path = window.location.pathname;
const parts = path.split("/");
petId = parts[parts.length - 1];

}

if (!petId || petId === "index.html") {

console.log("Modo institucional");
esconderLoader();

} else {

carregarPet(petId);

}



// ======================
// BUSCAR CAMPO PLANILHA
// ======================

function getField(pet,nome){

for (let key in pet){

if(key.trim().startsWith(nome)){

return pet[key];

}

}

return "";

}



// ======================
// CARREGAR PET
// ======================

function carregarPet(id){

fetch(`${API_URL}?petId=${id}`)

.then(res => res.json())

.then(response => {

console.log("RETORNO API:",response);

if(!response.ok){

console.error("Pet não encontrado");
esconderLoader();
return;

}

const pet = response.data;

preencherHero(pet);
preencherHistoria(pet);
preencherMomentos(pet);
preencherGaleria(pet);
preencherVideo(pet);
preencherTutor(pet);
configurarMusica(pet);
aplicarTema(pet);

esconderLoader();

})

.catch(error => {

console.error("Erro ao carregar API:",error);
esconderLoader();

});

}



// ======================
// HERO
// ======================

function preencherHero(pet){

setText("pet-nome",getField(pet,"Nome do pet"));

const idade = getField(pet,"Qual a idade atual do seu pet");

let adocao = getField(pet,"Data de adoção");

if(adocao){

adocao = new Date(adocao).toLocaleDateString("pt-BR");

}

setText("pet-meta",`Idade: ${idade || ""} • Adoção: ${adocao || ""}`);

setText("pet-frase",getField(pet,"Uma frase que define seu pet"));

const fotoPrincipal = document.getElementById("pet-foto");

const fotos = getField(pet,"Envie as fotos do seu pet");

if(fotoPrincipal && fotos){

const lista = fotos.split(",");

const primeiraFoto = converterDrive(lista[0].trim());

if(primeiraFoto){

fotoPrincipal.src = primeiraFoto;

}

}

}



// ======================
// HISTÓRIA
// ======================

function preencherHistoria(pet){

let historia = getField(pet,"Como vocês se conheceram");

if(!historia){

historia="Toda amizade começa com um encontro especial.";

}

setText("pet-historia",historia);

let personalidade = getField(pet,"Descreva a personalidade");

if(!personalidade){

personalidade="Um pet cheio de amor e alegria.";

}

setText("pet-personalidade",personalidade);

}



// ======================
// MOMENTOS
// ======================

function preencherMomentos(pet){

const momento = getField(pet,"Momentos marcantes");

if(!momento) return;

setText("momento1",momento);
setText("momento2",momento);
setText("momento3",momento);

setText("timeline1-texto",getField(pet,"Como vocês se conheceram"));
setText("timeline2-texto",momento);
setText("timeline3-texto",getField(pet,"Uma frase que define seu pet"));

}



// ======================
// GALERIA
// ======================

function preencherGaleria(pet){

const container = document.getElementById("galeria");

if(!container) return;

const fotos = getField(pet,"Envie as fotos do seu pet");

if(!fotos) return;

container.innerHTML="";

fotos.split(",").forEach(link => {

const url = converterDrive(link.trim());

if(!url) return;

const img = document.createElement("img");

img.src = url;
img.classList.add("foto-galeria");

container.appendChild(img);

});

}



// ======================
// VIDEO
// ======================

function preencherVideo(pet){

const videoFrame = document.getElementById("video-frame");
const videoSection = document.getElementById("video-section");

let link = getField(pet,"Envie o link do vídeo");

if(!link || !videoFrame || !videoSection) return;

if(link.includes("watch?v=")){

link = link.replace("watch?v=","embed/");

}

videoFrame.src = link;
videoSection.style.display="block";

}



// ======================
// FOTO COM TUTOR
// ======================

function preencherTutor(pet){

const tutorPhoto = document.getElementById("tutor-photo");
const juntos = document.getElementById("juntos");

const foto = getField(pet,"Envie a foto com o tutor");

if(!foto || !tutorPhoto || !juntos) return;

tutorPhoto.src = converterDrive(foto);
juntos.style.display="block";

}



// ======================
// MÚSICA
// ======================

function configurarMusica(pet){

const music = document.getElementById("bg-music");
const button = document.getElementById("music-toggle");

if(!music || !button) return;

const tipo = getField(pet,"Qual tipo de página você deseja criar");

if(tipo === "Celebrar a vida"){

music.src="assets/audio/vida.mp3";

}

if(tipo === "Homenagem memorial"){

music.src="assets/audio/memorial.mp3";

}

button.style.display="block";

button.onclick = () => {

if(music.paused){

music.play();
button.innerText="⏸ Pausar música";

}else{

music.pause();
button.innerText="🎵 Tocar música";

}

};

}



// ======================
// APLICAR TEMA
// ======================

function aplicarTema(pet){

const tipo = getField(pet,"Qual tipo de página você deseja criar");

if(tipo === "Celebrar a vida"){

document.body.classList.add("tema-vida");

}

if(tipo === "Homenagem memorial"){

document.body.classList.add("tema-memorial");

}

}



// ======================
// CONVERTER DRIVE
// ======================

function converterDrive(link){

if(!link) return "";

if(link.includes("drive.google.com")){

let id = null;

// formato /file/d/
if(link.includes("/d/")){
id = link.split("/d/")[1].split("/")[0];
}

// formato open?id=
if(link.includes("id=")){
id = link.split("id=")[1].split("&")[0];
}

// formato uc?id=
if(link.includes("uc?id=")){
id = link.split("uc?id=")[1].split("&")[0];
}

if(id){
return `https://drive.google.com/uc?export=view&id=${id}`;
}

}

return link;

}

// ======================
// AUXILIARES
// ======================

function setText(id,value){

const el = document.getElementById(id);

if(el){

el.innerText = value || "";

}

}

function esconderLoader(){

const loader = document.getElementById("loader");

if(loader){

loader.style.display="none";

}

}