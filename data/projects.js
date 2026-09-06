/* ============================================================================
   PROYECTOS  ·  data/projects.js
   ----------------------------------------------------------------------------
   Edita SOLO este archivo para añadir / cambiar proyectos. No toques el HTML.

   Campos:
     id        (string)  identificador único, sin espacios
     cat       (string)  'sim' | 'war' | 'horror' | 'game' | 'vr'   -> define el color
     status    (string)  'shipped' | 'wip' | 'rnd' | 'concept'
     featured  (bool)    true = tarjeta grande destacada
     placeholder (bool)  true = muestra el sello "PLACEHOLDER" en la tarjeta
     cover     (string)  ruta de la portada (1200x675 recomendado)
     gallery   (array)   rutas de imágenes extra para la ficha
     video     (string)  ID de YouTube (solo el ID, no la URL completa)
     stack     (array)   tecnologías
     bullets   (array)   {es, en} puntos clave
     metrics   (array)   {k, v} cifras que se muestran en la ficha
     links     (array)   {label, url, icon}  icon: play|repo|drive|itch|doc|web
   ============================================================================ */

window.PROJECTS = [
  {
    id: "geoint-ch",
    cat: "sim",
    status: "wip",
    featured: true,
    year: "2024 — 2026",
    title: "GeoInt CH",
    title_en: "GeoInt CH",
    tagline: "Simulador geoespacial de desastres naturales sobre terreno real de Chile.",
    tagline_en: "Geospatial natural-disaster simulator built on real Chilean terrain.",
    role: "Desarrollador de software principal · Arquitectura DOTS",
    role_en: "Lead software developer · DOTS architecture",
    org: "S2T-FAMAE · Universidad Bernardo O'Higgins",
    cover: "img/FondoGeoInt.png",
    gallery: ["img/FondoGeoInt.png", "img/placeholders/geoint-vr.svg"],
    video: "_b7Sg5dZCNg",
    stack: ["Unity", "DOTS / ECS", "Jobs + Burst", "C#", "Marching Cubes", "DEM / GIS"],
    bullets: [
      { es: "Terreno procedural generado desde DEMs reales mediante Marching Cubes, con LOD y streaming por chunks.",
        en: "Procedural terrain generated from real DEMs via Marching Cubes, with LOD and chunk streaming." },
      { es: "Sistema de fluidos para simulación de inundaciones y aluviones, paralelizado con Jobs + Burst.",
        en: "Fluid system for flood and debris-flow simulation, parallelised with Jobs + Burst." },
      { es: "Capas de datos geoespaciales superpuestas: elevación, pendiente, cuencas y zonas de riesgo.",
        en: "Layered geospatial data: elevation, slope, watersheds and risk zones." },
      { es: "Pensado como herramienta de apoyo a la decisión, no como videojuego: precisión y trazabilidad primero.",
        en: "Designed as a decision-support tool, not a game: accuracy and traceability first." }
    ],
    metrics: [
      { k: "Entidades simuladas", k_en: "Simulated entities", v: "100K+" },
      { k: "Motor", k_en: "Engine", v: "Unity DOTS" },
      { k: "Fuente de terreno", k_en: "Terrain source", v: "DEM real" }
    ],
    links: [
      { label: "Ver demostración", label_en: "Watch demo", url: "https://www.youtube.com/watch?v=_b7Sg5dZCNg", icon: "play" },
      { label: "Documentación", label_en: "Documentation", url: "https://drive.google.com/drive/u/0/folders/1uEDFlTqeNhooDkmUV6d4Mw0A91MBSDTr", icon: "doc" }
    ]
  },

  {
    id: "geoint-vr",
    cat: "vr",
    status: "rnd",
    placeholder: true,
    year: "2026 —",
    title: "GeoInt CH · VR Multiusuario",
    title_en: "GeoInt CH · Multiuser VR",
    tagline: "Extensión en realidad virtual del simulador: varios operadores dentro del mismo escenario.",
    tagline_en: "VR extension of the simulator: several operators inside the same scenario.",
    role: "Desarrollador · Arquitectura de red y VR",
    role_en: "Developer · Networking and VR architecture",
    org: "S2T-FAMAE",
    cover: "img/placeholders/geoint-vr.svg",
    gallery: ["img/placeholders/geoint-vr.svg"],
    video: "",
    stack: ["Unity XR", "Netcode for Entities", "DOTS", "OpenXR", "C#"],
    bullets: [
      { es: "Sala compartida donde varios usuarios analizan el mismo terreno simulado en tiempo real.",
        en: "Shared room where multiple users analyse the same simulated terrain in real time." },
      { es: "Interacción directa con capas de datos: recortar, medir, marcar zonas de riesgo con las manos.",
        en: "Direct interaction with data layers: slice, measure and mark risk zones by hand." },
      { es: "Sincronización autoritativa del estado de la simulación entre clientes.",
        en: "Authoritative synchronisation of simulation state across clients." }
    ],
    metrics: [
      { k: "Estado", k_en: "Status", v: "I+D" },
      { k: "Objetivo", k_en: "Target", v: "4–8 usuarios" },
      { k: "Runtime", k_en: "Runtime", v: "OpenXR" }
    ],
    links: []
  },

  {
    id: "op-tall-grass",
    cat: "war",
    status: "concept",
    placeholder: true,
    year: "2026",
    title: 'Operación "Tall Grass"',
    title_en: 'Operation "Tall Grass"',
    tagline: "Shooter táctico ambientado en la guerra de Vietnam: emboscadas, moral y visibilidad limitada.",
    tagline_en: "Tactical shooter set in the Vietnam War: ambushes, morale and limited visibility.",
    role: "Diseñador de juego · Desarrollador",
    role_en: "Game designer · Developer",
    org: "Proyecto personal",
    cover: "img/placeholders/vietnam.svg",
    gallery: ["img/placeholders/vietnam.svg"],
    video: "",
    stack: ["Unity", "C#", "IA de escuadra", "Audio propagacional", "Blender"],
    bullets: [
      { es: "Vegetación densa como mecánica: la selva bloquea línea de visión y obliga a moverse por sonido.",
        en: "Dense vegetation as a mechanic: the jungle blocks line of sight and forces you to move by sound." },
      { es: "IA de escuadra con estados de moral, supresión y repliegue coordinado.",
        en: "Squad AI with morale states, suppression and coordinated fallback." },
      { es: "Misiones cortas, alta letalidad y rutas alternativas en lugar de pasillos.",
        en: "Short missions, high lethality and alternative routes instead of corridors." }
    ],
    metrics: [
      { k: "Género", k_en: "Genre", v: "FPS táctico" },
      { k: "Estado", k_en: "Status", v: "Concepto" },
      { k: "Ambientación", k_en: "Setting", v: "1968" }
    ],
    links: []
  },

  {
    id: "op-dust-line",
    cat: "war",
    status: "concept",
    placeholder: true,
    year: "2026",
    title: 'Operación "Dust Line"',
    title_en: 'Operation "Dust Line"',
    tagline: "Simulación de operaciones en terreno montañoso tipo Afganistán: convoyes, altitud y visión térmica.",
    tagline_en: "Operations sim in Afghan-style mountain terrain: convoys, altitude and thermal vision.",
    role: "Diseñador de sistemas · Desarrollador",
    role_en: "Systems designer · Developer",
    org: "Proyecto personal",
    cover: "img/placeholders/afganistan.svg",
    gallery: ["img/placeholders/afganistan.svg"],
    video: "",
    stack: ["Unity", "C#", "Terrenos DEM", "Balística", "Shader Graph"],
    bullets: [
      { es: "Terreno de alta cota con efecto real sobre alcance, visibilidad y desgaste de la unidad.",
        en: "High-altitude terrain that actually affects range, visibility and unit fatigue." },
      { es: "Escolta de convoyes con amenazas asimétricas y decisiones bajo información incompleta.",
        en: "Convoy escort with asymmetric threats and decisions under incomplete information." },
      { es: "Modos de visión térmica y nocturna como capas de shader sobre la cámara.",
        en: "Thermal and night vision modes as shader layers over the camera." }
    ],
    metrics: [
      { k: "Género", k_en: "Genre", v: "Milsim ligero" },
      { k: "Estado", k_en: "Status", v: "Concepto" },
      { k: "Escala", k_en: "Scale", v: "Escuadra" }
    ],
    links: []
  },

  {
    id: "derelict-9",
    cat: "horror",
    status: "concept",
    placeholder: true,
    year: "2026",
    title: "Derelict-9",
    title_en: "Derelict-9",
    tagline: "Terror espacial en primera persona: una estación a la deriva, oxígeno finito y algo que aprende de ti.",
    tagline_en: "First-person space horror: a drifting station, finite oxygen and something that learns from you.",
    role: "Director creativo · Desarrollador",
    role_en: "Creative director · Developer",
    org: "Proyecto personal",
    cover: "img/placeholders/terror-espacial.svg",
    gallery: ["img/placeholders/terror-espacial.svg"],
    video: "",
    stack: ["Unity HDRP", "C#", "IA adaptativa", "Audio 3D", "Blender"],
    bullets: [
      { es: "Antagonista con memoria: aprende tus rutas y escondites favoritos y deja de caer en ellos.",
        en: "An antagonist with memory: it learns your routes and hiding spots and stops falling for them." },
      { es: "El oxígeno es el reloj del juego; cada decisión cuesta aire.",
        en: "Oxygen is the game clock; every decision costs air." },
      { es: "Iluminación y sonido como sistema principal de tensión, sin música que anticipe los sustos.",
        en: "Lighting and sound as the main tension system, with no music telegraphing the scares." }
    ],
    metrics: [
      { k: "Género", k_en: "Genre", v: "Survival horror" },
      { k: "Estado", k_en: "Status", v: "Concepto" },
      { k: "Perspectiva", k_en: "Perspective", v: "Primera persona" }
    ],
    links: []
  },

  {
    id: "darkdead",
    cat: "game",
    status: "shipped",
    year: "2024",
    title: "DarkDead",
    title_en: "DarkDead",
    tagline: "Prototipo de videojuego 3D: gestión de assets, mecánicas y ciclo de juego completo.",
    tagline_en: "3D game prototype: asset pipeline, mechanics and a complete gameplay loop.",
    role: "Desarrollador de software principal",
    role_en: "Lead software developer",
    org: "Proyecto propio",
    cover: "img/DarkDeadBaner.png",
    gallery: ["img/DarkDeadBaner.png"],
    video: "",
    stack: ["Unity", "C#", "Blender", "Itch.io"],
    bullets: [
      { es: "Pipeline completo de modelado, importación y optimización de assets 3D.",
        en: "Full pipeline for modelling, importing and optimising 3D assets." },
      { es: "Mecánicas de combate y progresión implementadas de principio a fin.",
        en: "Combat and progression mechanics implemented end to end." },
      { es: "Publicado y jugable en navegador desde Itch.io.",
        en: "Published and playable in the browser on Itch.io." }
    ],
    metrics: [
      { k: "Plataforma", k_en: "Platform", v: "PC / Web" },
      { k: "Estado", k_en: "Status", v: "Publicado" },
      { k: "Motor", k_en: "Engine", v: "Unity" }
    ],
    links: [{ label: "Jugar en Itch.io", label_en: "Play on Itch.io", url: "https://bojal.itch.io/darkdead", icon: "itch" }]
  },

  {
    id: "rumblezone",
    cat: "game",
    status: "wip",
    year: "2025",
    title: "RumbleZone",
    title_en: "RumbleZone",
    tagline: "Videojuego multijugador online. Arquitectura de red y diseño de escenario.",
    tagline_en: "Online multiplayer game. Network architecture and level design.",
    role: "Desarrollador del sistema multijugador · Diseñador de escenario",
    role_en: "Multiplayer systems developer · Level designer",
    org: "Proyecto en equipo",
    cover: "img/RumblePortada2.png",
    gallery: ["img/RumblePortada2.png"],
    video: "",
    stack: ["Unity", "C#", "Netcode", "Blender"],
    bullets: [
      { es: "Capa de red con sincronización de estado y reconciliación de cliente.",
        en: "Networking layer with state synchronisation and client reconciliation." },
      { es: "Diseño de escenario orientado a legibilidad competitiva y rutas de flanqueo.",
        en: "Level design focused on competitive readability and flanking routes." }
    ],
    metrics: [
      { k: "Modo", k_en: "Mode", v: "Online PvP" },
      { k: "Estado", k_en: "Status", v: "En desarrollo" },
      { k: "Rol", k_en: "Role", v: "Netcode + Level" }
    ],
    links: [{ label: "Material del proyecto", label_en: "Project material", url: "https://drive.google.com/drive/u/0/folders/1Ve9ojzDymdP_3t-YNasLFpOP8MEzHL3Q", icon: "drive" }]
  },

  {
    id: "geobubs",
    cat: "game",
    status: "shipped",
    year: "2024",
    title: "GeoBubs",
    title_en: "GeoBubs",
    tagline: "Juego web interactivo desplegado en Itch.io, jugable directamente desde el navegador.",
    tagline_en: "Interactive web game deployed on Itch.io, playable straight from the browser.",
    role: "Desarrollador de software",
    role_en: "Software developer",
    org: "Proyecto propio",
    cover: "img/Geo1.png",
    gallery: ["img/Geo1.png"],
    video: "",
    stack: ["Unity WebGL", "C#", "Itch.io"],
    bullets: [
      { es: "Build WebGL optimizada para carga rápida y bajo consumo de memoria.",
        en: "WebGL build optimised for fast loading and low memory usage." },
      { es: "Bucle de juego corto y accesible, sin instalación.",
        en: "Short, accessible gameplay loop with zero install." }
    ],
    metrics: [
      { k: "Plataforma", k_en: "Platform", v: "WebGL" },
      { k: "Estado", k_en: "Status", v: "Publicado" },
      { k: "Motor", k_en: "Engine", v: "Unity" }
    ],
    links: [{ label: "Jugar en Itch.io", label_en: "Play on Itch.io", url: "https://bojal.itch.io/geobubs", icon: "itch" }]
  }
];
