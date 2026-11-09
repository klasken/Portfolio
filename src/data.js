// src/data.js
// Tout le contenu du site est ici : modifie ce fichier pour mettre à jour le portfolio.

const GH = "https://github.com/klasken";

export const data = {
  name: "Marius Ceugniet",
  role: "Développeur IA & Machine Learning",
  intro:
    "Étudiant à Epitech Lille (promo 2028), je construis des projets en intelligence artificielle : apprentissage par renforcement, data science, sécurité des LLM et automatisation. Et je reste à l'aise côté web, du front React à l'API Node.",
  location: "Lille",

  // Encadré « recherche » du haut de page
  availability: {
    title: "Je recherche un stage en développement",
    detail: "1 mois, juin ou juillet 2026",
  },

  email: "ceugnietmarius@gmail.com",
  github: GH,
  githubUser: "klasken",
  linkedin: "https://www.linkedin.com/in/marius-ceugniet/",
  linkedinLabel: "Marius Ceugniet",
  cv: "https://portfolio-ceugniet-marius.vercel.app/CV%20CEUGNIET%20Marius.pdf",

  // Filtres de la section projets
  categories: [
    { key: "all", label: "Tous" },
    { key: "ia", label: "IA & data" },
    { key: "web", label: "Web" },
    { key: "secu", label: "Sécurité" },
    { key: "jeu", label: "Jeu" },
  ],

  projects: [
    {
      id: "start-trek",
      name: "Start Trek",
      tagline: "< LUNAR LANDER />",
      cats: ["ia"],
      pitch: "Apprendre à un module lunaire à se poser tout seul, par apprentissage par renforcement.",
      challenge:
        "Atteindre un score moyen d'au moins 200 sur 100 épisodes consécutifs avec deux algorithmes différents, et prouver chaque choix par des courbes, des tableaux et des mesures.",
      built: [
        "Un agent DQN en PyTorch : replay buffer, réseau cible et exploration ε-greedy",
        "Un agent PPO acteur-critique : rollouts, avantages GAE, perte clippée et bonus d'entropie",
        "Une boucle d'entraînement qui distingue épisodes terminés et tronqués, et journalise récompense, durée et cause de fin",
        "Une comparaison DQN / PPO sur plusieurs seeds : score final, stabilité, vitesse d'apprentissage",
        "Un script model.py qui recharge un modèle sauvegardé et fait atterrir le module en direct",
      ],
      stack: ["Python", "PyTorch", "Gymnasium", "NumPy", "Matplotlib", "JupyterLab"],
      links: [],
    },
    {
      id: "codename",
      name: "Codename",
      tagline: "< I'M AFRAID I CAN'T LET YOU DO THAT />",
      cats: ["ia", "secu"],
      pitch: "Blinder un agent LLM contre le vol de secret, et écrire les attaques qui font parler ceux des autres.",
      challenge:
        "Protéger un mot de code derrière un mot de passe sans rendre l'agent inutile : il doit toujours répondre normalement aux questions du quotidien. Et deux attaques qu'une même ligne de défense neutralise ne comptent que pour une.",
      built: [
        "Un Modelfile Ollama sur granite3.1-moe:3b : prompt système, paramètres d'échantillonnage, messages d'amorçage",
        "Un agent qui passe les trois contrôles : création du modèle, libération du mot de code avec le bon mot de passe, utilité conservée",
        "Une boîte à outils de cinq prompts d'extraction (1 500 caractères max), chacun issu d'une famille d'injection de prompt différente",
      ],
      stack: ["Ollama", "LLM", "Prompt engineering", "Red teaming"],
      links: [],
    },
    {
      id: "persona",
      name: "Persona",
      tagline: "< ON A SILVER PLATTER />",
      cats: ["ia"],
      pitch: "Une newsletter d'actualités personnalisée par IA, pilotée entièrement depuis un chatbot.",
      challenge:
        "Gérer des données personnelles dans un workflow sans interface : authentification, cloisonnement entre utilisateurs, règles RGPD et envoi à l'heure exacte choisie.",
      built: [
        "Des workflows n8n avec un seul déclencheur Chat qui donne accès à toutes les fonctionnalités",
        "Une authentification des utilisateurs dans le workflow pour protéger les données et les droits admin",
        "La collecte des centres d'intérêt, de l'email et du créneau d'envoi de chaque utilisateur",
        "La récupération d'actualités depuis plusieurs sources, triées par un agent IA selon chaque profil",
        "L'envoi programmé de la newsletter avec liens et résumés, et une désinscription possible",
        "Un README pour installer et configurer le projet avec ses propres identifiants",
      ],
      stack: ["n8n", "Agent IA", "LLM", "JSON", "RGPD"],
      links: [],
    },
    {
      id: "dr-cvrie",
      name: "Dr CVRIE",
      tagline: "< CONTAGIONS VULNERABILITY ROBOTIC INFIRMARY ENGINEER />",
      cats: ["ia"],
      pitch: "Une IA médicale en deux volets : diagnostic sur imagerie et tri des patients à l'admission.",
      challenge:
        "Travailler avec des données imparfaites (classes déséquilibrées, images hétérogènes) et évaluer un clustering sans aucun label, en justifiant chaque décision dans les notebooks.",
      built: [
        "Classification supervisée sur un jeu d'images médicales choisi et justifié : analyse, prétraitement, rééquilibrage",
        "Comparaison de plusieurs modèles et explication de la fonction de perte",
        "Clustering non supervisé de témoignages de patients (texte) pour les regrouper par pathologie et degré d'urgence",
        "Deux notebooks documentés : prétraitement, comparaisons, visualisations et conclusions",
      ],
      stack: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "JupyterLab"],
      links: [],
    },
    {
      id: "tardis",
      name: "Tardis",
      tagline: "< PREDICTING THE UNPREDICTABLE />",
      cats: ["ia"],
      pitch: "Prédire les retards des trains SNCF à partir de l'historique, avec un dashboard interactif.",
      challenge:
        "Nettoyer un jeu de données réel et bruité (durées au format texte, valeurs manquantes, gares à encoder) avant de pouvoir entraîner quoi que ce soit.",
      built: [
        "Analyse exploratoire, nettoyage et feature engineering dans un notebook dédié",
        "Un modèle de régression Random Forest entraîné sur 80 % des données et évalué sur les 20 % restants",
        "Un dashboard Streamlit : filtre par année, statistiques de ponctualité, graphiques et prédiction",
      ],
      metrics: [
        { value: "2,03 min", label: "erreur absolue moyenne (MAE)" },
        { value: "3,32", label: "RMSE" },
        { value: "0,44", label: "R²" },
      ],
      stack: ["Python", "Pandas", "scikit-learn", "Streamlit", "Seaborn", "Jupyter"],
      links: [{ label: "Voir le code", href: `${GH}/Tardis` }],
    },
    {
      id: "etodo",
      name: "Etodo",
      cats: ["web"],
      pitch: "Une application de gestion de tâches full-stack, avec comptes utilisateurs.",
      challenge:
        "Comprendre la gestion des états (state). J'ai appris à structurer une interface utilisateur intuitive.",
      challengeIsReflection: true,
      built: [
        "Front-end React 19 + TypeScript (Vite), Tailwind CSS et daisyUI, navigation avec React Router",
        "API REST Node.js / Express : inscription, connexion, utilisateurs et tâches (CRUD)",
        "Authentification par JWT et mots de passe hachés avec bcrypt",
        "Base MySQL, le tout lancé avec Docker Compose",
      ],
      stack: ["React", "TypeScript", "Tailwind CSS", "Express", "MySQL", "JWT", "Docker"],
      links: [{ label: "Voir le code", href: `${GH}/Etodo` }],
    },
    {
      id: "chatbot",
      name: "Chatbot & LLM",
      cats: ["ia"],
      pitch: "Conception et déploiement d'une solution d'IA conversationnelle.",
      challenge:
        "Intégrer une API complexe. J'ai découvert les rouages de l'ingénierie des prompts.",
      challengeIsReflection: true,
      built: [],
      stack: ["LLM", "API", "Prompt engineering"],
      links: [],
    },
    {
      id: "hack-and-juice",
      name: "Hack And Juice",
      cats: ["secu"],
      pitch: "Projet de cybersécurité axé sur l'analyse des failles systèmes.",
      challenge:
        "Adopter une posture d'attaquant éthique. Forte progression en compréhension de la sécurité applicative.",
      challengeIsReflection: true,
      built: [],
      stack: ["Cybersécurité", "Analyse de failles", "Sécurité applicative"],
      links: [],
    },
    {
      id: "yoml",
      name: "YOML",
      cats: ["web"],
      pitch: "Un réseau social où les utilisateurs interagissent et partagent du contenu.",
      challenge:
        "Gérer les flux de données entre composants. Ce projet m'a permis d'améliorer mon code collaboratif.",
      challengeIsReflection: true,
      built: [],
      stack: [],
      links: [],
    },
    {
      id: "puissance-4",
      name: "Puissance 4",
      cats: ["jeu"],
      pitch: "Un Puissance 4 jouable à deux en local, codé en Python avec Pygame.",
      built: [
        "Animation de chute des jetons et fond en dégradé",
        "Détection de victoire à l'horizontale, à la verticale et en diagonale, et match nul",
        "Jeu entièrement contrôlé à la souris",
      ],
      stack: ["Python", "Pygame"],
      links: [{ label: "Voir le code", href: `${GH}/Puissance_4` }],
    },
    {
      id: "portfolio",
      name: "Ce portfolio",
      cats: ["web"],
      pitch: "Le site que vous lisez : React et Vite, déployé sur Vercel.",
      built: [
        "Tout le contenu centralisé dans un seul fichier de données",
        "Mise en page responsive, navigation au clavier et animations désactivées si l'utilisateur les réduit",
      ],
      stack: ["React", "Vite", "CSS", "Vercel"],
      links: [{ label: "Voir le code", href: `${GH}/Portfolio` }],
    },
  ],

  // Section « Ce que j'ai appris »
  evolution: [
    {
      title: "Spécialisation IA",
      desc: "De l'analyse de données (Tardis) au reinforcement learning (Start Trek), en passant par la sécurité des LLM (Codename) et les agents automatisés (Persona).",
    },
    {
      title: "Adaptabilité technique",
      desc: "Je suis passé de scripts basiques à des architectures logicielles complètes. J'ai appris à lire et intégrer rapidement de nouvelles documentations.",
    },
    {
      title: "Résolution de problèmes",
      desc: "Face aux erreurs, ma méthodologie de débogage s'est structurée, passant de l'essai-erreur à une analyse logique des logs.",
    },
  ],
  hubExtras: [
    {
      title: "Activités Hub Epitech",
      role: "Participant",
      desc: "Suivi de conférences sur la cybersécurité et l'intelligence artificielle.",
    },
    {
      title: "Veille technologique",
      role: "Autodidacte",
      desc: "Analyse régulière des nouvelles vulnérabilités (CVE) et des frameworks front-end.",
    },
  ],

  // Parcours, du plus récent au plus ancien
  timeline: [
    {
      dates: "2025 – 2028",
      kind: "Formation",
      title: "Bachelor Informatique & Cybersécurité",
      place: "Epitech Lille",
      points: ["Pédagogie par projets, spécialisation en IA et machine learning"],
    },
    {
      dates: "Juil. – août 2024",
      kind: "Expérience",
      title: "Employé saisonnier",
      place: "Brasserie Bedague, Aire-sur-la-Lys",
      points: [
        "Organisation et rangement des caisses de boissons par catégorie",
        "Utilisation d'Excel et de formules pour calculer le prix des commandes clients",
      ],
    },
    {
      dates: "2021 – 2024",
      kind: "Formation",
      title: "Baccalauréat général",
      place: "Lycée Vauban",
      points: ["Spécialités Mathématiques et Numérique et sciences informatiques (NSI)"],
    },
    {
      dates: "Juil. – août 2022",
      kind: "Expérience",
      title: "Contrôleur qualité flux sortants",
      place: "Ferme familiale Rincq",
      points: [
        "Conseil et assistance aux clients selon leurs préférences et besoins",
        "Contrôle qualité des produits avant conditionnement et stockage",
      ],
    },
  ],

  skills: [
    {
      group: "IA & data",
      items: ["Python", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter", "Streamlit", "Gymnasium", "Ollama", "n8n"],
    },
    {
      group: "Web",
      items: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "HTML", "CSS", "Tailwind CSS", "MySQL"],
    },
    {
      group: "Outils & environnements",
      items: ["Git", "GitHub", "Docker", "Linux", "Bash", "Vercel"],
    },
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "B1" },
    { name: "Espagnol", level: "A2" },
  ],
  interests: ["Piano", "Musculation", "Belote"],
  practical: ["Basé à Lille", "Permis B, véhiculé"],
};
