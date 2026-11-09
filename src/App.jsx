import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Portfolio de Marius Ceugniet
   Tout est dans ce fichier : contenu, composants et styles.
   Pour changer un texte, modifie les constantes de la section « Contenu ».
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Contenu                                                                     */
/* -------------------------------------------------------------------------- */

// Ces deux fichiers vont dans le dossier public/ du projet.
const PHOTO_URL = "/photo-marius.jpg";
const CV_URL = "/CV_Marius_Ceugniet.pdf";

const PROFIL = {
  prenom: "Marius",
  nom: "Ceugniet",
  role: "Étudiant développeur IA & web à Epitech Lille",
  intro:
    "J’entraîne des agents qui apprennent à poser un module lunaire et je conçois des sites web pour les commerces de proximité.",
  dispo: "Disponible pour un stage de 4 mois, d’avril à juillet 2027",
  email: "ceugnietmarius@gmail.com",
  linkedin: "https://linkedin.com/in/marius-ceugniet",
  github: "https://github.com/klasken",
};

// Remplace chaque `lien` par l’URL du dépôt GitHub correspondant.
const PROJETS = [
  {
    nom: "Start Trek",
    groupe: "ia",
    description: "Agents DQN et PPO qui apprennent à poser un module lunaire.",
    stack: ["PyTorch", "Gymnasium"],
    lien: PROFIL.github,
  },
  {
    nom: "Dr Cvrie",
    groupe: "ia",
    description: "Classification d’images médicales et clustering de témoignages.",
    stack: ["Scikit-learn"],
    lien: PROFIL.github,
  },
  {
    nom: "Tardis",
    groupe: "ia",
    description: "Prédiction des retards SNCF et tableau de bord interactif.",
    stack: ["Streamlit"],
    lien: PROFIL.github,
  },
  {
    nom: "Codename",
    groupe: "ia",
    description:
      "Agent LLM durci contre l’injection de prompt, avec 5 attaques conçues et testées.",
    stack: ["Ollama"],
    lien: PROFIL.github,
  },
  {
    nom: "Chatbot & LLM",
    groupe: "ia",
    description: "Conception et déploiement d’une IA conversationnelle.",
    stack: ["LLM"],
    lien: PROFIL.github,
  },
  {
    nom: "Job Aggregator",
    groupe: "web",
    description:
      "Agrégateur d’offres d’emploi : API, authentification JWT et matching par IA.",
    stack: ["FastAPI", "MySQL", "Docker"],
    lien: PROFIL.github,
  },
  {
    nom: "Etodo",
    groupe: "web",
    description: "Application web de gestion de tâches.",
    stack: ["React", "TypeScript", "Docker"],
    lien: PROFIL.github,
  },
  {
    nom: "Hack And Juice",
    groupe: "web",
    description:
      "Recherche et exploitation de failles d’une application web vulnérable.",
    stack: ["OWASP Juice Shop"],
    lien: PROFIL.github,
  },
];

const GROUPES = [
  { id: "ia", titre: "Intelligence artificielle & data" },
  { id: "web", titre: "Développement web & cybersécurité" },
];

const EXPERIENCES = [
  {
    date: "Depuis mars 2026",
    enCours: true,
    structure: "LMS Digital",
    role: "Fondateur, création de sites web",
    meta: "Auto-entreprise, Lille",
    points: [
      "Accompagnement de plus de 10 clients, de la maquette à la mise en ligne et au suivi.",
      "Prospection de commerces de proximité sans site via Instagram, avec des maquettes personnalisées.",
      "Conception de sites vitrines responsive (HTML, CSS, JavaScript) déployés sur Netlify.",
    ],
  },
  {
    date: "Juin 2026, 1 mois",
    structure: "Obsidian Travel",
    role: "Développeur front-end React, stage",
    meta: "Stage en développement web, full remote",
    points: [
      "Conception et développement de la première vitrine web de l’entreprise : une landing page en React.",
      "Déploiement du site sur Vercel et mise en place de la redirection des prospects vers WhatsApp.",
    ],
  },
  {
    date: "Juillet – août 2024",
    structure: "Brasserie Bedague",
    role: "Employé saisonnier",
    meta: "Aire-sur-la-Lys",
    points: [
      "Création d’un tableur Excel pour calculer le prix des commandes clients.",
      "Organisation et rangement du stock de caisses de boissons par type de produit.",
    ],
  },
];

const FORMATIONS = [
  {
    date: "2025 – 2028",
    enCours: true,
    structure: "Epitech",
    role: "Bachelor Informatique, 2ᵉ année",
    meta: "Parcours IA & data, Lille",
  },
  {
    date: "2021 – 2024",
    structure: "Lycée Vauban",
    role: "Baccalauréat général",
    meta: "Spécialités Mathématiques et NSI, Aire-sur-la-Lys",
  },
];

const COMPETENCES = [
  {
    titre: "IA & data",
    items: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Gymnasium", "Streamlit"],
  },
  { titre: "LLM & automatisation", items: ["Ollama", "n8n"] },
  {
    titre: "Web",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "FastAPI", "MySQL"],
  },
  {
    titre: "Outils",
    items: ["Git / GitHub", "Docker", "Linux", "Bash", "Netlify", "Vercel"],
  },
];

const NIVEAUX = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LANGUES = [
  { nom: "Français", niveau: "Langue maternelle", rang: 6 },
  { nom: "Anglais", niveau: "B1, TOEIC 655/990", rang: 3 },
  { nom: "Espagnol", niveau: "A2", rang: 2 },
];

const FAITS = [
  { label: "Basé à", valeur: "Lille" },
  { label: "Mobilité", valeur: "Permis B, véhiculé" },
  { label: "Je cherche", valeur: "Un stage de 4 mois, avril – juillet 2027" },
  { label: "En dehors du code", valeur: "Piano, musculation, belote" },
];

/* -------------------------------------------------------------------------- */
/* Démo d’atterrissage lunaire (canvas)                                       */
/* -------------------------------------------------------------------------- */

const G = 56; // gravité, px/s²
const TMAX = 160; // poussée maximale du moteur, px/s²
const ECHELLE = 6; // 6 px = 1 m pour la télémétrie

const borne = (v, min, max) => Math.min(max, Math.max(min, v));

