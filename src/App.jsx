import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Portfolio de Marius Ceugniet, dans l'identité visuelle de LMS Digital
   (fond nuit, nébuleuse, dégradé cyan → orange, Unbounded + Hanken Grotesk).
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
  email: "ceugnietmarius@gmail.com",
  linkedin: "https://linkedin.com/in/marius-ceugniet",
  linkedinCourt: "linkedin.com/in/marius-ceugniet",
  github: "https://github.com/klasken",
  githubCourt: "github.com/klasken",
};

// Les 4 couleurs du dégradé LMS.
const C = { cyan: "#4fd1ff", violet: "#8b7bff", magenta: "#f062c0", orange: "#ff9f5a" };

const DOMAINES = {
  ia: { label: "IA & data", couleur: C.cyan },
  web: { label: "Web & cybersécurité", couleur: C.magenta },
};

// Remplace chaque `lien` par l'URL du dépôt GitHub correspondant.
const PROJETS = [
  {
    nom: "Start Trek",
    domaine: "ia",
    description: "Agents DQN et PPO qui apprennent à poser un module lunaire.",
    stack: ["PyTorch", "Gymnasium"],
    lien: PROFIL.github,
  },
  {
    nom: "Codename",
    domaine: "ia",
    description: "Agent LLM durci contre l'injection de prompt, avec 5 attaques conçues et testées.",
    stack: ["Ollama"],
    lien: PROFIL.github,
  },
  {
    nom: "Job Aggregator",
    domaine: "web",
    description: "Agrégateur d'offres d'emploi : API, authentification JWT et matching par\u00a0IA.",
    stack: ["FastAPI", "MySQL", "Docker"],
    lien: PROFIL.github,
  },
  {
    nom: "Tardis",
    domaine: "ia",
    description: "Prédiction des retards SNCF et tableau de bord interactif.",
    stack: ["Streamlit"],
    lien: PROFIL.github,
  },
  {
    nom: "Dr Cvrie",
    domaine: "ia",
    description: "Classification d'images médicales et clustering de témoignages.",
    stack: ["Scikit-learn"],
    lien: PROFIL.github,
  },
  {
    nom: "Hack And Juice",
    domaine: "web",
    description: "Recherche et exploitation de failles d'une application web vulnérable.",
    stack: ["OWASP Juice Shop"],
    lien: PROFIL.github,
  },
  {
    nom: "Chatbot & LLM",
    domaine: "ia",
    description: "Conception et déploiement d'une IA conversationnelle.",
    stack: ["LLM"],
    lien: PROFIL.github,
  },
  {
    nom: "Etodo",
    domaine: "web",
    description: "Application web de gestion de tâches.",
    stack: ["React", "TypeScript", "Docker"],
    lien: PROFIL.github,
  },
];

const EXPERIENCES = [
  {
    date: "Depuis mars 2026",
    structure: "LMS Digital",
    role: "Fondateur, création de sites web",
    lieu: "Auto-entreprise, Lille",
    couleur: C.cyan,
    lien: { href: "https://lms-digital.com", label: "lms-digital.com" },
    points: [
      "Accompagnement de plus de 10 clients, de la maquette à la mise en ligne et au suivi.",
      "Prospection de commerces de proximité sans site via Instagram, avec des maquettes personnalisées.",
      "Conception de sites vitrines responsive (HTML, CSS, JavaScript) déployés sur Netlify.",
    ],
  },
  {
    date: "Juin 2026, 1 mois",
    structure: "Obsidian Travel",
    role: "Développeur front-end React, en stage",
    lieu: "Full remote",
    couleur: C.violet,
    points: [
      "Conception et développement de la première vitrine web de l'entreprise : une landing page en React.",
      "Déploiement du site sur Vercel et mise en place de la redirection des prospects vers WhatsApp.",
    ],
  },
  {
    date: "Juillet – août 2024",
    structure: "Brasserie Bedague",
    role: "Employé saisonnier",
    lieu: "Aire-sur-la-Lys",
    couleur: C.magenta,
    points: [
      "Création d'un tableur Excel pour calculer le prix des commandes clients.",
      "Organisation et rangement du stock de caisses de boissons par type de produit.",
    ],
  },
];

const FORMATIONS = [
  {
    date: "2025 – 2028",
    structure: "Epitech",
    role: "Bachelor Informatique, 2ᵉ année, parcours IA & data",
    lieu: "Lille",
    couleur: C.orange,
  },
  {
    date: "2021 – 2024",
    structure: "Lycée Vauban",
    role: "Baccalauréat général, spécialités Mathématiques et NSI",
    lieu: "Aire-sur-la-Lys",
    couleur: C.cyan,
  },
];

const COMPETENCES = [
  {
    titre: "IA & data",
    couleur: C.cyan,
    items: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Gymnasium", "Streamlit"],
  },
  { titre: "LLM & automatisation", couleur: C.violet, items: ["Ollama", "n8n"] },
  {
    titre: "Web",
    couleur: C.magenta,
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "FastAPI", "MySQL"],
  },
  {
    titre: "Outils",
    couleur: C.orange,
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
  { titre: "Basé à Lille", texte: "Permis B et véhiculé." },
  { titre: "Stage de 4 mois", texte: "D'avril à juillet 2027, en développement informatique." },
  { titre: "Epitech, parcours IA & data", texte: "Bachelor Informatique, de 2025 à 2028." },
  { titre: "En dehors du code", texte: "Piano, musculation et belote." },
];

/* -------------------------------------------------------------------------- */
/* Icônes (tracés Lucide)                                                      */
/* -------------------------------------------------------------------------- */

