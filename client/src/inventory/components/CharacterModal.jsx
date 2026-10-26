import React, { useState, useEffect } from 'react';
import { CHARACTERS, ELEMENTS } from '../data/characters';
import { ElementFilter } from './ElementFilter';
import { CharacterCarousel } from './CharacterCarousel';
import { CharacterShowcase } from './CharacterShowcase';
import { ConstellationSelector } from './ConstellationSelector';

export function CharacterModal({ isOpen, onClose, onAddCharacter }) {
  const [activeElement, setActiveElement] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);
  const [constellation, setConstellation] = useState(0);

  // Filtrar personajes por elemento seleccionado (o todos)
  const filteredCharacters = activeElement
    ? CHARACTERS.filter((c) => c.element === activeElement)
    : CHARACTERS;

  // Si el filtro excluye al seleccionado, cambiar al primer disponible del filtro
  useEffect(() => {
    if (activeElement && selectedCharacter.element !== activeElement) {
      if (filteredCharacters.length > 0) {
        setSelectedCharacter(filteredCharacters[0]);
      }
    }
  }, [activeElement]);

  // Manejo de la tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!selectedCharacter) return;
    onAddCharacter({
      character: selectedCharacter,
      constellation: constellation
    });
    // Reset constellation a 0 tras agregar y cerrar
    setConstellation(0);
    onClose();
  };

  const elemMeta = ELEMENTS[selectedCharacter?.element] || { color: '#38bdf8' };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" role="dialog" aria-modal="true">
        {/* Cabecera del modal */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 className="modal-title">Gestión de Equipos</h3>
          </div>

          <button
            type="button"
            className="btn-circle"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          {/* 1. Filtro superior de 7 esferas elementales */}
          <ElementFilter
            activeElement={activeElement}
            onSelectElement={setActiveElement}
          />

          {/* 2. Carrusel horizontal de personajes */}
          <CharacterCarousel
            characters={filteredCharacters}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={setSelectedCharacter}
          />

          {/* 3. Showcase del personaje + Selector dual de constelación */}
          <div className="showcase-grid">
            <CharacterShowcase character={selectedCharacter} />

            <ConstellationSelector
              constellation={constellation}
              onChangeConstellation={setConstellation}
              activeColor={elemMeta.color}
            />
          </div>
        </div>

        {/* Pie del modal */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-pill btn-pill-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={handleAdd}
          >
            + Incorporar al equipo · C{constellation}
          </button>
        </div>
      </div>
    </div>
  );
}
