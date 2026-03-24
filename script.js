const projects = [
  {
    title: "Proyecto GeoInt CH",
    description: "Simulador interactivo de catástrofes con topografía procedural en base a DEMs vía Marching Cubes y algoritmos de fluidos optimizados.",
    imageUrl: "img/FondoGeoInt.png",
    projectUrl: "https://drive.google.com/drive/u/0/folders/1uEDFlTqeNhooDkmUV6d4Mw0A91MBSDTr"
  },
  {
    title: "DarkDead",
    description: "Desarrollo de videojuego de supervivencia para PC. Gestión de assets y mecánicas 3D.",
    imageUrl: "img/DarkDeadBaner.png",
    projectUrl: "https://bojal.itch.io/darkdead"
  },
  {
    title: "RumbleZone",
    description: "Proyecto de videojuego multijugador online. Arquitectura de red en proceso.",
    imageUrl: "img/RumblePortada2.png",
    projectUrl: "https://drive.google.com/drive/u/0/folders/1Ve9ojzDymdP_3t-YNasLFpOP8MEzHL3Q"
  },
  {
    title: "GeoBubs",
    description: "Juego Web interactivo desplegado en Itch.io.",
    imageUrl: "img/Geo1.png",
    projectUrl: "https://bojal.itch.io/geobubs"
  }
];

function generatePortfolioCards() {
  const container = document.getElementById('portfolio-container');
  projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'portfolio-card';
    // Si no hay url válida, que no intente abrir
    div.onclick = () => { if(p.projectUrl) window.open(p.projectUrl, '_blank'); };
    
    div.innerHTML = `
      <img src="${p.imageUrl}" alt="Proyecto ${p.title}" class="card-image">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>`;
    container.appendChild(div);
  });
}

function updateYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  generatePortfolioCards();
  updateYear();
});