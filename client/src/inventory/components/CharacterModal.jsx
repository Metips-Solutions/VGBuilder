import React, { useState, useEffect, useMemo } from 'react';
import { CHARACTERS, ELEMENTS } from '../data/characters';
import { ElementFilter } from './ElementFilter';
import { CharacterCarousel } from './CharacterCarousel';
import { CharacterShowcase } from './CharacterShowcase';
import { ConstellationSelector } from './ConstellationSelector';

export function CharacterModal({ isOpen, onClose, onAddCharacter, inventory = [] }) {
  const [activeElement, setActiveElement] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [constellation, setConstellation] = useState(0);

  // Set de personajes ya existentes en el inventario (por id y por name normalizados)
  const existingSet = useMemo(() => {
    const set = new Set();
    inventory.forEach((item) => {
      if (item.character?.id) set.add(item.character.id.toLowerCase());
      if (item.character?.name) set.add(item.character.name.toLowerCase());
    });
    return set;
  }, [inventory]);

  // Excluir los personajes que ya están en el inventario
  const availableCharacters = useMemo(() => {
    return CHARACTERS.filter(
      (c) => !existingSet.has(c.id.toLowerCase()) && !existingSet.has(c.name.toLowerCase())
    );
  }, [existingSet]);

  // Filtrar personajes disponibles por elemento seleccionado (o todos)
  const filteredCharacters = useMemo(() => {
    return activeElement
      ? availableCharacters.filter((c) => c.element === activeElement)
      : availableCharacters;
  }, [activeElement, availableCharacters]);

  // Mantener seleccionado un personaje válido de los disponibles
  useEffect(() => {
    if (!isOpen) return;
    if (filteredCharacters.length > 0) {
      if (!selectedCharacter || !filteredCharacters.some((c) => c.id === selectedCharacter.id)) {
        setSelectedCharacter(filteredCharacters[0]);
      }
    } else {
      setSelectedCharacter(null);
    }
  }, [isOpen, activeElement, filteredCharacters]);

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

          {filteredCharacters.length === 0 ? (
            <div className="modal-empty-state">
              <div className="modal-empty-icon">✓</div>
              <h4 className="modal-empty-title">
                {activeElement
                  ? `Todos los personajes ${ELEMENTS[activeElement]?.name || ''} ya están en tu inventario`
                  : '¡Todos los personajes disponibles ya están en tu inventario!'}
              </h4>
              <p className="modal-empty-desc">
                {activeElement
                  ? 'Prueba seleccionando otro elemento o elimina alguno si deseas reconfigurarlo.'
                  : 'Has incorporado a todos los personajes disponibles al catálogo de tu equipo.'}
              </p>
            </div>
          ) : (
            <>
              {/* 2. Carrusel horizontal de personajes disponibles */}
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
            </>
          )}
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
            disabled={!selectedCharacter}
            title={!selectedCharacter ? 'No hay personajes disponibles para agregar' : undefined}
          >
            + Incorporar al equipo {selectedCharacter ? `· C${constellation}` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