function Icone({ children, className = "ic" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const IcSend = (p) => (
  <Icone {...p}>
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </Icone>
);
const IcPin = (p) => (
  <Icone {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Icone>
);
const IcExterne = (p) => (
  <Icone {...p}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Icone>
);
const IcTelecharger = (p) => (
  <Icone {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </Icone>
);
const IcCopier = (p) => (
  <Icone {...p}>
    <rect width="14" height="14" x="8" y="8" rx="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </Icone>
);
const IcCheck = (p) => (
  <Icone {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icone>
);
const IcMenu = (p) => (
  <Icone {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icone>
);
const IcFermer = (p) => (
  <Icone {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icone>
);

/* -------------------------------------------------------------------------- */
/* Petits composants d'identité                                               */
/* -------------------------------------------------------------------------- */

// Logo texte, sur le modèle de « LMS DIGITAL ».
function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark-grand chrome">{PROFIL.prenom.toUpperCase()}</span>
      <span className="wordmark-petit">{PROFIL.nom.toUpperCase()}</span>
    </span>
  );
}

// Le bouton « DM pour plus d'infos » de LMS, version e-mail.
function BoutonEmail({ grand = false }) {
  return (
    <a className={`bouton-email${grand ? " bouton-email--grand" : ""}`} href={`mailto:${PROFIL.email}`}>
      <span className="bouton-email-rond degrade">
        <IcSend />
      </span>
      <span className="bouton-email-texte">
        <strong>Écrire un e-mail</strong>
        {grand && <span>{PROFIL.email}</span>}
      </span>
    </a>
  );
}

function Telephone({ children }) {
  return (
    <div className="telephone">
      <span className="telephone-encoche" aria-hidden="true" />
      <div className="telephone-ecran">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

const LIENS = [
  { href: "#projets", label: "Projets" },
  { href: "#parcours", label: "Parcours" },
  { href: "#competences", label: "Compétences" },
];

function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${defile || ouvert ? " nav--plein" : ""}`}>
      <nav className="wrap nav-int" aria-label="Navigation principale">
        <a href="#top" aria-label={`${PROFIL.prenom} ${PROFIL.nom}, retour en haut`} onClick={() => setOuvert(false)}>
          <Wordmark />
        </a>

        <div className="nav-liens">
          {LIENS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta">
            <IcSend className="ic ic-4" />
            Me contacter
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert((v) => !v)}
        >
          {ouvert ? <IcFermer className="ic ic-6" /> : <IcMenu className="ic ic-6" />}
        </button>
      </nav>

      {ouvert && (
        <div id="menu-mobile" className="menu-mobile">
          <ul>
            {[...LIENS, { href: "#contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOuvert(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${PROFIL.email}`} className="btn btn-plein btn-large">
            <IcSend className="ic ic-4" />
            Écrire un e-mail
          </a>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Haut de page                                                                */
/* -------------------------------------------------------------------------- */

function Hero() {
  const vedettes = PROJETS.slice(0, 3);
  return (
    <section id="top" className="hero">
      <div className="nebuleuse" aria-hidden="true" />
      <div className="hero-fondu" aria-hidden="true" />

      <div className="wrap">
        <h1 className="hero-titre">
          <span className="hero-titre-petit">
            {PROFIL.prenom} {PROFIL.nom}
          </span>
          <span className="hero-titre-grand texte-degrade">
            Développeur
            <br />
            IA & web
          </span>
        </h1>

        <div className="hero-grille">
          <div className="hero-texte">
            <p className="hero-intro">
              Étudiant en 2ᵉ&nbsp;année à Epitech Lille, parcours IA & data. J'entraîne des agents qui apprennent à
              poser un module lunaire, et je crée des sites web pour les commerces de proximité.
            </p>
            <p className="hero-dispo">
              <span className="pastille degrade" aria-hidden="true" />
              Disponible en stage de 4&nbsp;mois, d'avril à juillet 2027
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-plein">
                Me contacter
              </a>
              <a href="#projets" className="btn btn-contour">
                Voir les projets
              </a>
            </div>
            <p className="hero-recents">
              Projets récents&nbsp;:{" "}
              {vedettes.map((p, i) => (
                <span key={p.nom}>
                  <a href="#projets">{p.nom}</a>
                  {i < vedettes.length - 2 ? ", " : i === vedettes.length - 2 ? " et " : "."}
                </span>
              ))}
            </p>
          </div>

          <div className="hero-ecran">
            <Ecran />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- L'écran animé (même mise en scène que l'écran de LMS Digital) ---------- */

const CODE = [
  [["# Start Trek : l'agent apprend à poser le module", "co"]],
  [["import ", "k"], ["gymnasium ", "n"], ["as ", "k"], ["gym", "n"]],
  [["from ", "k"], ["agents ", "n"], ["import ", "k"], ["PPO", "f"]],
  [],
  [["env ", "n"], ["= gym.", "p"], ["make", "f"], ["(", "p"], ['"LunarLander-v3"', "s"], [")", "p"]],
  [["agent ", "n"], ["= ", "p"], ["PPO", "f"], ["(env.observation_space, env.action_space)", "p"]],
  [],
  [["for ", "k"], ["episode ", "n"], ["in ", "k"], ["range", "f"], ["(", "p"], ["2000", "m"], ["):", "p"]],
  [["    obs, _ ", "n"], ["= env.", "p"], ["reset", "f"], ["()", "p"]],
  [["    fini ", "n"], ["= ", "p"], ["False", "m"]],
  [["    while not ", "k"], ["fini:", "n"]],
  [["        action ", "n"], ["= agent.", "p"], ["agir", "f"], ["(obs)", "p"]],
  [["        obs, r, termine, coupe, _ ", "n"], ["= env.", "p"], ["step", "f"], ["(action)", "p"]],
  [["        agent.", "p"], ["memoriser", "f"], ["(obs, r)", "p"]],
  [["        fini ", "n"], ["= termine ", "p"], ["or ", "k"], ["coupe", "n"]],
  [["    agent.", "p"], ["apprendre", "f"], ["()", "p"]],
];

function Ecran() {
  const ref = useRef(null);

  // L'animation ne tourne que quand l'écran est visible.
  useEffect(() => {
    const scene = ref.current;
    if (!scene) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      scene.dataset.pause = entry.isIntersecting ? "non" : "oui";
    });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ecran rise">
      <div className="ecran-halo degrade" aria-hidden="true" />
      <div className="ecran-cadre">
        <span className="ecran-camera" aria-hidden="true" />
        <div className="ecran-vitre">
          <Scene sceneRef={ref} />
          <span className="ecran-reflet" aria-hidden="true" />
        </div>
        <span className="ecran-marque" aria-hidden="true">
          MC
        </span>
      </div>
      <div className="ecran-pied" aria-hidden="true" />
      <div className="ecran-socle" aria-hidden="true" />
    </div>
  );
}

function Scene({ sceneRef }) {
  return (
    <div
      ref={sceneRef}
      className="sc"
      role="img"
      aria-label="Animation : le code du projet Start Trek s'écrit, l'agent s'entraîne, puis la disponibilité en stage s'affiche"
    >
      <div className="sc-etoiles" aria-hidden="true" />

      <div className="sc-titre" aria-hidden="true">
        <span className="sc-titre-petit">Projet</span>
        <span className="sc-titre-grand">Start Trek</span>
      </div>

      {/* Éditeur de code */}
      <div className="sc-editeur" aria-hidden="true">
        <div className="sc-barre">
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
          <span className="sc-onglet">train.py</span>
          <b className="sc-lancer">▶ Lancer</b>
        </div>
        <pre className="sc-code">
          {CODE.map((ligne, i) => (
            <span key={i} className="sc-ligne">
              <span className="sc-num">{i + 1}</span>
              {ligne.map(([t, k], j) => (
                <span key={j} className={`t-${k}`}>
                  {t}
                </span>
              ))}
            </span>
          ))}
        </pre>
        <div className="sc-terminal">
          <span className="sc-invite">$ python train.py --agent ppo</span>
          <span className="sc-progression">
            <i className="degrade" />
          </span>
          <span className="sc-etat">
            <em className="sc-etat-1">Entraînement de l'agent…</em>
            <em className="sc-etat-2">Entraînement terminé ✓</em>
          </span>
        </div>
      </div>

      {/* Courbe d'apprentissage */}
      <div className="sc-courbe" aria-hidden="true">
        <span className="sc-courbe-titre">Récompense moyenne</span>
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sc-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={C.cyan} />
              <stop offset="0.35" stopColor={C.violet} />
              <stop offset="0.66" stopColor={C.magenta} />
              <stop offset="1" stopColor={C.orange} />
            </linearGradient>
          </defs>
          <path d="M0 75H200M0 50H200" stroke="#e7e5ef" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path
            d="M0 26H200"
            stroke="#8b7bff"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="sc-trace"
            pathLength="1"
            d="M4 90 L16 86 L26 89 L36 81 L46 84 L56 74 L66 77 L76 66 L86 69 L96 57 L106 60 L116 48 L126 51 L136 39 L146 42 L156 30 L166 33 L176 22 L186 25 L196 18"
            fill="none"
            stroke="url(#sc-grad)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="sc-courbe-objectif">Objectif</span>
        <span className="sc-courbe-axe">Épisodes</span>
      </div>

      {/* Atouts */}
      <span className="sc-puce sc-puce-1" aria-hidden="true">
        <i style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}>✦</i>
        PyTorch
      </span>
      <span className="sc-puce sc-puce-2" aria-hidden="true">
        <i style={{ background: "linear-gradient(135deg,#3b82f6,#22d3ee)" }}>▢</i>
        Gymnasium
      </span>
      <span className="sc-puce sc-puce-3" aria-hidden="true">
        <i style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>⚡</i>
        DQN & PPO
      </span>

      <Curseur className="sc-curseur-1" />

      {/* Faisceau de lumière */}
      <span className="sc-faisceau" aria-hidden="true" />

      {/* Logo chromé */}
      <div className="sc-logo" aria-hidden="true">
        <span className="sc-logo-grand">{PROFIL.prenom.toUpperCase()}</span>
        <span className="sc-logo-trait" />
        <span className="sc-logo-petit">{PROFIL.nom.toUpperCase()}</span>
      </div>

      <span className="sc-dispo" aria-hidden="true">
        <i>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </i>
        <span>
          <b>Disponible en stage</b>
          <small>D'avril à juillet 2027, 4 mois</small>
        </span>
      </span>

      <Curseur className="sc-curseur-2" />
    </div>
  );
}

function Curseur({ className }) {
  return (
    <svg className={`sc-curseur ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 2.5 L4 19 L8.6 14.9 L11.6 21.3 L14.4 20 L11.5 13.8 L17.6 13.6 Z"
        fill="#fff"
        stroke="#14122a"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function APropos() {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <section id="a-propos" className="bloc">
      <div className="wrap grille-12">
        <div className="col-4">
          <div className="collant">
            <div className="portrait">
              <span className="portrait-halo degrade" aria-hidden="true" />
              <span className="portrait-anneau degrade">
                {photoOk ? (
                  <img
                    src={PHOTO_URL}
                    alt={`Portrait de ${PROFIL.prenom} ${PROFIL.nom}`}
                    width="240"
                    height="240"
                    onError={() => setPhotoOk(false)}
                  />
                ) : (
                  <span className="portrait-initiales">
                    {PROFIL.prenom[0]}
                    {PROFIL.nom[0]}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="col-8">
          <h2 className="titre">Qui je suis</h2>
          <p className="lead apropos-lead">
            Je suis en 2ᵉ&nbsp;année du Bachelor Informatique d'Epitech Lille, dans le parcours IA & data. Mes projets
            vont de l'apprentissage par renforcement à la sécurité des LLM, en passant par le développement web avec
            React et FastAPI.
          </p>
          <p className="lead">
            Depuis mars 2026, je crée aussi des sites vitrines pour les commerces de proximité avec mon
            auto-entreprise, LMS Digital&nbsp;: plus de 10&nbsp;clients accompagnés, de la maquette à la mise en ligne.
          </p>

          <dl className="faits">
            {FAITS.map((f) => (
              <div key={f.titre}>
                <dt>{f.titre}</dt>
                <dd>{f.texte}</dd>
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
    ...Object.entries(DOMAINES).map(([id, d]) => ({
      id,
      label: d.label,
      n: PROJETS.filter((p) => p.domaine === id).length,
    })),
  ];
  const liste = PROJETS.filter((p) => filtre === "tous" || p.domaine === filtre);

  return (
    <section id="projets" className="bloc">
      <div className="wrap">
        <div className="grille-12 entete">
          <h2 className="titre titre-grand col-7">
            Huit projets,
            <br />
            de l'IA au web.
          </h2>
          <p className="lead col-5 entete-texte">
            De l'apprentissage par renforcement à la sécurité web. Filtrez par domaine et retrouvez le code de chaque
            projet sur GitHub.
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
              {o.label}
              <span>{o.n}</span>
            </button>
          ))}
        </div>

        <ul className="projets">
          {liste.map((p) => {
            const d = DOMAINES[p.domaine];
            return (
              <li key={p.nom} className="projet">
                <p className="projet-domaine" style={{ color: d.couleur }}>
                  {d.label}
                </p>
                <h3 className="projet-nom">{p.nom}</h3>
                <p className="projet-desc">{p.description}</p>
                <div className="projet-bas">
                  <ul className="tags" aria-label="Technologies">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="lien-souligne" href={p.lien} target="_blank" rel="noopener noreferrer">
                    Voir le code
                    <IcExterne className="ic ic-35" />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Entree({ e }) {
  return (
    <li className="entree">
      <div className="entree-tete">
        <p className="entree-date" style={{ color: e.couleur }}>
          {e.date}
        </p>
        <h4 className="entree-nom">{e.structure}</h4>
        <p className="entree-role">{e.role}</p>
        <p className="entree-lieu">
          <IcPin className="ic ic-4" />
          {e.lieu}
        </p>
        {e.lien && (
          <a className="lien-souligne entree-lien" href={e.lien.href} target="_blank" rel="noopener noreferrer">
            {e.lien.label}
            <IcExterne className="ic ic-35" />
          </a>
        )}
      </div>
      {e.points && (
        <ul className="points">
          {e.points.map((p) => (
            <li key={p}>
              <span className="point" style={{ background: e.couleur }} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Parcours() {
  return (
    <section id="parcours" className="bloc">
      <div className="wrap grille-12">
        <div className="col-4">
          <div className="collant">
            <h2 className="titre">Mon parcours</h2>
            <p className="lead parcours-lead">
              Une auto-entreprise, un stage et un job d'été, en parallèle du Bachelor d'Epitech.
            </p>
          </div>
        </div>

        <div className="col-8">
          <h3 className="sous-titre">Expérience</h3>
          <ol className="entrees">
            {EXPERIENCES.map((e) => (
              <Entree key={e.structure} e={e} />
            ))}
          </ol>
          <h3 className="sous-titre sous-titre--espace">Formation</h3>
          <ol className="entrees">
            {FORMATIONS.map((e) => (
              <Entree key={e.structure} e={e} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Competences() {
  return (
    <section id="competences" className="bloc">
      <div className="wrap">
        <h2 className="titre competences-titre">Mes outils, de l'IA au déploiement</h2>

        <div className="competences">
          {COMPETENCES.map((c) => (
            <div key={c.titre}>
              <span className="competence-trait" style={{ background: c.couleur }} aria-hidden="true" />
              <h3 className="competence-titre">{c.titre}</h3>
              <ul className="tags tags--grand">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="sous-titre sous-titre--espace">Langues</h3>
        <div className="langues">
          {LANGUES.map((l) => (
            <div key={l.nom}>
              <p className="langue-tete">
                <strong>{l.nom}</strong>
                <span>{l.niveau}</span>
              </p>
              <div
                className="jauge"
                role="img"
                aria-label={l.rang === 6 ? "Langue maternelle" : `Niveau ${NIVEAUX[l.rang - 1]} sur une échelle de A1 à C2`}
              >
                <span className="degrade" style={{ width: `${(l.rang / 6) * 100}%` }} />
              </div>
              <ol className="jauge-niveaux" aria-hidden="true">
                {NIVEAUX.map((n, i) => (
                  <li key={n} className={i < l.rang ? "atteint" : ""}>
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
    <section id="contact" className="bloc contact">
      <div className="nebuleuse nebuleuse--douce" aria-hidden="true" />

      <div className="wrap grille-12 contact-grille">
        <div className="col-4 contact-tel">
          <a className="tel-lien" href={`mailto:${PROFIL.email}`} aria-label={`Écrire un e-mail à ${PROFIL.prenom}`}>
            <span className="tel-halo degrade" aria-hidden="true" />
            <Telephone>
              <div className="mail" aria-hidden="true">
                <div className="mail-barre">
                  <span className="mail-annuler">Annuler</span>
                  <strong>Nouveau message</strong>
                  <span className="mail-envoyer degrade">
                    <IcSend className="ic" />
                  </span>
                </div>
                <p className="mail-champ">
                  <span>À&nbsp;:</span> {PROFIL.email}
                </p>
                <p className="mail-champ">
                  <span>Objet&nbsp;:</span> Stage d'avril à juillet 2027
                </p>
                <div className="mail-corps">
                  <p>Bonjour Marius,</p>
                  <p>
                    Nous avons vu votre portfolio et aimerions échanger avec vous au sujet d'un stage
                    <span className="mail-curseur" />
                  </p>
                </div>
              </div>
              <div className="clavier" aria-hidden="true">
                {["azertyuiop", "qsdfghjklm", "wxcvbn"].map((rang) => (
                  <div className="clavier-rang" key={rang}>
                    {[...rang].map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                ))}
                <div className="clavier-rang">
                  <span className="clavier-large">123</span>
                  <span className="clavier-espace">espace</span>
                  <span className="clavier-large">retour</span>
                </div>
              </div>
            </Telephone>
          </a>
        </div>

        <div className="col-7 contact-texte">
          <h2 className="titre titre-contact">Parlons de votre stage</h2>
          <p className="lead contact-lead">
            Je cherche un stage de 4&nbsp;mois en développement informatique, d'avril à juillet 2027, côté IA comme
            côté web. Le plus simple pour me joindre, c'est par e-mail.
          </p>

          <div className="contact-bouton">
            <BoutonEmail grand />
          </div>

          <ul className="carte">
            <li>
              <div>
                <strong>Mon CV</strong>
                <span>PDF, une page</span>
              </div>
              <a className="btn btn-plein btn-petit" href={CV_URL} download>
                <IcTelecharger className="ic ic-4" />
                Télécharger
              </a>
            </li>
            <li>
              <div>
                <strong>LinkedIn</strong>
                <span>{PROFIL.linkedinCourt}</span>
              </div>
              <a className="btn btn-contour btn-petit" href={PROFIL.linkedin} target="_blank" rel="noopener noreferrer">
                Ouvrir
                <IcExterne className="ic ic-35" />
              </a>
            </li>
            <li>
              <div>
                <strong>GitHub</strong>
                <span>{PROFIL.githubCourt}</span>
              </div>
              <a className="btn btn-contour btn-petit" href={PROFIL.github} target="_blank" rel="noopener noreferrer">
                Ouvrir
                <IcExterne className="ic ic-35" />
              </a>
            </li>
            <li>
              <div>
                <strong>E-mail</strong>
                <span>{PROFIL.email}</span>
              </div>
              <button type="button" className="btn btn-contour btn-petit" onClick={copier}>
                {copie ? <IcCheck className="ic ic-4" /> : <IcCopier className="ic ic-4" />}
                {copie ? "Copiée" : "Copier"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copie ? "Adresse e-mail copiée" : ""}
              </span>
            </li>
          </ul>

          <ul className="contact-infos">
            <li>
              <IcPin className="ic ic-4" />
              Basé à Lille, permis B et véhiculé
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-int">
        <div className="footer-marque">
          <Wordmark />
          <p>Développeur IA & web</p>
        </div>
        <div className="footer-liens">
          <a href={PROFIL.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={PROFIL.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={`mailto:${PROFIL.email}`}>{PROFIL.email}</a>
          <span>© 2026 {PROFIL.prenom} {PROFIL.nom}</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Application                                                                 */
/* -------------------------------------------------------------------------- */

export default function App() {
  useEffect(() => {
    document.title = `${PROFIL.prenom} ${PROFIL.nom}, développeur IA & web`;
    document.documentElement.lang = "fr";
    if (!document.getElementById("polices-portfolio")) {
      const pre = document.createElement("link");
      pre.rel = "preconnect";
      pre.href = "https://fonts.gstatic.com";
      pre.crossOrigin = "anonymous";
      const lien = document.createElement("link");
      lien.id = "polices-portfolio";
      lien.rel = "stylesheet";
      lien.href =
        "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300..800&family=Unbounded:wght@300..900&display=swap";
      document.head.append(pre, lien);
    }
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <a className="evitement" href="#a-propos">
        Aller au contenu
      </a>
      <Navbar />
      <main>
        <Hero />
        <APropos />
        <Projets />
        <Parcours />
        <Competences />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
/* -------------------------------------------------------------------------- */

const CSS = `
/* Couleurs LMS Digital */
:root {
  --night: #0c0a1c;
  --night-2: #15122b;
  --night-3: #201b3d;
  --ink: #f2f0fa;
  --muted: #aaa5c6;
  --faint: #747094;
  --line: rgb(236 232 255 / 0.1);
  --cyan: #4fd1ff;
  --violet: #8b7bff;
  --magenta: #f062c0;
  --orange: #ff9f5a;
  --display: "Unbounded", "Unbounded Variable", ui-sans-serif, system-ui, sans-serif;
  --sans: "Hanken Grotesk", "Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  color-scheme: dark;
}

/* Remise à zéro (neutralise aussi le index.css par défaut de Vite) */
*, *::before, *::after { box-sizing: border-box; }
html { background: var(--night); -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
html body {
  margin: 0; padding: 0; display: block; min-width: 0; min-height: 0; place-items: initial;
  background: var(--night); color: var(--ink); font-family: var(--sans);
  font-size: 16px; line-height: 1.5; font-weight: 400;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
}
#root { max-width: none; width: 100%; margin: 0; padding: 0; text-align: left; }
h1, h2, h3, h4, p, ul, ol, dl, dd, pre { margin: 0; }
ul, ol { padding: 0; list-style: none; }
a, a:hover { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0; border-radius: 0; cursor: pointer; }
button:hover { border-color: transparent; }
img { max-width: 100%; display: block; }
::selection { background: rgb(139 123 255 / 0.45); color: #fff; }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--violet); outline-offset: 3px; }
section[id] { scroll-margin-top: 5.5rem; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.evitement { position: absolute; left: 16px; top: -60px; z-index: 100; padding: 10px 16px; border-radius: 999px; background: var(--ink); color: var(--night); font-weight: 600; }
.evitement:focus { top: 12px; }

/* Identité */
.texte-degrade {
  background-image: linear-gradient(92deg, var(--cyan) 0%, var(--violet) 34%, var(--magenta) 66%, var(--orange) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.chrome {
  background-image: linear-gradient(180deg, #ffffff 0%, #e4e2ef 42%, #8e8aa8 52%, #f6f5fb 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.degrade { background-image: linear-gradient(120deg, var(--cyan), var(--violet) 40%, var(--magenta) 70%, var(--orange)); }
.nebuleuse {
  position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background-image:
    radial-gradient(38% 46% at 12% 8%, rgb(139 123 255 / 0.34), transparent 72%),
    radial-gradient(34% 42% at 88% 14%, rgb(240 98 192 / 0.26), transparent 72%),
    radial-gradient(36% 40% at 4% 96%, rgb(255 159 90 / 0.2), transparent 72%),
    radial-gradient(40% 44% at 96% 92%, rgb(79 209 255 / 0.2), transparent 72%);
}
.nebuleuse--douce { opacity: .7; }

.ic { width: 1.25rem; height: 1.25rem; flex: none; }
.ic-35 { width: .875rem; height: .875rem; }
.ic-4 { width: 1rem; height: 1rem; }
.ic-6 { width: 1.5rem; height: 1.5rem; }

/* Mise en page */
.wrap { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1.25rem; }
.grille-12 { display: grid; gap: 3.5rem; }
.bloc { position: relative; isolation: isolate; overflow-x: clip; border-top: 1px solid var(--line); padding-block: 6rem; }
.titre { font-family: var(--display); font-size: clamp(2rem, 4.4vw, 3rem); font-weight: 600; line-height: 1.05; letter-spacing: -0.035em; text-wrap: balance; }
.titre-grand { font-size: clamp(2rem, 5.2vw, 3.6rem); line-height: 1.02; }
.lead { font-size: 1.125rem; line-height: 1.625; color: var(--muted); }
.sous-titre { font-family: var(--display); font-size: 1rem; font-weight: 500; color: var(--muted); letter-spacing: -0.01em; }
.sous-titre--espace { margin-top: 4.5rem; }

/* Boutons */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  border-radius: 999px; padding: .875rem 1.5rem; font-weight: 600; line-height: 1.5; white-space: nowrap;
  transition: background-color .15s, box-shadow .15s, color .15s;
}
.btn-plein, .btn-plein:hover { background: var(--ink); color: var(--night); }
.btn-plein:hover { background: #fff; }
.btn-contour, .btn-contour:hover { color: var(--ink); font-weight: 400; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25); }
.btn-contour:hover { box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.6); }
.btn-petit { padding: .625rem 1.1rem; font-size: .9rem; }
.btn-large { width: 100%; margin-top: 1.25rem; }
.lien-souligne, .lien-souligne:hover {
  display: inline-flex; align-items: center; gap: .4rem; width: fit-content; font-size: .9rem; color: var(--ink);
  text-decoration: underline; text-decoration-color: rgb(139 123 255 / 0.6); text-underline-offset: 4px;
}
.lien-souligne:hover { text-decoration-color: var(--violet); }

/* Navigation */
.nav { position: fixed; inset: 0 0 auto 0; z-index: 50; border-bottom: 1px solid transparent; transition: background-color .3s, border-color .3s; }
.nav--plein { border-bottom-color: var(--line); background: rgb(12 10 28 / 0.8); -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); }
.nav-int { height: 4rem; display: flex; align-items: center; justify-content: space-between; }
.wordmark { display: inline-flex; align-items: baseline; gap: .5rem; font-family: var(--display); line-height: 1; }
.wordmark-grand { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; }
.wordmark-petit { font-size: .58rem; font-weight: 500; letter-spacing: .42em; color: var(--muted); }
.nav-liens { display: none; align-items: center; gap: 2.25rem; }
.nav-liens > a { font-size: .95rem; color: var(--muted); transition: color .15s; }
.nav-liens > a:hover { color: var(--ink); }
.nav-liens > a.nav-cta, .nav-liens > a.nav-cta:hover {
  display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 1rem .5rem .75rem; border-radius: 999px;
  background: var(--ink); color: var(--night); font-size: .9rem; font-weight: 600;
}
.nav-liens > a.nav-cta:hover { background: #fff; }
.nav-burger { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; margin-right: -.5rem; border-radius: 999px; color: var(--ink); }
.menu-mobile { border-top: 1px solid var(--line); padding: .5rem 1.25rem 1.5rem; }
.menu-mobile li a { display: block; padding-block: 1rem; border-bottom: 1px solid var(--line); font-family: var(--display); font-size: 1.125rem; }

/* Haut de page */
.hero { position: relative; isolation: isolate; overflow: hidden; padding: 7rem 0 6rem; }
.hero-fondu { position: absolute; inset: auto 0 0 0; height: 10rem; z-index: -1; pointer-events: none; background: linear-gradient(to bottom, transparent, var(--night)); }
.hero-titre { font-family: var(--display); text-transform: uppercase; }
.hero-titre-petit { display: block; font-size: .8rem; font-weight: 500; letter-spacing: .34em; color: rgb(242 240 250 / 0.9); }
.hero-titre-grand {
  display: block; margin-top: .75rem; padding-bottom: .5rem;
  font-size: clamp(1.85rem, 9.4vw, 3.4rem); font-weight: 700; line-height: .95; letter-spacing: -0.04em;
}
.hero-grille { margin-top: 2.5rem; display: grid; gap: 4rem; }
.hero-intro { max-width: 33rem; font-size: 1.125rem; line-height: 1.625; color: var(--muted); }
.hero-dispo { margin-top: 1.75rem; display: flex; align-items: flex-start; gap: .75rem; font-weight: 600; }
.hero-dispo .pastille { margin-top: .45em; }
.pastille { width: .625rem; height: .625rem; border-radius: 50%; flex: none; box-shadow: 0 0 16px -2px rgb(240 98 192 / 0.9); }
.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: .75rem; }
.hero-recents { margin-top: 2.5rem; max-width: 30rem; font-size: .875rem; line-height: 1.625; color: var(--faint); }
.hero-recents a, .hero-recents a:hover { color: var(--muted); text-decoration: underline; text-decoration-color: rgb(255 255 255 / 0.2); text-underline-offset: 4px; }
.hero-recents a:hover { color: var(--ink); }

@keyframes rise { from { opacity: 0; translate: 0 48px; } to { opacity: 1; translate: 0 0; } }
.rise { animation: rise .9s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; animation-delay: .1s; }

/* L'écran d'ordinateur */
.ecran { position: relative; isolation: isolate; max-width: 720px; margin-inline: auto; }
.ecran-halo { position: absolute; inset: 8% 6% 22%; z-index: -1; border-radius: 999px; opacity: .3; filter: blur(64px); }
.ecran-cadre { position: relative; border-radius: 1.1rem; background: #100e20; padding: 9px 9px 22px; box-shadow: 0 60px 100px -45px rgb(0 0 0 / 0.95), 0 0 0 1px rgb(255 255 255 / 0.15); }
.ecran-camera { position: absolute; left: 50%; top: 3px; width: 4px; height: 4px; translate: -50% 0; border-radius: 50%; background: rgb(255 255 255 / 0.15); }
.ecran-vitre { position: relative; overflow: hidden; border-radius: .55rem; }
.ecran-reflet { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, rgb(255 255 255 / 0.06) 0%, transparent 38%); }
.ecran-marque { position: absolute; bottom: 8px; left: 50%; translate: -50% 0; font-family: var(--display); font-size: .42rem; font-weight: 600; letter-spacing: .4em; color: rgb(255 255 255 / 0.25); }
.ecran-pied { margin-inline: auto; height: 2.5rem; width: 17%; background: linear-gradient(to bottom, #1d1a33, #0f0d1d); clip-path: polygon(14% 0, 86% 0, 100% 100%, 0 100%); }
.ecran-socle { margin-inline: auto; height: 9px; width: 40%; border-radius: 3px 3px 999px 999px; background: linear-gradient(to bottom, #2a2645, #14122a); box-shadow: 0 18px 30px -12px rgb(0 0 0 / 0.9), 0 0 0 1px rgb(255 255 255 / 0.1); }

/* La scène (10 s, en boucle). Tailles en cqw : % de la largeur de l'écran. */
.sc {
  container-type: inline-size; position: relative; aspect-ratio: 16 / 9; overflow: hidden; color: #fff; font-family: var(--sans);
  background:
    radial-gradient(40% 62% at 12% 14%, rgb(124 58 237 / 0.9), transparent 72%),
    radial-gradient(38% 58% at 88% 12%, rgb(219 39 119 / 0.8), transparent 72%),
    radial-gradient(40% 60% at 8% 100%, rgb(249 115 22 / 0.85), transparent 72%),
    radial-gradient(42% 62% at 94% 100%, rgb(14 165 233 / 0.85), transparent 72%),
    radial-gradient(70% 70% at 50% 55%, #15102f, #0a0818);
}
.sc[data-pause="oui"], .sc[data-pause="oui"] * { animation-play-state: paused !important; }
.sc-etoiles {
  position: absolute; inset: 0; opacity: .8;
  background-image:
    radial-gradient(1.5px 1.5px at 7% 22%, #fff, transparent), radial-gradient(1px 1px at 18% 64%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 29% 12%, #fff, transparent), radial-gradient(1px 1px at 41% 88%, #fff, transparent),
    radial-gradient(1px 1px at 56% 18%, #fff, transparent), radial-gradient(1.5px 1.5px at 66% 92%, #fff, transparent),
    radial-gradient(1px 1px at 77% 36%, #fff, transparent), radial-gradient(1.5px 1.5px at 88% 70%, #fff, transparent),
    radial-gradient(1px 1px at 95% 30%, #fff, transparent), radial-gradient(1px 1px at 4% 80%, #fff, transparent);
}

.sc-titre { position: absolute; inset: 4.5% 0 auto; display: flex; flex-direction: column; align-items: center; gap: .6cqw; font-family: var(--display); text-transform: uppercase; animation: sc-titre 10s infinite both; }
.sc-titre-petit { font-size: 1.2cqw; font-weight: 500; letter-spacing: .34em; }
.sc-titre-grand {
  font-size: 4.4cqw; font-weight: 800; line-height: 1; letter-spacing: -0.02em;
  background-image: linear-gradient(90deg, #4fd1ff, #8b7bff 35%, #f062c0 66%, #ff9f5a);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
@keyframes sc-titre { 0% { opacity: 0; transform: translateY(-1.5cqw); } 5%, 58% { opacity: 1; transform: none; } 63%, 100% { opacity: 0; transform: none; } }

/* Éditeur */
.sc-editeur {
  position: absolute; left: 4%; top: 21%; width: 54cqw; overflow: hidden; border-radius: .9cqw; background: #110e24;
  box-shadow: 0 2.5cqw 4cqw -1.5cqw rgb(0 0 0 / 0.7), 0 0 0 .08cqw rgb(255 255 255 / 0.3);
  transform-origin: 50% 100%; animation: sc-fenetre 10s infinite both;
}
@keyframes sc-fenetre {
  0%, 4% { opacity: 0; transform: perspective(60cqw) rotateX(24deg) translateY(5cqw) scale(.92); filter: blur(0); }
  12%, 56% { opacity: 1; transform: none; filter: blur(0); }
  64%, 91% { opacity: .35; transform: scale(.94); filter: blur(.45cqw); }
  97%, 100% { opacity: 0; transform: scale(.94); filter: blur(.45cqw); }
}
.sc-barre { display: flex; align-items: center; gap: .45cqw; height: 2.3cqw; padding: 0 1cqw; background: #1c1932; border-bottom: .08cqw solid rgb(255 255 255 / 0.07); }
.sc-barre i { width: .7cqw; height: .7cqw; border-radius: 50%; }
.sc-onglet { margin-left: 1.4cqw; padding: .15cqw 1.4cqw; border-radius: .4cqw; background: rgb(255 255 255 / 0.08); color: #c9c5e0; font-size: .75cqw; }
.sc-lancer { margin-left: auto; padding: .2cqw .9cqw; border-radius: 1cqw; background: linear-gradient(90deg, #8b5cf6, #ec4899); font-size: .7cqw; font-weight: 700; animation: sc-clic 10s infinite both; }
@keyframes sc-clic { 0%, 38% { transform: none; filter: none; } 39% { transform: scale(.88); filter: brightness(1.25); } 41%, 100% { transform: none; filter: none; } }

.sc-code {
  padding: 1cqw 1.2cqw .6cqw; font: .92cqw/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #e8e6f5; white-space: pre;
  clip-path: inset(0 0 0 0); animation: sc-code 10s infinite both;
}
@keyframes sc-code {
  0%, 10% { clip-path: inset(0 0 100% 0); animation-timing-function: steps(16, end); }
  34%, 100% { clip-path: inset(0 0 0 0); }
}
.sc-ligne { display: block; min-height: 1.55em; }
.sc-num { display: inline-block; width: 2.2cqw; color: #4c4870; }
.t-k { color: #f062c0; } .t-f { color: #4fd1ff; } .t-s { color: #ff9f5a; } .t-m { color: #8b7bff; }
.t-co { color: #6e6a90; font-style: italic; } .t-p, .t-n { color: #e8e6f5; }

.sc-terminal { display: grid; gap: .5cqw; padding: .9cqw 1.2cqw 1.1cqw; border-top: .08cqw solid rgb(255 255 255 / 0.08); background: #0b0919; font: .85cqw/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.sc-invite { color: #aaa5c6; }
.sc-progression { display: block; height: .5cqw; border-radius: 1cqw; background: rgb(255 255 255 / 0.08); overflow: hidden; }
.sc-progression i { display: block; height: 100%; width: 100%; border-radius: 1cqw; animation: sc-progression 10s infinite both; }
@keyframes sc-progression { 0%, 40% { width: 0; } 56%, 100% { width: 100%; } }
.sc-etat { position: relative; height: 1.2cqw; }
.sc-etat em { position: absolute; inset: 0; font-style: normal; }
.sc-etat-1 { color: #aaa5c6; opacity: 0; animation: sc-etat-1 10s infinite both; }
.sc-etat-2 { color: #6ee7a8; animation: sc-etat-2 10s infinite both; }
@keyframes sc-etat-1 { 0%, 40% { opacity: 0; } 41%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
@keyframes sc-etat-2 { 0%, 55% { opacity: 0; } 57%, 100% { opacity: 1; } }

/* Courbe */
.sc-courbe {
  position: absolute; left: 61%; top: 27%; width: 34cqw; padding: 1.2cqw 1.3cqw 2.2cqw; border-radius: 1cqw; background: #fbfaff; color: #16132b;
  box-shadow: 0 2.5cqw 3cqw -1cqw rgb(0 0 0 / 0.7), 0 0 0 .1cqw rgb(255 255 255 / 0.3);
  animation: sc-courbe 10s infinite both;
}
@keyframes sc-courbe {
  0%, 38% { opacity: 0; transform: translate(6cqw, 2cqw) rotate(4deg); filter: blur(0); }
  44%, 56% { opacity: 1; transform: none; filter: blur(0); }
  64%, 91% { opacity: .35; transform: scale(.94); filter: blur(.45cqw); }
  97%, 100% { opacity: 0; transform: scale(.94); filter: blur(.45cqw); }
}
.sc-courbe-titre { display: block; margin-bottom: .8cqw; font-size: 1cqw; font-weight: 700; }
.sc-courbe svg { display: block; width: 100%; height: 13cqw; overflow: visible; }
.sc-trace { stroke-dasharray: 1; stroke-dashoffset: 0; animation: sc-trace 10s infinite both; }
@keyframes sc-trace { 0%, 42% { stroke-dashoffset: 1; } 56%, 100% { stroke-dashoffset: 0; } }
.sc-courbe-objectif { position: absolute; right: 1.3cqw; top: 3.7cqw; font-size: .7cqw; font-weight: 700; color: #8b7bff; }
.sc-courbe-axe { position: absolute; left: 1.3cqw; bottom: .8cqw; font-size: .7cqw; color: #8a8fa3; }

/* Atouts */
.sc-puce {
  position: absolute; display: flex; align-items: center; gap: .6cqw; padding: .45cqw 1.1cqw .45cqw .45cqw; border-radius: 2cqw;
  background: rgb(22 18 46 / 0.82); box-shadow: inset 0 0 0 .08cqw rgb(255 255 255 / 0.28), 0 1cqw 2cqw -1cqw rgb(0 0 0 / 0.6);
  -webkit-backdrop-filter: blur(.6cqw); backdrop-filter: blur(.6cqw); color: #fff; font-size: 1cqw; font-weight: 600; white-space: nowrap;
}
.sc-puce i { display: grid; place-items: center; width: 1.6cqw; height: 1.6cqw; border-radius: 50%; font-size: .75cqw; font-style: normal; }
.sc-puce-1 { left: 63%; top: 71%; animation: sc-puce-1 10s infinite both; }
.sc-puce-2 { left: 70%; top: 79%; animation: sc-puce-2 10s infinite both; }
.sc-puce-3 { left: 64%; top: 87%; animation: sc-puce-3 10s infinite both; }
@keyframes sc-puce-1 { 0%, 44% { opacity: 0; transform: translateX(2cqw) scale(.8); } 47%, 56% { opacity: 1; transform: none; } 61%, 100% { opacity: 0; transform: scale(.9); } }
@keyframes sc-puce-2 { 0%, 47% { opacity: 0; transform: translateX(2cqw) scale(.8); } 50%, 56% { opacity: 1; transform: none; } 61%, 100% { opacity: 0; transform: scale(.9); } }
@keyframes sc-puce-3 { 0%, 50% { opacity: 0; transform: translateX(2cqw) scale(.8); } 53%, 56% { opacity: 1; transform: none; } 61%, 100% { opacity: 0; transform: scale(.9); } }

/* Curseurs */
.sc-curseur { position: absolute; top: 0; left: 0; width: 2cqw; height: 2cqw; opacity: 0; filter: drop-shadow(0 .3cqw .4cqw rgb(0 0 0 / 0.5)); }
.sc-curseur-1 { animation: sc-curseur-1 10s infinite both; }
.sc-curseur-2 { animation: sc-curseur-2 10s infinite both; }
@keyframes sc-curseur-1 {
  0%, 32% { opacity: 0; transform: translate(70cqw, 40cqw); }
  33% { opacity: 1; transform: translate(70cqw, 40cqw); }
  38% { opacity: 1; transform: translate(54cqw, 12.5cqw); }
  39% { opacity: 1; transform: translate(54cqw, 12.5cqw) scale(.8); }
  41% { opacity: 1; transform: translate(54cqw, 12.5cqw); }
  44%, 100% { opacity: 0; transform: translate(54cqw, 12.5cqw); }
}
@keyframes sc-curseur-2 {
  0%, 74% { opacity: 0; transform: translate(72cqw, 52cqw); }
  76% { opacity: 1; transform: translate(72cqw, 52cqw); }
  82% { opacity: 1; transform: translate(41.6cqw, 42.8cqw); }
  84% { opacity: 1; transform: translate(41.6cqw, 42.8cqw) scale(.8); }
  86%, 92% { opacity: 1; transform: translate(41.6cqw, 42.8cqw); }
  96%, 100% { opacity: 0; transform: translate(41.6cqw, 42.8cqw); }
}

/* Faisceau de lumière */
.sc-faisceau {
  position: absolute; top: -25%; bottom: -25%; left: 0; width: 8cqw; opacity: 0;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.75) 42%, #fff 50%, rgb(255 255 255 / 0.75) 58%, transparent);
  filter: blur(.35cqw); mix-blend-mode: screen; animation: sc-faisceau 10s infinite both;
}
@keyframes sc-faisceau {
  0%, 56% { opacity: 0; transform: translateX(-20cqw) rotate(18deg); }
  57% { opacity: 1; transform: translateX(-20cqw) rotate(18deg); }
  65% { opacity: 1; transform: translateX(115cqw) rotate(18deg); }
  66%, 100% { opacity: 0; transform: translateX(115cqw) rotate(18deg); }
}

/* Logo chromé */
.sc-logo { position: absolute; inset: 27% 0 auto; display: flex; flex-direction: column; align-items: center; opacity: 0; animation: sc-logo 10s infinite both; }
.sc-logo-grand, .sc-logo-petit {
  font-family: var(--display);
  background-image: linear-gradient(180deg, #ffffff 0%, #f4f3fa 32%, #bdbacf 46%, #6d6a85 53%, #cfcde0 72%, #ffffff 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.sc-logo-grand {
  font-size: 10.5cqw; font-weight: 900; line-height: .85; letter-spacing: -0.02em;
  filter: drop-shadow(0 .2cqw 0 #9a97b0) drop-shadow(0 .2cqw 0 #77748f) drop-shadow(0 .2cqw 0 #55526d) drop-shadow(0 1.4cqw 1.6cqw rgb(0 0 0 / 0.55));
}
.sc-logo-trait { width: 34cqw; height: .25cqw; margin: 1.4cqw 0 1.1cqw; background: linear-gradient(90deg, transparent, #d9d7e6, #fff, #d9d7e6, transparent); }
.sc-logo-petit {
  padding-left: .38em; font-size: 3cqw; font-weight: 800; letter-spacing: .38em;
  filter: drop-shadow(0 .15cqw 0 #77748f) drop-shadow(0 .15cqw 0 #55526d) drop-shadow(0 .6cqw .8cqw rgb(0 0 0 / 0.5));
}
@keyframes sc-logo { 0%, 60% { opacity: 0; transform: scale(1.25); filter: blur(1cqw); } 68%, 92% { opacity: 1; transform: none; filter: blur(0); } 98%, 100% { opacity: 0; transform: scale(.98); } }

/* Carte « disponible » */
.sc-dispo {
  position: absolute; left: 50%; top: 74%; display: flex; align-items: center; gap: .9cqw; padding: .5cqw 2cqw .5cqw .5cqw;
  border: .2cqw solid transparent; border-radius: 3cqw;
  background: linear-gradient(#120f26, #120f26) padding-box, linear-gradient(90deg, #f472b6, #a78bfa, #22d3ee) border-box;
  box-shadow: 0 0 2.5cqw -.3cqw rgb(232 121 249 / 0.8), 0 1.5cqw 3cqw -1cqw rgb(0 0 0 / 0.6);
  white-space: nowrap; opacity: 0; transform: translateX(-50%); animation: sc-dispo 10s infinite both;
}
.sc-dispo i { display: grid; place-items: center; width: 3cqw; height: 3cqw; border-radius: 50%; background: linear-gradient(135deg, #a855f7, #ec4899, #f97316); }
.sc-dispo svg { width: 1.4cqw; height: 1.4cqw; color: #fff; }
.sc-dispo b { display: block; font-size: 1.55cqw; font-weight: 800; line-height: 1.15; }
.sc-dispo small { display: block; color: rgb(255 255 255 / 0.75); font-size: .85cqw; }
@keyframes sc-dispo {
  0%, 67% { opacity: 0; transform: translate(-50%, 2cqw); }
  72% { opacity: 1; transform: translate(-50%, 0); }
  83% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  84% { opacity: 1; transform: translate(-50%, 0) scale(.95); }
  86%, 92% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  98%, 100% { opacity: 0; transform: translate(-50%, 0); }
}

/* À propos */
.collant { position: static; }
.portrait { position: relative; isolation: isolate; width: 13.75rem; margin-inline: auto; }
.portrait-halo { position: absolute; inset: -2rem; z-index: -1; border-radius: 50%; opacity: .25; filter: blur(48px); }
.portrait-anneau { display: block; padding: 3px; border-radius: 50%; }
.portrait-anneau img, .portrait-initiales { width: 100%; aspect-ratio: 1; height: auto; border-radius: 50%; object-fit: cover; border: 5px solid var(--night); background: var(--night-2); }
.portrait-initiales { display: grid; place-items: center; font-family: var(--display); font-size: 3.5rem; font-weight: 700; }
.apropos-lead { margin-top: 1.5rem; }
.col-8 > .lead + .lead { margin-top: 1rem; }
.faits { margin-top: 3rem; display: grid; column-gap: 3rem; }
.faits > div { border-top: 1px solid var(--line); padding-block: 1.75rem; }
.faits dt { font-family: var(--display); font-size: 1.05rem; font-weight: 500; line-height: 1.375; letter-spacing: -0.01em; }
.faits dd { margin-top: .5rem; line-height: 1.625; color: var(--muted); }

/* Projets */
.entete { gap: 1.5rem; }
.filtres { margin-top: 3rem; display: flex; flex-wrap: wrap; gap: .5rem; }
.filtre {
  display: inline-flex; align-items: center; gap: .5rem; padding: .55rem 1rem; border-radius: 999px; font-size: .9rem; color: var(--muted);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15); transition: background-color .15s, color .15s, box-shadow .15s;
}
.filtre:hover { color: var(--ink); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4); }
.filtre span { font-variant-numeric: tabular-nums; color: var(--faint); }
.filtre[aria-pressed="true"] { background: var(--ink); color: var(--night); font-weight: 600; box-shadow: none; }
.filtre[aria-pressed="true"] span { color: rgb(12 10 28 / 0.55); }
.projets { margin-top: 2.5rem; display: grid; column-gap: 3rem; }
.projet { display: flex; flex-direction: column; border-top: 1px solid var(--line); padding: 2rem 0 2.5rem; }
.projet-domaine { font-size: .95rem; font-weight: 500; }
.projet-nom { margin-top: .5rem; font-family: var(--display); font-size: clamp(1.5rem, 2.6vw, 1.9rem); font-weight: 600; line-height: 1.1; letter-spacing: -0.035em; }
.projet-desc { margin-top: .75rem; max-width: 34rem; font-size: 1.05rem; line-height: 1.625; color: var(--muted); }
.projet-bas { margin-top: auto; padding-top: 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
.tags { display: flex; flex-wrap: wrap; gap: .5rem; }
.tags li { padding: .25rem .75rem; border-radius: 999px; font-size: .85rem; color: var(--muted); box-shadow: inset 0 0 0 1px var(--line); background: rgb(255 255 255 / 0.03); }
.tags--grand { margin-top: 1.25rem; }
.tags--grand li { padding: .45rem .9rem; font-size: .95rem; color: rgb(242 240 250 / 0.9); background: var(--night-2); }

/* Parcours */
.parcours-lead { margin-top: 1.25rem; max-width: 22rem; }
.entrees { margin-top: 1.5rem; }
.entree { display: grid; gap: 1.5rem; border-top: 1px solid var(--line); padding-block: 2rem; }
.entree-date { font-size: .95rem; font-weight: 500; }
.entree-nom { margin-top: .4rem; font-family: var(--display); font-size: 1.5rem; font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; }
.entree-role { margin-top: .5rem; color: rgb(242 240 250 / 0.9); line-height: 1.5; }
.entree-lieu { margin-top: .5rem; display: flex; align-items: center; gap: .4rem; font-size: .875rem; color: var(--muted); }
.entree-lien { margin-top: .9rem; }
.points { display: grid; gap: .9rem; align-content: start; }
.points li { display: flex; gap: .75rem; line-height: 1.5; color: rgb(242 240 250 / 0.9); }
.point { flex: none; width: .375rem; height: .375rem; margin-top: .55em; border-radius: 50%; }

/* Compétences */
.competences-titre { max-width: 48rem; }
.competences { margin-top: 4rem; display: grid; gap: 3rem; }
.competence-trait { display: block; width: 2.5rem; height: 4px; border-radius: 4px; }
.competence-titre { margin-top: 1.25rem; font-family: var(--display); font-size: 1.12rem; font-weight: 500; letter-spacing: -0.01em; }
.langues { margin-top: 1.5rem; display: grid; gap: 2rem; }
.langue-tete { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.langue-tete strong { font-family: var(--display); font-size: 1.05rem; font-weight: 500; letter-spacing: -0.01em; }
.langue-tete span { font-size: .875rem; color: var(--muted); }
.jauge { margin-top: .9rem; height: .5rem; border-radius: 999px; background: rgb(255 255 255 / 0.08); overflow: hidden; }
.jauge span { display: block; height: 100%; border-radius: 999px; }
.jauge-niveaux { margin-top: .5rem; display: grid; grid-template-columns: repeat(6, 1fr); font-size: .75rem; color: var(--faint); font-variant-numeric: tabular-nums; }
.jauge-niveaux li { text-align: right; }
.jauge-niveaux li.atteint { color: var(--muted); }

/* Contact */
.contact-grille { align-items: center; gap: 4rem; }
.contact-tel { order: 2; }
.contact-texte { order: 1; }
.tel-lien { position: relative; isolation: isolate; display: block; width: 220px; margin-inline: auto; border-radius: 2.2rem; }
.tel-halo { position: absolute; inset: -2rem; z-index: -1; border-radius: 50%; opacity: .25; filter: blur(64px); }
.telephone { position: relative; border-radius: 2.2rem; padding: 7px; background: #121022; box-shadow: 0 40px 70px -30px rgb(0 0 0 / 0.95), 0 0 0 1px rgb(255 255 255 / 0.15); }
.telephone-encoche { position: absolute; left: 50%; top: 13px; z-index: 2; width: 28%; height: 11px; translate: -50% 0; border-radius: 999px; background: #121022; }
.telephone-ecran { display: flex; flex-direction: column; overflow: hidden; border-radius: 1.75rem; aspect-ratio: 9 / 16; background: #fbfaff; color: #16132b; }
.mail { flex: 1; min-height: 0; overflow: hidden; padding: 2.3rem .85rem .6rem; font-size: .7rem; line-height: 1.4; }
.mail-barre { display: flex; align-items: center; justify-content: space-between; gap: .5rem; padding-bottom: .9rem; }
.mail-barre strong { font-size: .72rem; white-space: nowrap; }
.mail-annuler { color: #7c3aed; font-size: .68rem; }
.clavier { display: grid; gap: 5px; padding: 7px 4px 14px; background: #dcdae6; }
.clavier-rang { display: flex; justify-content: center; gap: 3px; }
.clavier-rang span { flex: 0 1 9%; display: grid; place-items: center; height: 1.35rem; border-radius: 4px; background: #fff; box-shadow: 0 1px 0 #a9a6ba; font-size: .6rem; color: #16132b; }
.clavier-rang .clavier-large { flex-basis: 22%; background: #bebccc; font-size: .52rem; }
.clavier-rang .clavier-espace { flex-basis: 48%; font-size: .52rem; color: #6b6880; }
.mail-envoyer { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 50%; color: #fff; }
.mail-envoyer .ic { width: .8rem; height: .8rem; }
.mail-champ { padding-block: .55rem; border-top: 1px solid #eceaf3; color: #16132b; overflow-wrap: anywhere; }
.mail-champ span { color: #8a8fa3; }
.mail-corps { border-top: 1px solid #eceaf3; padding-top: .8rem; display: grid; gap: .6rem; color: #3b3850; }
.mail-curseur { display: inline-block; width: 1.5px; height: 1em; margin-left: 2px; vertical-align: -0.15em; background: #7c3aed; animation: clignote 1.1s steps(1) infinite; }
@keyframes clignote { 50% { opacity: 0; } }
.contact-lead { margin-top: 1.25rem; max-width: 34rem; }
.titre-contact { font-size: clamp(2.2rem, 5vw, 3.6rem); line-height: 1.02; }
.contact-bouton { margin-top: 2rem; }
.bouton-email, .bouton-email:hover {
  display: inline-flex; align-items: center; gap: .75rem; padding: .375rem 1.25rem .375rem .375rem; border-radius: 999px;
  background: var(--night-2); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15); transition: box-shadow .15s;
}
.bouton-email:hover { box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4); }
.bouton-email-rond { display: grid; place-items: center; width: 2rem; height: 2rem; flex: none; border-radius: 50%; color: #fff; box-shadow: 0 0 24px -4px rgb(240 98 192 / 0.7); }
.bouton-email-rond .ic { width: .875rem; height: .875rem; }
.bouton-email-texte { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
.bouton-email-texte strong { font-weight: 600; font-size: .875rem; }
.bouton-email-texte span { font-size: .875rem; color: var(--muted); overflow-wrap: anywhere; }
.bouton-email--grand { gap: 1rem; padding: .625rem 1.75rem .625rem .625rem; }
.bouton-email--grand .bouton-email-rond { width: 3rem; height: 3rem; }
.bouton-email--grand .bouton-email-rond .ic { width: 1.25rem; height: 1.25rem; }
.bouton-email--grand .bouton-email-texte strong { font-size: 1.125rem; }
.carte { margin-top: 3rem; border-radius: 1rem; padding: .5rem 1.25rem; background: rgb(21 18 43 / 0.8); box-shadow: inset 0 0 0 1px var(--line); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.carte li { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: 1.1rem; }
.carte li + li { border-top: 1px solid var(--line); }
.carte li > div { display: flex; flex-direction: column; min-width: 0; }
.carte strong { font-weight: 600; }
.carte li > div span { font-size: .875rem; color: var(--muted); overflow-wrap: anywhere; }
.contact-infos { margin-top: 2rem; display: flex; flex-direction: column; gap: .75rem; font-size: .875rem; color: var(--muted); }
.contact-infos li { display: inline-flex; align-items: center; gap: .5rem; }
.contact-infos a:hover { color: var(--ink); }

/* Pied de page */
.footer { border-top: 1px solid var(--line); }
.footer-int { display: flex; flex-direction: column; gap: 1.5rem; padding-block: 2.5rem; }
.footer-marque { display: flex; flex-direction: column; gap: .5rem; }
.footer-marque p { font-size: .875rem; color: var(--faint); }
.footer-liens { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 2rem; font-size: .875rem; color: var(--muted); }
.footer-liens a:hover { color: var(--ink); }
.footer-liens span { color: var(--faint); }

/* Responsive : mêmes paliers que Tailwind (sm 640, md 768, lg 1024) */
@media (min-width: 640px) {
  .faits { grid-template-columns: 1fr 1fr; }
  .competences { grid-template-columns: 1fr 1fr; }
  .langues { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  .carte { padding: .75rem 2rem; }
}
@media (min-width: 768px) {
  .wrap { padding-inline: 2rem; }
  .bloc { padding-block: 9rem; }
  .nav-int { height: 4.5rem; }
  .nav-liens { display: flex; }
  .nav-burger, .menu-mobile { display: none; }
  .wordmark-grand { font-size: 1.4rem; }
  .hero { padding: 10rem 0 8rem; }
  .hero-titre-petit { font-size: 1.05rem; }
  .hero-titre-grand { margin-top: 1rem; font-size: clamp(3rem, 8vw, 7.2rem); }
  .hero-intro { font-size: 1.25rem; }
  .ecran-cadre { border-radius: 1.4rem; padding: 12px 12px 30px; }
  .ecran-camera { top: 4px; }
  .ecran-vitre { border-radius: .7rem; }
  .ecran-marque { bottom: 10px; font-size: .5rem; }
  .ecran-pied { height: 3.5rem; }
  .ecran-socle { height: 11px; }
  .projets { grid-template-columns: 1fr 1fr; }
  .entree { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 2.5rem; }
  .tel-lien { width: 270px; }
  .mail { padding: 2.8rem 1.1rem .8rem; font-size: .78rem; }
  .mail-barre strong { font-size: .82rem; }
  .mail-annuler { font-size: .78rem; }
  .clavier-rang span { height: 1.6rem; font-size: .68rem; }
  .footer-int { flex-direction: row; align-items: center; justify-content: space-between; }
}
@media (min-width: 1024px) {
  .grille-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2.5rem; }
  .col-4 { grid-column: span 4; }
  .col-5 { grid-column: span 5; }
  .col-7 { grid-column: span 7; }
  .col-8 { grid-column: span 8; }
  .collant { position: sticky; top: 8rem; }
  .portrait { margin-inline: 0; }
  .entete { align-items: end; }
  .entete-texte { padding-bottom: .5rem; }
  .hero-grille { margin-top: 3.5rem; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2.5rem; }
  .hero-texte { grid-column: span 5; padding-top: 1rem; }
  .hero-ecran { grid-column: span 7; margin-right: -1rem; }
  .competences { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .contact-tel { order: 1; grid-column: span 4; }
  .contact-texte { order: 2; grid-column: 6 / span 7; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .rise { animation: none; }
  .sc *, .sc *::before, .mail-curseur { animation: none !important; }
}
`;