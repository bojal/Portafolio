const projects = [
  {
    title: "Cliquer",
    description: "Juego Web",
    imageUrl: "img/banerClick.png",
    projectUrl: "https://bojal.github.io/clicker_b/"
  },
  {
    title: "DarkDead",
    description: "Juego para PC",
    imageUrl: "img/DarkDeadBaner.png",
    projectUrl: "https://bojal.itch.io/darkdead"
  },
  {
    title: "GeoBubs",
    description: "Juego Web",
    imageUrl: "img/Geo1.png",
    projectUrl: "https://bojal.itch.io/geobubs"
  },
  {
    title: "RumbleZone",
    description: "Juego online. en proceso",
    imageUrl: "img/RumblePortada2.png",
    projectUrl: "https://bojal.github.io/"
  }
  
];

function generatePortfolioCards() {
  const container = document.getElementById('portfolio-container');
  projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'portfolio-card';
    div.onclick = () => window.open(p.projectUrl, '_blank');
    div.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.title}" class="card-image">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>`;
    container.appendChild(div);
  });
}


function updateYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  generatePortfolioCards();
  updateYear();
})
;