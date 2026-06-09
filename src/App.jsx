// src/App.jsx

import React from "react";
import "./App.css";
import { data } from "./data";
import { IconMail, IconLinkedIn, IconGitHub, IconCV } from "./Icons";

export default function App() {
  return (
    <div>
      <header className="navbar">
        <nav className="nav-container">
          <a href="#" className="nav-logo">Marius<span>.</span></a>
          <div className="nav-links">
            <a href="#projets">Projets</a>
            <a href="#evolution">Apprentissages</a>
            <a href="#experiences">Expériences</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main className="page">
        <div className="blob blob1" />
        <div className="blob blob2" />

        <div className="content">

          <section className="hero fade-up" style={{ animationDelay: "0.05s" }}>
            <div className="hero-main">
              <img
                src="/profile.jpg"
                alt="Marius Ceugniet - Etudiant Epitech"
                className="profile-pic"
              />
              <div>
                <p className="eyebrow">Portfolio · Développeur</p>
                <h1 className="hero-name">
                  Marius<br /><em>Ceugniet</em>
                </h1>
                <p className="hero-sub">{data.tagline}</p>
                <div className="hero-links">
                  {data.links.map(l => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="badge">
              <p className="badge-label">Recherche</p>
              <p className="badge-val">Stage dev<br /><span>Juin / Juil<br />2026 · 1 mois</span></p>
            </div>
          </section>

          <div className="body-grid">
            <div>
              <section id="projets" className="section fade-up" style={{ animationDelay: "0.15s" }}>
                <h2 className="sec-label">Projets & Réflexion</h2>
                <div className="projects-grid">
                  {data.projects.map(p => (
                    <article className="proj" key={p.name}>
                      <div className="proj-head">
                        <h3 className="proj-name">{p.name}</h3>
                        <span className={`proj-cat cat-${p.catClass}`}>{p.cat}</span>
                      </div>
                      <p>{p.desc}</p>
                      <p className="proj-reflection">{p.reflection}</p>
                      <a href="https://github.com/klasken" target="_blank" rel="noopener noreferrer" className="proj-link">
                        <IconGitHub /> Voir le code
                      </a>
                    </article>
                  ))}
                </div>
              </section>

              <section id="evolution" className="section fade-up" style={{ animationDelay: "0.20s" }}>
                <h2 className="sec-label">Évolution cette année</h2>
                <div className="evolution-grid">
                  {data.evolution.map(evo => (
                    <div className="evo-card" key={evo.title}>
                      <h3 className="evo-title">{evo.title}</h3>
                      <p className="evo-desc">{evo.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="sec-label">Hub Epitech & Extras</h2>
                <div className="evolution-grid">
                  {data.hubExtras.map(hub => (
                    <div className="evo-card" key={hub.title}>
                      <h3 className="evo-title">{hub.title} <span style={{color: 'var(--accent)', fontSize: '12px'}}>— {hub.role}</span></h3>
                      <p className="evo-desc">{hub.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="experiences" className="section fade-up" style={{ animationDelay: "0.25s" }}>
                <h2 className="sec-label">Expériences Pro.</h2>
                {data.experiences.map(x => (
                  <article className="xp-item" key={x.title}>
                    <p className="xp-date">{x.date}</p>
                    <h3 className="xp-title">{x.title}</h3>
                    <p className="xp-company">{x.company}</p>
                    <ul className="xp-desc">
                      {x.points.map(pt => <li key={pt}>{pt}</li>)}
                    </ul>
                  </article>
                ))}
              </section>
            </div>

            <aside>
              <section id="formation" className="side-block fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="sec-label">Formation</h2>
                {data.education.map(e => (
                  <div className="edu-item" key={e.school}>
                    <p className="edu-dates">{e.dates}</p>
                    <h3 className="edu-school">{e.school}</h3>
                    <p className="edu-desc">{e.desc}</p>
                  </div>
                ))}
              </section>

              <section className="side-block fade-up" style={{ animationDelay: "0.28s" }}>
                <h2 className="sec-label">Compétences</h2>
                <p className="skill-group-label">Langages & Frameworks</p>
                <div className="skills-wrap">
                  {data.skills.langages.map(s => <span key={s} className="skill sk-lang">{s}</span>)}
                </div>
                <p className="skill-group-label">Outils & Environnements</p>
                <div className="skills-wrap">
                  {data.skills.outils.map(s => <span key={s} className="skill sk-tool">{s}</span>)}
                </div>
              </section>

              <section className="side-block fade-up" style={{ animationDelay: "0.33s" }}>
                <h2 className="sec-label">Langues</h2>
                {data.languages.map(l => (
                  <div className="lang-item" key={l.name}>
                    <span className="lang-name">{l.name}</span>
                    <span className="lang-level">{l.level}</span>
                  </div>
                ))}
              </section>

              <section className="side-block fade-up" style={{ animationDelay: "0.38s" }}>
                <h2 className="sec-label">Centres d'intérêt</h2>
                <div className="interest-wrap">
                  {data.interests.map(i => <span key={i} className="interest">{i}</span>)}
                </div>
              </section>
            </aside>
          </div>

          <section id="contact" className="contact-section fade-up" style={{ animationDelay: "0.42s" }}>
            <h2 className="sec-label">Me contacter</h2>
            <p className="contact-tagline">
              Disponible pour un stage d'un mois en juin ou juillet 2026. N'hésitez pas à me contacter par le moyen qui vous convient.
            </p>

            <div className="contact-grid">
              <a className="contact-card" href="mailto:ceugnietmarius@gmail.com">
                <div className="contact-icon icon-mail"><IconMail /></div>
                <div className="contact-info">
                  <p className="contact-label">Email</p>
                  <p className="contact-value">ceugnietmarius@gmail.com</p>
                  <p className="contact-sub">Réponse sous 24h</p>
                </div>
              </a>
              <a className="contact-card" href="https://www.linkedin.com/in/marius-ceugniet/" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon icon-li"><IconLinkedIn /></div>
                <div className="contact-info">
                  <p className="contact-label">LinkedIn</p>
                  <p className="contact-value">Marius Ceugniet</p>
                  <p className="contact-sub">Profil professionnel</p>
                </div>
              </a>
              <a className="contact-card" href="https://github.com/klasken" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon icon-gh"><IconGitHub /></div>
                <div className="contact-info">
                  <p className="contact-label">GitHub</p>
                  <p className="contact-value">klasken</p>
                  <p className="contact-sub">Voir mes projets</p>
                </div>
              </a>
              <a className="contact-card" href="CV CEUGNIET Marius.pdf" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon icon-cv"><IconCV /></div>
                <div className="contact-info">
                  <p className="contact-label">Curriculum Vitæ</p>
                  <p className="contact-value">Télécharger PDF</p>
                  <p className="contact-sub">Document à jour</p>
                </div>
              </a>
            </div>

            <div className="contact-form-container">
              <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#f1f5f9' }}>Laissez-moi un message direct</h3>
              <form
                className="contact-form"
                action="mailto:ceugnietmarius@gmail.com?subject=Contact depuis le Portfolio"
                method="post"
                encType="text/plain"
              >
                <input type="text" name="Nom" placeholder="Votre Nom / Entreprise" required />
                <textarea name="Message" placeholder="Votre message ou proposition..." rows="4" required></textarea>
                <button type="submit">Ouvrir la messagerie et envoyer</button>
              </form>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}
