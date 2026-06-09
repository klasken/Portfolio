// src/data.js

export const data = {
  name: "Marius Ceugniet",
  tagline: "Étudiant à Epitech Lille en informatique et cybersécurité — je transforme les données en solutions créatives.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marius-ceugniet/" },
    { label: "GitHub", href: "https://github.com/klasken" },
    { label: "Email", href: "mailto:ceugnietmarius@gmail.com" },
    { label: "Télécharger CV", href: "/CV CEUGNIET Marius.pdf" },   
  ],
  projects: [
    {
      name: "Etodo", cat: "Web App", catClass: "web",
      desc: "Application de gestion de tâches (création, modification, suppression).",
      reflection: "Défis : Comprendre la gestion des états (state). J'ai appris à structurer une interface utilisateur intuitive."
    },
    {
      name: "YOML", cat: "Social", catClass: "social",
      desc: "Création d'un réseau social permettant aux utilisateurs d'interagir.",
      reflection: "Défis : Gérer les flux de données entre composants. M'a permis d'améliorer mon code collaboratif."
    },
    {
      name: "Hack And Juice", cat: "Cybersécurité", catClass: "sec",
      desc: "Projet de cybersécurité axé sur l'analyse des failles systèmes.",
      reflection: "Défis : Adopter une posture d'attaquant éthique. Forte progression en compréhension de la sécurité applicative."
    },
    {
      name: "Chatbot & LLM", cat: "IA / NLP", catClass: "ai",
      desc: "Conception et déploiement d'une solution d'IA conversationnelle.",
      reflection: "Défis : Intégrer une API complexe. J'ai découvert les rouages de l'ingénierie des prompts."
    },
  ],
  evolution: [
    { title: "Adaptabilité technique", desc: "Je suis passé de scripts basiques à des architectures logicielles complètes. J'ai appris à lire et intégrer rapidement de nouvelles documentations." },
    { title: "Résolution de problèmes", desc: "Face aux erreurs, ma méthodologie de débogage s'est structurée, passant de l'essai-erreur à une analyse logique des logs." }
  ],
  hubExtras: [
    { title: "Activités Hub Epitech", role: "Participant", desc: "Suivi de conférences sur la Cybersécurité et l'Intelligence Artificielle." },
    { title: "Veille Technologique", role: "Autodidacte", desc: "Analyse régulière des nouvelles vulnérabilités (CVE) et des frameworks Front-End." }
  ],
  experiences: [
    {
      date: "Juil – Août 2024", title: "Employé Saisonnier", company: "Brasserie Bedague · Aire-sur-la-Lys",
      points: ["Organisation et rangement des caisses de boissons par catégorie", "Utilisation d'Excel et de formules pour la facturation clients"],
    },
    {
      date: "Juil – Août 2022", title: "Contrôleur Qualité", company: "Ferme Familiale Rincq",
      points: ["Conseil et assistance clients selon leurs préférences", "Contrôle qualité des produits avant conditionnement"],
    },
  ],
  education: [
    { dates: "2025 – 2028", school: "Epitech Lille", desc: "Bachelor Informatique & Cybersécurité" },
    { dates: "2021 – 2024", school: "Lycée Vauban", desc: "Bac général · Maths, NSI · Permis B" },
  ],
  skills: {
    langages: ["Python", "JavaScript", "React", "Node.js", "HTML", "CSS"],
    outils: ["GitHub", "Git", "Docker", "Linux", "Bash"],
  },
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "B1" },
    { name: "Espagnol", level: "A2" },
  ],
  interests: ["Piano", "Musculation", "Belote"],
};
