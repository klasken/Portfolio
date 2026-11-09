// src/LunarScene.jsx — petite scène d'alunissage (clin d'œil au projet Start Trek)

import { useEffect, useMemo, useState } from "react";
import { IconReplay } from "./Icons";

const LANDING_MS = 4400;

function makeStars(count) {
  // Générateur pseudo-aléatoire déterministe : le ciel est identique à chaque rendu
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 480,
    y: rand() * 280,
    r: 0.5 + rand() * 1.1,
    o: 0.25 + rand() * 0.6,
  }));
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function LunarScene() {
  const stars = useMemo(() => makeStars(70), []);
  const [run, setRun] = useState(0);
  const [landed, setLanded] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = setTimeout(() => setLanded(true), LANDING_MS);
    return () => clearTimeout(t);
  }, [run]);

  const replay = () => {
    setLanded(prefersReducedMotion());
    setRun((n) => n + 1);
  };

  return (
    <figure className="scene">
      <div className="scene-frame">
        <p className="scene-status" aria-live="polite">
          {landed ? "Posé en douceur. Récompense +100" : "Descente en cours…"}
        </p>

        <svg
          className="scene-svg"
          viewBox="0 0 480 400"
          role="img"
          aria-label="Un module lunaire descend et se pose sur une plateforme à la surface de la Lune"
        >
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#E8ECF5" opacity={s.o} />
          ))}

          {/* La Terre à l'horizon */}
          <g transform="translate(78 74)">
            <circle r="24" fill="#2A5EA8" />
            <path d="M-6 -22 C 8 -16 6 -4 14 2 S 10 16 2 22" fill="none" stroke="#4FA36B" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            <path d="M0 -24 A 24 24 0 0 1 0 24 A 17 24 0 0 0 0 -24 Z" fill="#0A1230" opacity="0.55" transform="rotate(25)" />
          </g>

          {/* Sol lunaire */}
          <path
            d="M0 300 C 60 288, 110 296, 160 306 S 250 318, 290 318 L 370 318 C 400 318, 432 304, 480 298 L 480 400 L 0 400 Z"
            fill="#1B2753"
          />
          <ellipse cx="92" cy="346" rx="24" ry="5" fill="#141E44" />
          <ellipse cx="206" cy="372" rx="32" ry="6" fill="#141E44" />
          <ellipse cx="428" cy="352" rx="16" ry="4" fill="#141E44" />

          {/* Plateforme d'atterrissage */}
          <rect x="290" y="318" width="80" height="4" rx="1" fill="#95A1C1" />
          <circle cx="292" cy="315" r="2.2" className="pad-light" />
          <circle cx="368" cy="315" r="2.2" className="pad-light" />

          <g transform="translate(330 318) scale(1.5)" key={run}>
            <ellipse className="lander-shadow" cx="0" cy="2" rx="20" ry="3" fill="#070D24" />

            <ellipse className="dust dust-l" cx="-12" cy="-2" rx="5" ry="2.4" fill="#95A1C1" />
            <ellipse className="dust dust-r" cx="12" cy="-2" rx="5" ry="2.4" fill="#95A1C1" />

            <g className="lander-motion">
              <path className="flame" d="M-5 -9 Q 0 26 5 -9 Z" fill="#FFB547" />
              <path className="flame flame-core" d="M-2.5 -9 Q 0 10 2.5 -9 Z" fill="#FFF1C9" />

              {/* Pieds */}
              <g stroke="#C9D2E6" strokeWidth="1.8" strokeLinecap="round" fill="none">
                <path d="M-10 -16 L -17 0" />
                <path d="M10 -16 L 17 0" />
                <path d="M-21 0 L -13 0" />
                <path d="M13 0 L 21 0" />
              </g>
              {/* Moteur */}
              <path d="M-4 -14 L 4 -14 L 6 -9 L -6 -9 Z" fill="#7F8AAD" />
              {/* Étage de descente */}
              <rect x="-14" y="-25" width="28" height="11" rx="2" fill="#D9A441" />
              <path d="M-14 -20 L 14 -20" stroke="#B6852E" strokeWidth="1" />
              {/* Cabine */}
              <path d="M-10 -25 L -12 -36 L -4 -43 L 4 -43 L 12 -36 L 10 -25 Z" fill="#E8ECF5" />
              <path d="M-5 -36 L -2 -39 L 4 -39 L 6 -35 L 1 -32 Z" fill="#0A1230" />
            </g>
          </g>
        </svg>
      </div>

      <figcaption className="scene-caption">
        <span>
          Clin d'œil à <a href="#projet-start-trek">Start Trek</a>, mon projet de reinforcement learning&nbsp;: un
          module lunaire qui apprend à se poser seul.
        </span>
        <button type="button" className="btn-ghost" onClick={replay}>
          <IconReplay /> Relancer l'atterrissage
        </button>
      </figcaption>
    </figure>
  );
}
