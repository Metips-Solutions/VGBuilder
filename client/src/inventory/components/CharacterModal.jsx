import React, { useState, useEffect, useMemo } from 'react';
import { CHARACTERS, ELEMENTS } from '../data/characters';
import { ElementFilter } from './ElementFilter';
import { CharacterCarousel } from './CharacterCarousel';
import { CharacterShowcase } from './CharacterShowcase';
import { ConstellationSelector } from './ConstellationSelector';

export function CharacterModal({ isOpen, onClose, onAddCharacter, inventory = [] }) {
  const [activeElement, setActiveElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Detectar si estamos en móvil (<= 820px)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 820 : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 820px)');
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Estados para vista PC (selección única con splash art)
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [constellation, setConstellation] = useState(0);

  // Estados para vista Móvil (selección múltiple estilo iOS)
  const [selectedMap, setSelectedMap] = useState({});

  // Limpiar selecciones al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSelectedMap({});
      setSearchQuery('');
      setActiveElement(null);
      setConstellation(0);
    }
  }, [isOpen]);

  // Cierre con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const existingSet = useMemo(() => {
    const set = new Set();
    inventory.forEach((item) => {
      if (item.character?.id) set.add(item.character.id.toLowerCase());
      if (item.character?.name) set.add(item.character.name.toLowerCase());
    });
    return set;
  }, [inventory]);

  const availableCharacters = useMemo(() => {
    return CHARACTERS.filter(
      (c) => !existingSet.has(c.id.toLowerCase()) && !existingSet.has(c.name.toLowerCase())
    );
  }, [existingSet]);

  const filteredCharacters = useMemo(() => {
    return availableCharacters.filter((c) => {
      const matchesElement = activeElement ? c.element === activeElement : true;
      const matchesQuery = searchQuery.trim()
        ? c.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        : true;
      return matchesElement && matchesQuery;
    });
  }, [activeElement, searchQuery, availableCharacters]);

  // En PC: mantener seleccionado automáticamente el siguiente disponible sin cerrar el modal
  useEffect(() => {
    if (!isOpen || isMobile) return;
    if (filteredCharacters.length > 0) {
      if (!selectedCharacter || !filteredCharacters.some((c) => c.id === selectedCharacter.id)) {
        setSelectedCharacter(filteredCharacters[0]);
      }
    } else {
      setSelectedCharacter(null);
    }
  }, [isOpen, isMobile, activeElement, searchQuery, filteredCharacters, selectedCharacter]);

  if (!isOpen) return null;

  // --- Handlers PC ---
  const handleAddDesktop = () => {
    if (!selectedCharacter) return;
    onAddCharacter({
      character: selectedCharacter,
      constellation: constellation
    });
    setConstellation(0);
  };

  // --- Handlers Móvil ---
  const toggleSelectMobile = (char) => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      if (next[char.id]) {
        delete next[char.id];
      } else {
        next[char.id] = { character: char, constellation: 0 };
      }
      return next;
    });
  };

  const handleConstellationChangeMobile = (e, charId, level) => {
    e.stopPropagation();
    setSelectedMap((prev) => {
      if (!prev[charId]) return prev;
      return {
        ...prev,
        [charId]: {
          ...prev[charId],
          constellation: level
        }
      };
    });
  };

  const selectedEntries = Object.values(selectedMap);
  const selectedCount = selectedEntries.length;

  const handleConfirmAddMobile = () => {
    if (selectedCount === 0) return;
    selectedEntries.forEach(({ character, constellation }) => {
      onAddCharacter({ character, constellation });
    });
    setSelectedMap({});
    onClose();
  };

  const elemMeta = ELEMENTS[selectedCharacter?.element] || { color: '#38bdf8' };
  const constellationLevels = [0, 1, 2, 3, 4, 5, 6];

  // =========================================================================
  // RENDERIZADO MÓVIL (INSET GROUPED LIST ESTILO iOS)
  // =========================================================================
  if (isMobile) {
    return (
      <div
        className="modal-overlay ios-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-dialog ios-sheet-dialog" role="dialog" aria-modal="true">
          <div className="modal-header ios-sheet-header">
            <div className="modal-title-group">
              <h3 className="modal-title">Agregar Personajes</h3>
              {selectedCount > 0 && (
                <span className="ios-selected-subtitle">
                  {selectedCount} {selectedCount === 1 ? 'seleccionado' : 'seleccionados'}
                </span>
              )}
            </div>

            <button
              type="button"
              className="btn-circle ios-close-btn"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          <div className="ios-sticky-controls">
            <ElementFilter
              activeElement={activeElement}
              onSelectElement={setActiveElement}
            />

            <div className="modal-search-box ios-search-box">
              <span className="modal-search-icon">🔍</span>
              <input
                type="text"
                className="modal-search-input ios-search-input"
                placeholder="Buscar personaje..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="modal-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="modal-body ios-sheet-body">
            {filteredCharacters.length === 0 ? (
              <div className="modal-empty-state">
                <div className="modal-empty-icon">✓</div>
                <h4 className="modal-empty-title">
                  {searchQuery
                    ? `No se encontró "${searchQuery}"`
                    : activeElement
                    ? `Todos los personajes ${ELEMENTS[activeElement]?.name || ''} ya están en tu inventario`
                    : '¡Todos los personajes disponibles ya están en tu inventario!'}
                </h4>
              </div>
            ) : (
              <div className="ios-grouped-list" role="listbox" aria-multiselectable="true">
                {filteredCharacters.map((char) => {
                  const selection = selectedMap[char.id];
                  const isSelected = Boolean(selection);
                  const currentConstellation = selection ? selection.constellation : 0;
                  const cElemMeta = ELEMENTS[char.element] || {
                    name: char.element,
                    color: '#38bdf8'
                  };
                  const rarityBorderColor = char.stars === 5 ? '#f59e0b' : '#a855f7';

                  return (
                    <div
                      key={char.id}
                      className={`ios-list-row ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => toggleSelectMobile(char)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="ios-row-main">
                        <div
                          className="ios-row-avatar-wrap"
                          style={{ borderColor: rarityBorderColor }}
                        >
                          <img
                            src={char.icon || char.image}
                            alt={char.name}
                            className="ios-row-avatar"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="ios-row-info">
                          
                          <span
                            className="ios-elem-pill"
                            style={{
                              color: cElemMeta.color,
                              backgroundColor: `${cElemMeta.color}18`,
                              borderColor: `${cElemMeta.color}40`
                            }}
                          >
                            {cElemMeta.icon && (
                              <img
                                src={cElemMeta.icon}
                                alt=""
                                className="ios-elem-pill-icon"
                                loading="lazy"
                              />
                            )}
                            {cElemMeta.name}
                          </span>
                          <span className="ios-row-name">{char.name}</span>
                        </div>

                        <div className={`ios-check-circle ${isSelected ? 'checked' : ''}`}>
                          {isSelected && (
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              className="ios-check-svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div
                        className={`ios-constellation-drawer ${isSelected ? 'expanded' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="ios-constellation-inner">
                          <span className="ios-const-label">Constelación</span>
                          <div className="ios-const-pills">
                            {constellationLevels.map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                className={`ios-const-btn ${currentConstellation === lvl ? 'active' : ''}`}
                                onClick={(e) => handleConstellationChangeMobile(e, char.id, lvl)}
                              >
                                C{lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="modal-footer ios-sheet-footer">
            <button
              type="button"
              className="ios-btn ios-btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="ios-btn ios-btn-primary"
              onClick={handleConfirmAddMobile}
              disabled={selectedCount === 0}
            >
              Agregar ({selectedCount})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDERIZADO ESCRITORIO / PC (SPLASH ART + CARRUSEL + CONSTELACIONES)
  // =========================================================================
  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-compact" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 className="modal-title">Gestión de Equipos</h3>
          </div>

          <button
            type="button"
            className="btn-circle"
            onClick={onClose}
            aria-label="Cerrar modal"
            title="Cerrar (Esc)"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
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
              <CharacterCarousel
                characters={filteredCharacters}
                selectedCharacter={selectedCharacter}
                onSelectCharacter={setSelectedCharacter}
              />

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

        <div className="modal-footer">
          <button
            type="button"
            className="btn-pill btn-pill-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={handleAddDesktop}
            disabled={!selectedCharacter}
          >
            + Incorporar {selectedCharacter ? `${selectedCharacter.name} · C${constellation}` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}