/* ---------- Physique du module ---------- */

// Avance le module de dt secondes. `m` décrit le monde (plateforme, sol).
// Le pilote est un simple contrôleur proportionnel-dérivé : il vise la
// plateforme à l’horizontale et ralentit la descente près du sol.
function avancerModule(s, m, dt) {
  const pied = 14 * m.taille;
  const h = m.pad.y - (s.y + pied);
  const dx = m.pad.x - s.x;

  let ax = h < 60 ? 2.2 * dx - 3.4 * s.vx : 1.6 * dx - 2.2 * s.vx;
  ax = borne(ax, -60, 60);

  // Vitesse de descente visée : freinage constant qui finit à 6 px/s au contact.
  const A = 0.55 * (TMAX - G);
  const vProfil = Math.sqrt(36 + 2 * A * Math.max(h, 0));
  let vCible = Math.min(vProfil, 210);
  let anticipation = vProfil < 210 ? A : 0;
  if (Math.abs(dx) > 24 && h < 140) {
    vCible = Math.min(vCible, h < 40 ? 3 : 22);
    anticipation = 0;
  }

  const haut = borne(G + anticipation + 6 * (s.vy - vCible), 0, TMAX);
  const angleCible = borne(Math.atan2(ax, Math.max(haut, 12)), -0.5, 0.5);
  s.lateral = angleCible - s.angle;
  s.angle += (angleCible - s.angle) * Math.min(1, dt * 5);

  // Poussée : assez pour la descente voulue, et pour la correction latérale
  // quand le module est déjà incliné du bon côté.
  const sinA = Math.sin(s.angle);
  const cosA = Math.max(0.6, Math.cos(s.angle));
  let pourLateral = sinA * ax > 0 && Math.abs(sinA) > 0.05 ? Math.abs(ax) / Math.abs(sinA) : 0;
  pourLateral = Math.min(pourLateral, (0.92 * G) / cosA); // sans jamais remonter
  const T = borne(Math.max(haut / cosA, pourLateral), 0, TMAX);
  s.poussee = T;
  s.vx += T * Math.sin(s.angle) * dt;
  s.vy += (G - T * Math.cos(s.angle)) * dt;
  s.x += s.vx * dt;
  s.y += s.vy * dt;
  s.carburant = Math.max(0, s.carburant - T * dt * 0.055);
  s.t += dt;

  const surPad = Math.abs(s.x - m.pad.x) < m.pad.w / 2;
  const solIci = surPad ? m.pad.y : m.sol(s.x);
  if (s.y + pied >= solIci) {
    s.impact = s.vy;
    s.ecart = s.x - m.pad.x;
    s.surPad = surPad;
    s.y = solIci - pied;
    s.vx = 0;
    s.vy = 0;
    s.poussee = 0;
    s.etat = "Posé";
    return true;
  }
  return false;
}

/* ---------- Dessin ---------- */

