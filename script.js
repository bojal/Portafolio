const projects = [
    {
        title: "Proyecto 1",
        description: "Descripción breve del primer proyecto y las tecnologías utilizadas.",
        imageUrl: "https://via.placeholder.com/600x400",
        projectUrl: "#"
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
        
        card.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}" class="card-image" onclick="window.location.href='${project.projectUrl}'">
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