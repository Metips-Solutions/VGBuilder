import React, { useRef } from 'react';
import { ELEMENTS } from '../data/characters';

export function CharacterCarousel({
  characters,
  selectedCharacter,
  onSelectCharacter
}) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-container">
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => handleScroll('left')}
        aria-label="Desplazar a la izquierda"
      >
        ‹
      </button>

      <div className="carousel-track" ref={trackRef}>
        {characters.map((char) => {
          const isSelected = selectedCharacter && selectedCharacter.id === char.id;
          const elemColor = ELEMENTS[char.element]?.color || '#38bdf8';

          return (
            <div
              key={char.id}
              className={`carousel-item ${isSelected ? 'selected' : ''}`}
              style={{
                '--item-color': elemColor
              }}
              onClick={() => onSelectCharacter(char)}
              title={`${char.name} (${char.element.toUpperCase()})`}
            >
              <div className="carousel-avatar-wrap">
                <img
                  src={char.icon || char.image}
                  alt={char.name}
                  className="carousel-avatar"
                  loading="lazy"
                />
              </div>
              <span className="carousel-name">{char.name}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="carousel-arrow"
        onClick={() => handleScroll('right')}
        aria-label="Desplazar a la derecha"
      >
        ›
      </button>
    </div>
  );
}