function dessinerModule(ctx, s, taille) {
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.angle);
  ctx.scale(taille, taille);

  // Flamme du moteur de descente
  if (s.poussee > 2) {
    const f = s.poussee / TMAX;
    const len = (6 + 26 * f) * (0.85 + Math.random() * 0.3);
    const halo = ctx.createRadialGradient(0, 10, 0, 0, 10, 10 + 22 * f);
    halo.addColorStop(0, `rgba(255,178,63,${0.35 * f})`);
    halo.addColorStop(1, "rgba(255,178,63,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 10, 10 + 22 * f, 0, Math.PI * 2);
    ctx.fill();

    const flamme = ctx.createLinearGradient(0, 9, 0, 9 + len);
    flamme.addColorStop(0, "rgba(255,246,222,0.95)");
    flamme.addColorStop(0.35, "rgba(255,178,63,0.9)");
    flamme.addColorStop(1, "rgba(255,110,40,0)");
    ctx.fillStyle = flamme;
    ctx.beginPath();
    ctx.moveTo(-4.5, 9);
    ctx.quadraticCurveTo(0, 9 + len * 1.25, 4.5, 9);
    ctx.closePath();
    ctx.fill();
  }

  // Petits jets de contrôle d’attitude
  if (s.etat === "Descente" && Math.abs(s.lateral) > 0.03) {
    const cote = s.lateral > 0 ? -1 : 1;
    ctx.fillStyle = "rgba(226,232,248,0.55)";
    ctx.beginPath();
    ctx.arc(cote * 12.5, -9, 1.6 + Math.random() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pieds
  ctx.strokeStyle = "#9AA6C4";
  ctx.lineWidth = 1.6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-8, 4);
  ctx.lineTo(-14.5, 14);
  ctx.moveTo(8, 4);
  ctx.lineTo(14.5, 14);
  ctx.moveTo(-18, 14);
  ctx.lineTo(-11, 14);
  ctx.moveTo(11, 14);
  ctx.lineTo(18, 14);
  ctx.stroke();

  // Tuyère
  ctx.fillStyle = "#6B7697";
  ctx.beginPath();
  ctx.moveTo(-3.5, 6);
  ctx.lineTo(3.5, 6);
  ctx.lineTo(4.5, 9.5);
  ctx.lineTo(-4.5, 9.5);
  ctx.closePath();
  ctx.fill();

  // Étage de descente (feuille dorée)
  const or = ctx.createLinearGradient(-10, 0, 10, 0);
  or.addColorStop(0, "#B9862F");
  or.addColorStop(0.5, "#E5B456");
  or.addColorStop(1, "#A97726");
  ctx.fillStyle = or;
  ctx.fillRect(-10, -1, 20, 7.5);

  // Étage de remontée
  ctx.fillStyle = "#DDE3F0";
  ctx.beginPath();
  ctx.moveTo(-8, -1);
  ctx.lineTo(-9, -7);
  ctx.lineTo(-6, -13);
  ctx.lineTo(6, -13);
  ctx.lineTo(9, -7);
  ctx.lineTo(8, -1);
  ctx.closePath();
  ctx.fill();

  // Hublot et antenne
  ctx.fillStyle = "#0F1B3D";
  ctx.beginPath();
  ctx.arc(-2.5, -8, 2.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#DDE3F0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(4, -13);
  ctx.lineTo(6.5, -17.5);
  ctx.stroke();

  ctx.restore();
}

function useAtterrissage(canvasRef) {
  const [tele, setTele] = useState({
    episode: 1,
    altitude: 0,
    vitesse: 0,
    carburant: 100,
    etat: "Descente",
  });
  const relancerRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let monde = null;
    let decor = null;
    let s = null;
    let particules = [];
    let episode = 0;
    let actif = !reduit;
    let visible = true;
    let raf = 0;
    let dernier = 0;
    let derniereMaj = 0;
    let attente = 0;

    function sol(x) {
      const d = x - monde.cx;
      return monde.cy - Math.sqrt(Math.max(0, monde.R * monde.R - d * d));
    }

    function mesurer() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const mobile = W < 760;
      const R = Math.max(W, 900) * 4;
      monde = {
        mobile,
        cx: W * 0.5,
        cy: H - (mobile ? 104 : 132) + R,
        R,
        taille: mobile ? 1.15 : 1.6,
        sol,
      };
      const padX = W * (mobile ? 0.74 : 0.75);
      monde.pad = { x: padX, y: sol(padX) - 3, w: mobile ? 66 : 104 };
      dessinerDecor();
    }

    function dessinerDecor() {
      decor = document.createElement("canvas");
      decor.width = canvas.width;
      decor.height = canvas.height;
      const g = decor.getContext("2d");
      g.scale(dpr, dpr);
      const { cx, cy, R, pad } = monde;

      const ciel = g.createLinearGradient(0, 0, 0, H);
      ciel.addColorStop(0, "#081129");
      ciel.addColorStop(1, "#13235A");
      g.fillStyle = ciel;
      g.fillRect(0, 0, W, H);

      // Étoiles fixes, tirage stable d’un rendu à l’autre
      let graine = 11;
      const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;
      const n = Math.round((W * H) / 2400);
      for (let i = 0; i < n; i++) {
        const x = alea() * W;
        const y = alea() * (H - 80);
        const grosse = alea() < 0.06;
        const r = grosse ? 1.25 : 0.35 + alea() * 0.6;
        g.fillStyle = `rgba(226,232,248,${grosse ? 0.9 : 0.2 + alea() * 0.55})`;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      }

      // Halo au-dessus de l’horizon
      const halo = g.createRadialGradient(cx, cy, R - 4, cx, cy, R + 220);
      halo.addColorStop(0, "rgba(120,150,235,0.22)");
      halo.addColorStop(1, "rgba(120,150,235,0)");
      g.fillStyle = halo;
      g.fillRect(0, 0, W, H);

      // Sol lunaire
      const top = sol(cx);
      const terre = g.createLinearGradient(0, top, 0, H);
      terre.addColorStop(0, "#2B3C78");
      terre.addColorStop(0.3, "#1A2A5E");
      terre.addColorStop(1, "#0D1838");
      g.fillStyle = terre;
      g.beginPath();
      g.arc(cx, cy, R, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "rgba(201,209,228,0.4)";
      g.lineWidth = 1.2;
      g.stroke();

      // Cratères
      for (let i = 0; i < 14; i++) {
        const x = alea() * W;
        if (Math.abs(x - pad.x) < pad.w) continue;
        const y0 = sol(x);
        const y = y0 + 14 + alea() * Math.max(10, H - y0 - 30);
        const rx = 5 + alea() * 20;
        g.fillStyle = "rgba(6,12,34,0.38)";
        g.beginPath();
        g.ellipse(x, y, rx, rx * 0.26, 0, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = "rgba(201,209,228,0.08)";
        g.lineWidth = 1;
        g.beginPath();
        g.ellipse(x, y + 0.8, rx, rx * 0.26, 0, 0.1, Math.PI - 0.1);
        g.stroke();
      }

      // Plateforme et fanions
      const t = monde.taille;
      g.fillStyle = "#1A2A5E";
      g.fillRect(pad.x - pad.w / 2, pad.y, pad.w, 10);
      g.fillStyle = "#4A5C99";
      g.fillRect(pad.x - pad.w / 2, pad.y, pad.w, 3);
      for (const cote of [-1, 1]) {
        const px = pad.x + (cote * pad.w) / 2;
        g.strokeStyle = "#C9D1E4";
        g.lineWidth = 1.2;
        g.beginPath();
        g.moveTo(px, pad.y);
        g.lineTo(px, pad.y - 19 * t);
        g.stroke();
        g.fillStyle = "#FFB23F";
        g.beginPath();
        g.moveTo(px, pad.y - 19 * t);
        g.lineTo(px + 8 * t, pad.y - 16.2 * t);
        g.lineTo(px, pad.y - 13.4 * t);
        g.closePath();
        g.fill();
      }
    }

    function poussiere(x, y, n, force) {
      for (let i = 0; i < n && particules.length < 220; i++) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const vie = 0.7 + Math.random() * 0.8;
        particules.push({
          x: x + dir * Math.random() * 8,
          y: y - 1,
          sol: y,
          vx: dir * (25 + Math.random() * 80) * force,
          vy: -(8 + Math.random() * 34) * force,
          vie,
          vieMax: vie,
          r: 0.8 + Math.random() * 1.6,
        });
      }
    }

    function nouvelEpisode() {
      episode += 1;
      const { pad, mobile } = monde;
      const portee = Math.min(W * (mobile ? 0.38 : 0.2), 260);
      const x = borne(pad.x + (Math.random() * 2 - 1) * portee, 30, W - 30);
      s = {
        x,
        y: -40,
        // Le module arrive déjà en approche, un peu décalé de la plateforme.
        vx: (pad.x - x) * (0.12 + Math.random() * 0.14) + (Math.random() * 2 - 1) * 12,
        vy: 70 + Math.random() * 30,
        angle: 0,
        poussee: 0,
        lateral: 0,
        carburant: 100,
        etat: "Descente",
        t: 0,
      };
      particules = [];
      attente = 0;
    }

    function pas(dt) {
      if (s.etat === "Descente") {
        const h = monde.pad.y - (s.y + 14 * monde.taille);
        if (h < 46 && s.poussee > 10 && Math.random() < 0.7) {
          poussiere(s.x, monde.pad.y, 1, s.poussee / TMAX);
        }
        if (avancerModule(s, monde, dt)) {
          poussiere(s.x, s.y + 14 * monde.taille, 28, 1);
          attente = reduit ? 1.6 : 3.2;
        }
      } else {
        s.angle *= Math.max(0, 1 - dt * 6);
        attente -= dt;
        if (attente <= 0) {
          if (reduit) actif = false;
          else nouvelEpisode();
        }
      }
      for (const p of particules) {
        p.vy += 60 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vie -= dt;
        if (p.y > p.sol) {
          p.y = p.sol;
          p.vy *= -0.2;
          p.vx *= 0.6;
        }
      }
      particules = particules.filter((p) => p.vie > 0);
    }

    function dessiner() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(decor, 0, 0, W, H);
      for (const p of particules) {
        ctx.fillStyle = `rgba(201,209,228,${(0.55 * p.vie) / p.vieMax})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      dessinerModule(ctx, s, monde.taille);
    }

    function publier() {
      const h = monde.pad.y - (s.y + 14 * monde.taille);
      setTele({
        episode,
        altitude: Math.max(0, h / ECHELLE),
        vitesse: s.etat === "Posé" ? 0 : -s.vy / ECHELLE,
        carburant: Math.round(s.carburant),
        etat: s.etat,
      });
    }

    // Avec « réduire les animations », on affiche directement le module posé.
    function poserSansAnimation() {
      for (let i = 0; i < 4000 && s.etat === "Descente"; i++) avancerModule(s, monde, 1 / 60);
      particules = [];
      dessiner();
      publier();
    }

    function boucle(t) {
      raf = requestAnimationFrame(boucle);
      const dt = dernier ? Math.min(0.033, (t - dernier) / 1000) : 1 / 60;
      dernier = t;
      if (!visible || !actif) return;
      pas(dt);
      dessiner();
      if (t - derniereMaj > 120) {
        derniereMaj = t;
        publier();
      }
    }

    mesurer();
    nouvelEpisode();
    if (reduit) poserSansAnimation();
    raf = requestAnimationFrame(boucle);

    relancerRef.current = () => {
      nouvelEpisode();
      actif = true;
      dessiner();
      publier();
    };

    let largeur = W;
    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      if (Math.abs(r.width - W) < 1 && Math.abs(r.height - H) < 1) return;
      mesurer();
      if (Math.abs(W - largeur) >= 1) {
        largeur = W;
        nouvelEpisode();
        if (reduit) poserSansAnimation();
      } else {
        dessiner();
      }
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [canvasRef]);

  return { tele, relancer: () => relancerRef.current() };
}

const nombre = (v, dec = 1) =>
  v.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/* -------------------------------------------------------------------------- */
/* Composants                                                                  */
/* -------------------------------------------------------------------------- */

function Nav() {
  const [solide, setSolide] = useState(false);
  useEffect(() => {
    const maj = () => setSolide(window.scrollY > window.innerHeight * 0.7);
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    window.addEventListener("resize", maj);
    return () => {
      window.removeEventListener("scroll", maj);
      window.removeEventListener("resize", maj);
    };
  }, []);

  return (
    <header className={`nav${solide ? " nav--solide" : ""}`}>
      <div className="conteneur nav-int">
        <a className="nav-nom" href="#haut">
          {PROFIL.prenom} {PROFIL.nom}
        </a>
        <nav aria-label="Sections">
          <ul className="nav-liens">
            <li><a href="#projets">Projets</a></li>
            <li><a href="#parcours">Parcours</a></li>
            <li><a href="#competences">Compétences</a></li>
          </ul>
        </nav>
        <a className="nav-dispo" href="#contact">
          <span className="point" aria-hidden="true" />
          <span className="nav-dispo-long">Stage avril – juillet 2027</span>
          <span className="nav-dispo-court">Contact</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const canvasRef = useRef(null);
  const { tele, relancer } = useAtterrissage(canvasRef);

  return (
    <section className="hero" id="haut">
      <canvas ref={canvasRef} className="hero-ciel" aria-hidden="true" />
      <div className="conteneur hero-contenu">
        <h1 className="hero-titre">
          <span>{PROFIL.prenom}</span>
          <span>{PROFIL.nom}</span>
        </h1>
        <p className="hero-role">{PROFIL.role}</p>
        <p className="hero-intro">{PROFIL.intro}</p>
        <p className="hero-dispo">
          <span className="point" aria-hidden="true" />
          {PROFIL.dispo}
        </p>
        <div className="hero-actions">
          <a className="btn btn--feu" href="#projets">Voir mes projets</a>
          <a className="btn btn--contour" href="#contact">Me contacter</a>
        </div>
      </div>

      <div className="hud">
        <p className="hud-legende">
          Démo du projet Start Trek. Ici, un contrôleur simple pilote le module&#8239;; dans le
          projet, ce sont des agents DQN et PPO qui apprennent à le poser.
        </p>
        <div className="hud-ligne">
          <dl className="hud-mesures">
            <div>
              <dt>Épisode</dt>
              <dd>{tele.episode}</dd>
            </div>
            <div>
              <dt>Altitude</dt>
              <dd>{nombre(tele.altitude)}&nbsp;m</dd>
            </div>
            <div className="hud-option">
              <dt>Vitesse</dt>
              <dd>{nombre(tele.vitesse).replace(/^-/, "−")}&nbsp;m/s</dd>
            </div>
            <div className="hud-option">
              <dt>Carburant</dt>
              <dd>{tele.carburant}&nbsp;%</dd>
            </div>
            <div>
              <dt>État</dt>
              <dd>{tele.etat}</dd>
            </div>
          </dl>
          <button type="button" className="btn btn--hud" onClick={relancer}>
            Relancer la descente
          </button>
        </div>
      </div>
    </section>
  );
}

function APropos() {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <section className="section section--papier" id="a-propos" aria-labelledby="titre-apropos">
      <div className="conteneur apropos">
        <div className="hublot">
          {photoOk ? (
            <img
              src={PHOTO_URL}
              alt={`Portrait de ${PROFIL.prenom} ${PROFIL.nom}`}
              width="240"
              height="240"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <span className="hublot-initiales" aria-hidden="true">
              {PROFIL.prenom[0]}
              {PROFIL.nom[0]}
            </span>
          )}
          <span className="hublot-satellite" aria-hidden="true" />
        </div>

        <div className="apropos-texte">
          <h2 className="titre-section" id="titre-apropos">À propos</h2>
          <p className="chapeau">
            Je suis en 2ᵉ&nbsp;année du Bachelor Informatique d’Epitech Lille, dans le parcours
            IA & data. Mes projets vont de l’apprentissage par renforcement à la sécurité des LLM,
            en passant par le développement web avec React et FastAPI.
          </p>
          <p>
            Depuis mars 2026, je crée aussi des sites vitrines pour les commerces de proximité avec
            mon auto-entreprise, LMS Digital&#8239;: plus de 10&nbsp;clients accompagnés, de la
            maquette à la mise en ligne.
          </p>
          <dl className="faits">
            {FAITS.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Projets() {
  const [filtre, setFiltre] = useState("tous");
  const options = [
    { id: "tous", label: "Tous", n: PROJETS.length },
    { id: "ia", label: "IA & data", n: PROJETS.filter((p) => p.groupe === "ia").length },
    { id: "web", label: "Web & cybersécurité", court: "Web & cyber", n: PROJETS.filter((p) => p.groupe === "web").length },
  ];
  const groupes = GROUPES.filter((g) => filtre === "tous" || g.id === filtre);

  return (
    <section className="section section--blanc" id="projets" aria-labelledby="titre-projets">
      <div className="conteneur">
        <div className="entete">
          <div>
            <h2 className="titre-section" id="titre-projets">Projets</h2>
            <p className="entete-texte">
              Huit projets, de l’apprentissage par renforcement à la sécurité web. Le code est
              sur GitHub.
            </p>
          </div>
          <div className="filtres" role="group" aria-label="Filtrer les projets">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                className="filtre"
                aria-pressed={filtre === o.id}
                onClick={() => setFiltre(o.id)}
              >
                {o.court ? (
                  <>
                    <span className="filtre-long">{o.label}</span>
                    <span className="filtre-court">{o.court}</span>
                  </>
                ) : (
                  o.label
                )}
                <span className="filtre-n">{o.n}</span>
              </button>
            ))}
          </div>
        </div>

        {groupes.map((g) => {
          const liste = PROJETS.filter((p) => p.groupe === g.id);
          return (
            <div className="groupe" key={g.id}>
              <h3 className="groupe-titre">
                {g.titre}
                <span>{liste.length}&nbsp;projets</span>
              </h3>
              <ul className="projets">
                {liste.map((p) => (
                  <li key={p.nom} className="projet">
                    <a className="projet-lien" href={p.lien} target="_blank" rel="noreferrer">
                      <span className="projet-nom">{p.nom}</span>
                      <span className="projet-desc">{p.description}</span>
                      <span className="projet-fin">
                        <span className="tags">
                          {p.stack.map((t) => (
                            <span className="tag" key={t}>{t}</span>
                          ))}
                        </span>
                        <span className="projet-code">Code sur GitHub</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Etapes({ items }) {
  return (
    <ol className="etapes">
      {items.map((e) => (
        <li key={e.structure} className={`etape${e.enCours ? " etape--en-cours" : ""}`}>
          <p className="etape-date">{e.date}</p>
          <h4 className="etape-structure">{e.structure}</h4>
          <p className="etape-role">{e.role}</p>
          <p className="etape-meta">{e.meta}</p>
          {e.points && (
            <ul className="etape-points">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function Parcours() {
  return (
    <section className="section section--papier" id="parcours" aria-labelledby="titre-parcours">
      <div className="conteneur">
        <h2 className="titre-section" id="titre-parcours">Parcours</h2>
        <p className="legende-etapes">
          <span className="point" aria-hidden="true" /> En cours
        </p>
        <div className="parcours">
          <div>
            <h3 className="sous-titre">Expérience</h3>
            <Etapes items={EXPERIENCES} />
          </div>
          <div>
            <h3 className="sous-titre">Formation</h3>
            <Etapes items={FORMATIONS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Competences() {
  return (
    <section className="section section--blanc" id="competences" aria-labelledby="titre-comp">
      <div className="conteneur">
        <h2 className="titre-section" id="titre-comp">Compétences</h2>
        <div className="comp-grille">
          {COMPETENCES.map((c) => (
            <div key={c.titre}>
              <h3 className="sous-titre">{c.titre}</h3>
              <ul className="tags tags--grand">
                {c.items.map((i) => (
                  <li className="tag" key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="sous-titre sous-titre--espace">Langues</h3>
        <div className="langues">
          {LANGUES.map((l) => (
            <div key={l.nom} className="langue">
              <p className="langue-tete">
                <strong>{l.nom}</strong>
                <span>{l.niveau}</span>
              </p>
              <ol
                className="cecrl"
                aria-label={
                  l.rang === 6 ? "Langue maternelle" : `Niveau ${NIVEAUX[l.rang - 1]} sur l’échelle européenne A1 à C2`
                }
              >
                {NIVEAUX.map((n, i) => (
                  <li key={n} className={i < l.rang ? "plein" : ""} aria-hidden="true">
                    {n}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copie, setCopie] = useState(false);
  const copier = async () => {
    try {
      await navigator.clipboard.writeText(PROFIL.email);
      setCopie(true);
      setTimeout(() => setCopie(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFIL.email}`;
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="titre-contact">
      <div className="conteneur contact-int">
        <h2 className="contact-titre" id="titre-contact">
          Un stage d’avril à&nbsp;juillet 2027&#8239;?
        </h2>
        <p className="contact-texte">
          Je cherche un stage de 4&nbsp;mois en développement informatique, côté IA comme côté
          web. Le plus simple pour me joindre, c’est par e-mail.
        </p>

        <div className="email">
          <a className="email-lien" href={`mailto:${PROFIL.email}`}>
            {PROFIL.email}
          </a>
          <button type="button" className="btn btn--contour btn--petit" onClick={copier}>
            {copie ? "Adresse copiée" : "Copier l’adresse"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copie ? "Adresse e-mail copiée" : ""}
          </span>
        </div>

        <ul className="contact-liens">
          <li>
            <a className="btn btn--feu" href={CV_URL} download>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v9m0 0L4.5 7M8 10.5 11.5 7M2.5 13.5h11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Télécharger mon CV
            </a>
          </li>
          <li>
            <a className="btn btn--contour" href={PROFIL.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="btn btn--contour" href={PROFIL.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
        <p className="contact-note">Basé à Lille, permis B et véhiculé.</p>
      </div>

      <div className="horizon" aria-hidden="true">
        <svg className="horizon-sol" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path d="M0 60 Q500 0 1000 60 L1000 120 L0 120 Z" fill="#1A2A5E" />
          <path d="M0 60 Q500 0 1000 60" fill="none" stroke="rgba(201,209,228,.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="horizon-module" viewBox="-20 -19 40 34" width="48" height="41">
          <path d="M-8 4-14.5 14M8 4l6.5 10M-18 14h7M11 14h7" stroke="#9AA6C4" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M-3.5 6h7l1 3.5h-9z" fill="#6B7697" />
          <rect x="-10" y="-1" width="20" height="7.5" fill="#D9A646" />
          <path d="M-8-1-9-7l3-6h12l3 6-1 6z" fill="#DDE3F0" />
          <circle cx="-2.5" cy="-8" r="2.3" fill="#0F1B3D" />
          <path d="M4-13l2.5-4.5" stroke="#DDE3F0" strokeWidth="1" />
        </svg>
      </div>
      <footer className="pied">
        <div className="conteneur">© 2026 {PROFIL.prenom} {PROFIL.nom}</div>
      </footer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Application                                                                 */
/* -------------------------------------------------------------------------- */

export default function App() {
  useEffect(() => {
    document.title = `${PROFIL.prenom} ${PROFIL.nom}, développeur IA & web`;
    document.documentElement.lang = "fr";
    if (!document.getElementById("police-archivo")) {
      const pre = document.createElement("link");
      pre.rel = "preconnect";
      pre.href = "https://fonts.gstatic.com";
      pre.crossOrigin = "anonymous";
      const lien = document.createElement("link");
      lien.id = "police-archivo";
      lien.rel = "stylesheet";
      lien.href =
        "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap";
      document.head.append(pre, lien);
    }
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <a className="evitement" href="#a-propos">Aller au contenu</a>
      <Nav />
      <main>
        <Hero />
        <APropos />
        <Projets />
        <Parcours />
        <Competences />
      </main>
      <Contact />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
/* -------------------------------------------------------------------------- */

const CSS = `
:root {
  --nuit: #0F1B3D;
  --encre: #14254F;
  --texte: #2E3A5E;
  --brume: #5D6787;
  --papier: #EEF1F6;
  --blanc: #FFFFFF;
  --trait: #D5DBE7;
  --trait-fort: #B7C0D4;
  --lune: #C9D1E4;
  --feu: #FFB23F;
  --feu-fonce: #9A5A00;
  --rayon: 14px;
  --gouttiere: 32px;
  color-scheme: light;
}

/* Remise à zéro (neutralise aussi le index.css par défaut de Vite) */
*, *::before, *::after { box-sizing: border-box; }
html { background: var(--papier); -webkit-text-size-adjust: 100%; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
html body {
  margin: 0; padding: 0; display: block; min-width: 0; min-height: 0; place-items: initial;
  background: var(--papier); color: var(--texte);
  font-family: "Archivo", "Archivo Variable", "Helvetica Neue", Arial, sans-serif;
  font-stretch: 100%; font-size: 17px; line-height: 1.6; font-weight: 400;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
#root { max-width: none; width: 100%; margin: 0; padding: 0; text-align: left; }
h1, h2, h3, h4, p, ul, ol, dl, dd { margin: 0; }
ul, ol { padding: 0; }
a, a:hover { color: inherit; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0; border-radius: 0; cursor: pointer; }
img { max-width: 100%; }
::selection { background: var(--feu); color: var(--nuit); }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--feu-fonce); outline-offset: 3px; border-radius: 6px; }
.hero :focus-visible, .contact :focus-visible, .nav:not(.nav--solide) :focus-visible { outline-color: var(--feu); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.evitement { position: absolute; left: 16px; top: -60px; z-index: 100; background: var(--feu); color: var(--nuit); padding: 10px 16px; border-radius: 999px; font-weight: 650; text-decoration: none; }
.evitement:focus { top: 12px; }

.conteneur { width: min(1240px, 100% - var(--gouttiere) * 2); margin-inline: auto; }
.point { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: var(--feu); box-shadow: 0 0 0 4px rgba(255,178,63,.2); flex: none; }

/* Boutons */
.btn {
  display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 22px;
  border-radius: 999px; border: 1.5px solid transparent; font-stretch: 112%; font-weight: 650;
  font-size: .9688rem; letter-spacing: .005em; text-decoration: none; white-space: nowrap;
  transition: background-color .2s, border-color .2s, color .2s;
}
.btn--feu, .btn--feu:hover { background: var(--feu); color: var(--nuit); border-color: var(--feu); }
.btn--feu:hover { background: #FFC266; border-color: #FFC266; }
.btn--contour, .btn--contour:hover { color: #fff; border-color: rgba(255,255,255,.34); background: transparent; }
.btn--contour:hover { border-color: #fff; background: rgba(255,255,255,.06); }
.btn--petit { min-height: 40px; padding: 0 16px; font-size: .875rem; }

/* Navigation */
.nav { position: fixed; inset: 0 0 auto 0; z-index: 50; color: #fff; transition: background-color .25s, color .25s, box-shadow .25s; }
.nav--solide { background: rgba(238,241,246,.9); color: var(--encre); box-shadow: 0 1px 0 var(--trait); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
.nav-int { height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.nav-nom, .nav-nom:hover { font-stretch: 125%; font-weight: 800; font-size: 1rem; letter-spacing: -.01em; text-decoration: none; }
.nav-liens { display: flex; gap: 30px; list-style: none; }
.nav-liens a { font-weight: 550; font-size: .9375rem; text-decoration: none; opacity: .82; transition: opacity .2s; }
.nav-liens a:hover { opacity: 1; text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 1.5px; }
.nav-dispo, .nav-dispo:hover {
  display: inline-flex; align-items: center; gap: 10px; height: 38px; padding: 0 16px 0 14px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.28); font-size: .875rem; font-weight: 600; font-stretch: 108%; text-decoration: none;
  transition: background-color .2s, border-color .2s;
}
.nav-dispo:hover { border-color: rgba(255,255,255,.7); }
.nav--solide .nav-dispo { background: var(--blanc); border-color: var(--trait); }
.nav--solide .nav-dispo:hover { border-color: var(--trait-fort); }
.nav-dispo-court { display: none; }

/* Hero */
.hero { position: relative; isolation: isolate; min-height: max(100svh, 700px); display: flex; flex-direction: column; background: #081129; color: #fff; overflow: hidden; }
.hero-ciel { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: -1; }
.hero-contenu { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 112px 0 216px; }
.hero-titre { display: flex; flex-direction: column; font-stretch: 125%; font-weight: 800; font-size: clamp(3.25rem, 9vw, 8.5rem); line-height: .9; letter-spacing: -.025em; color: #fff; }
.hero-role { margin-top: 28px; font-stretch: 112%; font-weight: 600; font-size: clamp(1.125rem, 1.7vw, 1.375rem); color: #fff; }
.hero-intro { margin-top: 12px; max-width: 34em; font-size: clamp(1.0625rem, 1.3vw, 1.1875rem); color: var(--lune); }
.hero-dispo { margin-top: 28px; display: flex; align-items: flex-start; gap: 12px; font-weight: 600; color: #fff; }
.hero-dispo .point { margin-top: .5em; }
.hero-actions { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 12px; }

.hud { position: absolute; left: calc((100% - min(1240px, 100% - var(--gouttiere) * 2)) / 2); bottom: 22px; display: grid; gap: 10px; color: #fff; }
.hud-legende { max-width: 38em; font-size: .8125rem; line-height: 1.45; color: var(--lune); }
.hud-ligne { display: flex; align-items: center; gap: 28px; }
.hud-mesures { display: flex; gap: 26px; }
.hud-mesures dt { font-size: .75rem; color: var(--lune); opacity: .8; }
.hud-mesures dd { font-stretch: 108%; font-weight: 650; font-size: .9688rem; font-variant-numeric: tabular-nums; min-width: 4.6em; white-space: nowrap; }
.btn--hud, .btn--hud:hover { min-height: 38px; padding: 0 16px; font-size: .8438rem; color: #fff; border-color: rgba(255,255,255,.3); background: rgba(8,17,41,.55); }
.btn--hud:hover { border-color: #fff; }

/* Sections */
.section { padding-block: clamp(88px, 11vw, 150px); }
.section--papier { background: var(--papier); }
.section--blanc { background: var(--blanc); }
.titre-section { font-stretch: 125%; font-weight: 800; font-size: clamp(2.375rem, 5.2vw, 4.25rem); line-height: 1; letter-spacing: -.025em; color: var(--encre); }
.sous-titre { font-stretch: 112%; font-weight: 700; font-size: 1.0625rem; color: var(--encre); }

/* À propos */
.apropos { display: grid; grid-template-columns: 280px 1fr; gap: 80px; align-items: start; }
.hublot { position: relative; width: 240px; aspect-ratio: 1; margin: 22px; }
.hublot::before { content: ""; position: absolute; inset: -18px; border-radius: 50%; border: 1px solid var(--trait-fort); }
.hublot img, .hublot-initiales { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; background: var(--blanc); }
.hublot-initiales { display: grid; place-items: center; font-stretch: 125%; font-weight: 800; font-size: 4rem; color: var(--encre); }
.hublot-satellite { position: absolute; left: 208px; top: 15px; width: 13px; height: 13px; border-radius: 50%; background: var(--feu); box-shadow: 0 0 0 5px var(--papier); }
.apropos-texte { max-width: 44em; }
.apropos-texte .titre-section { margin-bottom: 28px; }
.apropos-texte p + p { margin-top: 16px; }
.chapeau { font-size: clamp(1.1875rem, 1.6vw, 1.375rem); line-height: 1.5; color: var(--encre); }
.faits { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; border-top: 1px solid var(--trait); }
.faits > div { padding: 16px 0; border-bottom: 1px solid var(--trait); }
.faits dt { font-size: .8125rem; color: var(--brume); }
.faits dd { margin-top: 2px; font-weight: 600; color: var(--encre); }

/* Projets */
.entete { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; }
.entete-texte { margin-top: 20px; max-width: 34em; font-size: 1.0625rem; }
.filtres { display: inline-flex; padding: 4px; gap: 2px; border-radius: 999px; background: var(--papier); }
.filtre { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; font-size: .9063rem; font-weight: 600; font-stretch: 106%; color: var(--brume); transition: background-color .2s, color .2s; }
.filtre:hover { color: var(--encre); }
.filtre[aria-pressed="true"] { background: var(--encre); color: #fff; }
.filtre-n { font-variant-numeric: tabular-nums; opacity: .65; font-weight: 500; }
.filtre-court { display: none; }
.entete > * { min-width: 0; }
.groupe { margin-top: 64px; }
.groupe-titre { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding-bottom: 14px; border-bottom: 2px solid var(--encre); font-stretch: 112%; font-weight: 700; font-size: 1.0625rem; color: var(--encre); }
.groupe-titre span { font-weight: 500; font-size: .875rem; color: var(--brume); font-stretch: 100%; }
.projets { list-style: none; }
.projet { border-bottom: 1px solid var(--trait); }
.projet-lien, .projet-lien:hover {
  display: grid; grid-template-columns: minmax(220px, 300px) 1fr auto; gap: 8px 40px; align-items: baseline;
  padding: 26px 20px; margin-inline: -20px; text-decoration: none; color: var(--texte); border-radius: var(--rayon);
  transition: background-color .2s;
}
.projet-lien:hover { background: var(--papier); }
.projet-nom { font-stretch: 120%; font-weight: 750; font-size: clamp(1.375rem, 2.2vw, 1.75rem); line-height: 1.15; letter-spacing: -.015em; color: var(--encre); }
.projet-desc { font-size: 1.0313rem; }
.projet-fin { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
.projet-code { font-size: .875rem; font-weight: 600; color: var(--feu-fonce); text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 4px; transition: text-decoration-color .2s; }
.projet-lien:hover .projet-code { text-decoration-color: currentColor; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; justify-content: flex-end; }
.tag { display: inline-flex; align-items: center; height: 28px; padding: 0 11px; border-radius: 999px; border: 1px solid var(--trait); font-size: .8125rem; font-weight: 550; color: var(--texte); white-space: nowrap; }
.tags--grand { margin-top: 16px; justify-content: flex-start; gap: 8px; }
.tags--grand .tag { height: 36px; padding: 0 14px; font-size: .9375rem; background: var(--papier); border-color: transparent; color: var(--encre); }

/* Parcours */
.legende-etapes { margin-top: 18px; display: flex; align-items: center; gap: 10px; font-size: .875rem; color: var(--brume); }
.parcours { margin-top: 56px; display: grid; grid-template-columns: 1.55fr 1fr; gap: 72px; }
.etapes { list-style: none; margin-top: 28px; }
.etape { position: relative; padding: 0 0 44px 32px; border-left: 1.5px solid var(--trait-fort); margin-left: 5px; }
.etape:last-child { padding-bottom: 0; border-left-color: transparent; }
.etape::before { content: ""; position: absolute; left: -7px; top: 5px; width: 9px; height: 9px; border-radius: 50%; background: var(--papier); border: 2px solid var(--encre); }
.etape--en-cours::before { background: var(--feu); border-color: var(--feu); box-shadow: 0 0 0 4px rgba(255,178,63,.25); }
.etape-date { font-size: .875rem; font-weight: 600; color: var(--brume); font-variant-numeric: tabular-nums; }
.etape-structure { margin-top: 6px; font-stretch: 120%; font-weight: 750; font-size: 1.5rem; line-height: 1.2; letter-spacing: -.01em; color: var(--encre); }
.etape-role { margin-top: 4px; font-weight: 600; color: var(--encre); }
.etape-meta { font-size: .9375rem; color: var(--brume); }
.etape-points { margin-top: 14px; padding-left: 18px; display: grid; gap: 6px; }
.etape-points li::marker { color: var(--trait-fort); }

/* Compétences */
.comp-grille { margin-top: 56px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
.sous-titre--espace { margin-top: 64px; }
.langues { margin-top: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.langue-tete { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
.langue-tete strong { font-weight: 650; color: var(--encre); }
.langue-tete span { font-size: .875rem; color: var(--brume); }
.cecrl { margin-top: 10px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; list-style: none; }
.cecrl li { height: 30px; display: grid; place-items: center; border-radius: 6px; border: 1px solid var(--trait); font-size: .75rem; font-weight: 600; color: var(--brume); font-variant-numeric: tabular-nums; }
.cecrl li.plein { background: var(--encre); border-color: var(--encre); color: #fff; }

/* Contact */
.contact { position: relative; background: var(--nuit); color: #fff; padding-top: clamp(96px, 12vw, 160px); overflow: hidden; }
.contact-titre { font-stretch: 125%; font-weight: 800; font-size: clamp(2.25rem, 5.6vw, 4.75rem); line-height: 1.02; letter-spacing: -.025em; max-width: 13em; }
.contact-texte { margin-top: 24px; max-width: 34em; font-size: 1.125rem; color: var(--lune); }
.email { margin-top: 44px; display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; }
.email-lien, .email-lien:hover { font-stretch: 112%; font-weight: 700; font-size: clamp(1.375rem, 3.4vw, 2.5rem); letter-spacing: -.015em; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 8px; text-decoration-color: rgba(255,178,63,.6); overflow-wrap: anywhere; }
.email-lien:hover { text-decoration-color: var(--feu); }
.contact-liens { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 12px; list-style: none; }
.contact-note { margin-top: 28px; font-size: .9375rem; color: var(--lune); }
.horizon { position: relative; height: 150px; margin-top: 72px; }
.horizon-sol { position: absolute; inset: 0; width: 100%; height: 100%; }
.horizon-module { position: absolute; left: calc(78% - 24px); bottom: 99px; }
.pied { position: absolute; left: 0; right: 0; bottom: 22px; font-size: .8125rem; color: var(--lune); }

/* Responsive */
@media (max-width: 1100px) {
  .hud-option { display: none; }
  .apropos { grid-template-columns: 240px 1fr; gap: 56px; }
  .hublot { width: 200px; }
  .hublot-satellite { left: 172px; top: 10px; }
  .comp-grille { grid-template-columns: repeat(2, 1fr); }
  .parcours { gap: 48px; }
}
@media (max-width: 900px) {
  .projet-lien, .projet-lien:hover { grid-template-columns: 1fr; gap: 8px; }
  .projet-fin { flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-between; margin-top: 8px; }
  .tags { justify-content: flex-start; }
  .parcours { grid-template-columns: 1fr; gap: 56px; }
  .langues { grid-template-columns: 1fr; gap: 28px; max-width: 30em; }
  .hud-legende { max-width: 26em; }
}
@media (max-width: 760px) {
  :root { --gouttiere: 16px; }
  html body { font-size: 16px; }
  .nav-liens { display: none; }
  .nav-dispo-long { display: none; }
  .nav-dispo-court { display: inline; }
  .hero-contenu { padding: 104px 0 180px; justify-content: flex-start; }
  .hero-role { margin-top: 22px; }
  .hud { bottom: 18px; }
  .hud-legende, .hud-mesures { display: none; }
  .apropos { grid-template-columns: 1fr; gap: 32px; }
  .hublot { width: 150px; margin: 18px; }
  .hublot::before { inset: -14px; }
  .hublot-satellite { left: 128px; top: 4px; width: 11px; height: 11px; }
  .faits { grid-template-columns: 1fr; }
  .filtres { display: flex; width: 100%; }
  .filtre { flex: 1 1 auto; justify-content: center; padding: 0 12px; }
  .filtre-long { display: none; }
  .filtre-court { display: inline; }
  .hero-titre { font-size: clamp(3.25rem, 15.4vw, 4.5rem); }
  .projet-lien, .projet-lien:hover { padding: 22px 12px; margin-inline: -12px; }
  .comp-grille { grid-template-columns: 1fr; gap: 32px; margin-top: 40px; }
  .groupe { margin-top: 48px; }
  .horizon { height: 110px; }
  .horizon-module { bottom: 72px; }
}
`;