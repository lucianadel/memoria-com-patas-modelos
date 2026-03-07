const API_URL = "https://script.google.com/macros/s/AKfycbyLjG8YJdueop639IyaPryTrhPAa0Q6hQKJu1N_DLxH7PyvPt9mXHpZad87pEldvkGa/exec";

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



// BUSCAR CAMPO NA PLANILHA
function getField(pet, nome){

  for (let key in pet){

    if(key.trim().startsWith(nome)){

      return pet[key];

    }

  }

  return "";

}



function carregarPet(id){

fetch(`${API_URL}?petId=${id}`)

.then(res => res.json())

.then(response => {

  console.log("RETORNO API:", response);

  if(!response.ok){

    esconderLoader();
    return;

  }

  const pet = response.data;



  preencherHero(pet);
  preencherHistoria(pet);
  preencherGaleria(pet);
  preencherVideo(pet);
  preencherTutor(pet);
  configurarMusica(pet);

  esconderLoader();

})

.catch(err => {

  console.error(err);

  esconderLoader();

});

}



function preencherHero(pet){

setText("pet-nome", getField(pet,"Nome do pet"));

setText(
"pet-meta",
"Idade: " + getField(pet,"Qual a idade atual do seu pet") +
" • Adoção: " + getField(pet,"Data de adoção")
);

setText("pet-frase", getField(pet,"Uma frase que define seu pet"));


const fotoPrincipal = document.getElementById("pet-foto");

const fotos = getField(pet,"Envie as fotos do seu pet");

if(fotos){

const lista = fotos.split(",");

fotoPrincipal.src = converterDrive(lista[0].trim());

}

}



function preencherHistoria(pet){

setText("pet-historia", getField(pet,"Como vocês se conheceram"));

setText("pet-personalidade", getField(pet,"Descreva a personalidade"));

}



function preencherGaleria(pet){

const container = document.getElementById("galeria");

const fotos = getField(pet,"Envie as fotos do seu pet");

if(!fotos) return;

container.innerHTML = "";

fotos.split(",").forEach(link => {

const img = document.createElement("img");

img.src = converterDrive(link.trim());

container.appendChild(img);

});

}



function preencherVideo(pet){

const videoFrame = document.getElementById("video-frame");
const videoSection = document.getElementById("video-section");

let link = getField(pet,"Envie o link do vídeo");

if(!link) return;

if(link.includes("watch?v=")){

link = link.replace("watch?v=","embed/");

}

videoFrame.src = link;

videoSection.style.display = "block";

}



function preencherTutor(pet){

const tutorPhoto = document.getElementById("tutor-photo");
const juntos = document.getElementById("juntos");

const foto = getField(pet,"Envie a foto com o tutor");

if(!foto) return;

tutorPhoto.src = converterDrive(foto);

juntos.style.display = "block";

}



function configurarMusica(pet){

const music = document.getElementById("bg-music");
const button = document.getElementById("music-toggle");

if(!music || !button) return;

const escolha = getField(pet,"Deseja incluir música");

if(escolha === "Sim, música instrumental padrão"){

music.src = "assets/audio/musica.mp3";

button.style.display = "block";

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

}



function converterDrive(link){

if(!link) return "";

if(link.includes("drive.google.com")){

const id = link.split("/d/")[1]?.split("/")[0] || link.split("id=")[1];

return `https://drive.google.com/uc?export=view&id=${id}`;

}

return link;

}



function setText(id,value){

const el=document.getElementById(id);

if(el){

el.innerText=value || "";

}

}



function esconderLoader(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

}