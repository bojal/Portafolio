const projects = [
   {
        title: "cliquer",
        description: "Juego incremental hecho en JavaScript.",
        imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdummyimage.com%2F&psig=AOvVaw3S4TyQwZbZoz0qfWaqUOzv&ust=1750896194620000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDg6uOii44DFQAAAAAdAAAAABAE",
        projectUrl: "https://bojal.github.io/clicker_b/"
    },
    {
        title: "Proyecto 2",
        description: "Descripción breve del segundo proyecto y los desafíos superados.",
        imageUrl: "https://via.placeholder.com/600x400",
        projectUrl: "#"
    },
    {
        title: "Proyecto 3",
        description: "Descripción breve del tercer proyecto y los resultados obtenidos.",
        imageUrl: "https://via.placeholder.com/600x400",
        projectUrl: "#"
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