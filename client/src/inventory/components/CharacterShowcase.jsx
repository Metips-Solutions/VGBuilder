import React, { useState, useEffect } from 'react';
import { ELEMENTS } from '../data/characters';

export function CharacterShowcase({ character }) {
  const [displayedChar, setDisplayedChar] = useState(character);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!character || character.id === displayedChar?.id) return;

    // Fase 1: Desvanecer el personaje anterior (130ms)
    setIsFadingOut(true);

    const timer = setTimeout(() => {
      // Fase 2: Cambiar al nuevo personaje y desvanecer hacia adentro (130ms)
      setDisplayedChar(character);
      setIsFadingOut(false);
    }, 130);

    return () => clearTimeout(timer);
  }, [character, displayedChar?.id]);

  if (!displayedChar) return null;

  const elemMeta = ELEMENTS[displayedChar.element] || {
    name: displayedChar.element,
    color: '#38bdf8'
  };

  return (
    <div className="showcase-visual">
      <div
        className={`showcase-character-content ${
          isFadingOut ? 'fading-out' : 'fading-in'
        }`}
      >
        {/* Fondo: Namecard del personaje */}
        {displayedChar.namecard ? (
          <div
            className="showcase-namecard-bg"
            style={{ backgroundImage: `url("${displayedChar.namecard}")` }}
          />
        ) : (
          <div
            className="showcase-namecard-bg fallback"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${elemMeta.color}25 0%, #161616 85%)`
            }}
          />
        )}
        <div className="showcase-namecard-overlay" />

        {/* LADO IZQUIERDO: Splash Art del Personaje */}
        <div className="showcase-art-column">
          <img
            src={displayedChar.image}
            alt={displayedChar.name}
            className="showcase-splash-art"
          />
        </div>

        {/* LADO DERECHO: Información del Personaje */}
        <div className="showcase-meta">
          <div className="showcase-region-pill">
            <span>📍 {displayedChar.region}</span>
            <span>·</span>
            <span className="showcase-stars">{'★'.repeat(displayedChar.stars)}</span>
          </div>

          <h2 className="showcase-name">{displayedChar.name}</h2>

          <div className="showcase-details">
            <span
              className="showcase-elem-tag"
              style={{ '--elem-color': elemMeta.color }}
            >
              {elemMeta.icon && (
                <img
                  src={elemMeta.icon}
                  alt={elemMeta.name}
                  className="showcase-elem-icon"
                />
              )}
              Elemento: {elemMeta.name}
            </span>
            <span className="showcase-role">
              Rol: {displayedChar.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
