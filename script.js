const projects = [
   {
        title: "clicker base",
        description: "Juego web incremental hecho en unity.",
        imageUrl: "https://placehold.co/600x400",
        projectUrl: "https://bojal.github.io/clicker_b/"
    },
    {
        title: "Geobubs",
        description: "Juego web para gamejam de burbujas.",
        imageUrl: "img/Geo1.png",
        projectUrl: "https://bojal.itch.io/geobubs"
    },
    {
        title: "DarkDead",
        description: "Juego hecho en 2do semestre de carrera",
        imageUrl: "https://placehold.co/600x400",
        projectUrl: "https://bojal.itch.io/darkdead"
    },
    {
        title: "Rumble Zone",
        description: "Juego online. pronto",
        imageUrl: "img/RumblePortada2.png",
        projectUrl: "#"
    },
    {
        title: "Limites de honor",
        description: "Juego sobre guerra del pacifico",
        imageUrl: "https://placehold.co/600x400",
        projectUrl: "#"
    }
];

function generatePortfolioCards() {
    const container = document.getElementById('portfolio-container');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.style.cursor = 'pointer';
        card.onclick = () => {
            window.open(project.projectUrl, '_blank');
        };

        card.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}" class="card-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function updateYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', function() {
    generatePortfolioCards();
    updateYear();
    
    console.log("Portafolio cargado correctamente");
});
function setGalleryImage(imgPath) {
    const img = document.getElementById('gallery-image');
    img.src = imgPath;
}