/* ============================================================================
   DEVLOG & NOTICIAS  ·  data/posts.js
   ----------------------------------------------------------------------------
   Añade una entrada nueva copiando cualquier objeto y cambiando sus campos.
   Se ordenan solos por fecha (más nuevo primero).

   Campos:
     id       (string)  identificador único
     date     (string)  "AAAA-MM-DD"
     tags     (array)   etiquetas libres; generan los filtros automáticamente
     pinned   (bool)    true = aparece como entrada destacada arriba
     cover    (string)  ruta de imagen. Si lo dejas "", se dibuja una portada
                        generada con el color de la primera etiqueta.
     read     (number)  minutos de lectura
     link     (string)  URL externa opcional (video, repo, paper...)
     body     (string)  HTML de la entrada. Etiquetas útiles:
                        <p> <h4> <ul><li> <blockquote> <code> <img src="">
   ============================================================================ */

window.POSTS = [
  {
    id: "demo-gich-publica",
    date: "2026-08-28",
    tags: ["GeoInt CH", "Simulación", "Demo"],
    pinned: true,
    cover: "img/FondoGeoInt.png",
    read: 3,
    link: "https://www.youtube.com/watch?v=_b7Sg5dZCNg",
    title: "Publicada la demostración técnica de GeoInt CH",
    title_en: "GeoInt CH technical demo is live",
    excerpt: "Primer recorrido en video por el simulador: terreno generado desde DEMs reales, capas de datos y el sistema de inundación corriendo sobre Unity DOTS.",
    excerpt_en: "First video walkthrough of the simulator: terrain generated from real DEMs, data layers and the flood system running on Unity DOTS.",
    body: `
      <p>Ya está disponible la primera demostración técnica pública de <strong>GeoInt CH</strong>,
      el simulador geoespacial de desastres naturales que desarrollo en colaboración con S2T-FAMAE.</p>
      <h4>Qué se ve en el video</h4>
      <ul>
        <li>Generación de terreno a partir de modelos de elevación digital reales.</li>
        <li>Reconstrucción de superficie mediante Marching Cubes con carga por chunks.</li>
        <li>Simulación de inundación paralelizada con el stack Jobs + Burst.</li>
        <li>Superposición de capas de análisis sobre el terreno.</li>
      </ul>
      <p>El objetivo no es un videojuego: es una herramienta de apoyo a la decisión, donde la
      fidelidad del dato pesa más que el espectáculo visual.</p>
      <blockquote>Este texto es un ejemplo. Reemplázalo con tu propia redacción en <code>data/posts.js</code>.</blockquote>`,
    body_en: `
      <p>The first public technical demo of <strong>GeoInt CH</strong> is out — the geospatial
      disaster simulator I develop together with S2T-FAMAE.</p>
      <h4>What the video shows</h4>
      <ul>
        <li>Terrain generation from real digital elevation models.</li>
        <li>Surface reconstruction via Marching Cubes with chunk streaming.</li>
        <li>Flood simulation parallelised with the Jobs + Burst stack.</li>
        <li>Analysis layers overlaid on the terrain.</li>
      </ul>
      <p>This is not a game: it is a decision-support tool, where data fidelity matters more
      than visual spectacle.</p>
      <blockquote>Sample text. Replace it with your own copy in <code>data/posts.js</code>.</blockquote>`
  },

  {
    id: "dots-lecciones",
    date: "2026-07-14",
    tags: ["Unity DOTS", "Rendimiento", "Devlog"],
    cover: "",
    read: 6,
    link: "",
    title: "Cinco lecciones tras un año escribiendo ECS en producción",
    title_en: "Five lessons after a year writing ECS in production",
    excerpt: "Lo que aprendí migrando sistemas de MonoBehaviour a ECS: dónde gana de verdad, dónde no compensa y cómo evitar que Burst te odie.",
    excerpt_en: "What I learned migrating systems from MonoBehaviour to ECS: where it truly wins, where it doesn't pay off, and how to keep Burst happy.",
    body: `
      <p><em>Entrada de ejemplo — sustituye este contenido por el tuyo.</em></p>
      <h4>1. ECS no es más rápido por decreto</h4>
      <p>Gana cuando el problema es de datos masivos y homogéneos. Para diez objetos únicos,
      el coste de arquitectura no se paga.</p>
      <h4>2. Burst premia el aburrimiento</h4>
      <p>Bucles simples, tipos de valor y cero managed. Cuanto menos "elegante" el código, más rápido corre.</p>
      <h4>3. Perfilar antes de rediseñar</h4>
      <p>Casi siempre el cuello de botella estaba en otro sitio del que yo pensaba.</p>`,
    body_en: `
      <p><em>Sample entry — replace this content with your own.</em></p>
      <h4>1. ECS is not automatically faster</h4>
      <p>It wins when the problem is massive and homogeneous data. For ten unique objects the
      architectural cost never pays for itself.</p>
      <h4>2. Burst rewards boring code</h4>
      <p>Simple loops, value types, zero managed allocations.</p>
      <h4>3. Profile before redesigning</h4>
      <p>The bottleneck was almost never where I assumed it was.</p>`
  },

  {
    id: "vr-multiusuario",
    date: "2026-06-02",
    tags: ["VR", "GeoInt CH", "I+D"],
    cover: "img/placeholders/geoint-vr.svg",
    read: 4,
    link: "",
    title: "Arranca la fase VR multiusuario del simulador",
    title_en: "Multiuser VR phase of the simulator kicks off",
    excerpt: "Primeras pruebas de sala compartida: dos operadores dentro del mismo terreno simulado, sincronizando estado de la inundación en tiempo real.",
    excerpt_en: "First shared-room tests: two operators inside the same simulated terrain, syncing flood state in real time.",
    body: `
      <p><em>Entrada de ejemplo.</em> Aquí puedes contar el avance de la extensión VR: qué se
      sincroniza, qué latencia toleras y cómo resuelves la interacción con las capas de datos.</p>
      <ul>
        <li>Estado autoritativo en servidor.</li>
        <li>Interpolación de la malla de agua en cliente.</li>
        <li>Herramientas de medición y marcado con las manos.</li>
      </ul>`,
    body_en: `
      <p><em>Sample entry.</em> Use this space to document the VR extension: what gets synced,
      what latency you tolerate and how data-layer interaction is solved.</p>`
  },

  {
    id: "derelict-9-concepto",
    date: "2026-05-19",
    tags: ["Derelict-9", "Terror espacial", "Diseño"],
    cover: "img/placeholders/terror-espacial.svg",
    read: 5,
    link: "",
    title: "Derelict-9: diseñar un monstruo que aprende de ti",
    title_en: "Derelict-9: designing a monster that learns from you",
    excerpt: "Notas de diseño sobre un antagonista con memoria de tus rutas: cómo mantener la tensión sin caer en la trampa de la IA injusta.",
    excerpt_en: "Design notes on an antagonist that remembers your routes: keeping tension high without falling into unfair-AI territory.",
    body: `
      <p><em>Entrada de ejemplo.</em> El reto de diseño: el jugador debe sentir que el enemigo
      aprende, pero también debe poder engañarlo. Si no hay contrajugada, no hay tensión: hay frustración.</p>
      <h4>Reglas que me impuse</h4>
      <ul>
        <li>El monstruo olvida lentamente, no de golpe.</li>
        <li>Cada escondite quemado debe abrir una alternativa nueva.</li>
        <li>El sonido siempre avisa antes que la imagen.</li>
      </ul>`,
    body_en: `
      <p><em>Sample entry.</em> The design challenge: the player must feel the enemy is learning,
      yet still be able to outsmart it. Without a counterplay there is no tension — only frustration.</p>`
  },

  {
    id: "pipeline-blender",
    date: "2026-04-07",
    tags: ["Blender", "Pipeline", "3D"],
    cover: "",
    read: 4,
    link: "",
    title: "Pipeline Blender → Unity sin sorpresas",
    title_en: "A Blender → Unity pipeline with no surprises",
    excerpt: "Escalas, ejes, nomenclatura y LODs: la lista de comprobación que uso para que un asset entre al motor bien a la primera.",
    excerpt_en: "Scale, axes, naming and LODs: the checklist I use so an asset lands in-engine correctly on the first try.",
    body: `<p><em>Entrada de ejemplo.</em> Documenta aquí tu checklist de exportación.</p>`,
    body_en: `<p><em>Sample entry.</em> Document your export checklist here.</p>`
  },

  {
    id: "hito-tesis",
    date: "2026-03-11",
    tags: ["Tesis", "Académico", "Noticias"],
    cover: "",
    read: 2,
    link: "",
    title: "Hito académico: presentación de avance de tesis",
    title_en: "Academic milestone: thesis progress review",
    excerpt: "Resumen de la presentación de avance del proyecto de título ante la comisión y los próximos objetivos comprometidos.",
    excerpt_en: "Summary of the thesis progress review before the committee and the next committed milestones.",
    body: `<p><em>Entrada de ejemplo.</em> Usa esta sección también para noticias, no solo devlogs.</p>`,
    body_en: `<p><em>Sample entry.</em> Use this section for news too, not just devlogs.</p>`
  }
];
