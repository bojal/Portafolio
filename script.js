const projects = [
   {
        title: "cliquer",
        description: "Juego incremental hecho en JavaScript.",
        imageUrl: "https://placehold.co/600x400",
        projectUrl: "https://bojal.github.io/clicker_b/"
    },
    {
        title: "Geobubs",
        description: "Juego para gamejam de burbujas.",
        imageUrl: "img/Geo1",
        projectUrl: "https://bojal.itch.io/geobubs"
    },
    {
        title: "DarkDead",
        description: "Juego hecho en 2do semestre de carrera",
        imageUrl: "https://via.placeholder.com/600x400",
        projectUrl: "https://bojal.itch.io/darkdead"
    },
    {
        title: "Proyecto 4",
        description: "Descripción breve del cuarto proyecto y su impacto.",
        imageUrl: "https://via.placeholder.com/600x400",
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