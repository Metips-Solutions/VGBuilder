import React, { useState, useEffect } from 'react';
import { InventoryList } from './components/InventoryList';
import { AffinityMatcher } from './components/AffinityMatcher';
import { SavedTeamsView } from './components/SavedTeamsView';

export function GenshinEngine({
  inventory,
  onRemoveItem,
  onOpenModal,
  onOpenEnkaModal
}) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [savedCount, setSavedCount] = useState(0);

  // Estado compartido de personajes desactivados (persiste en LocalStorage)
  const [deactivatedIds, setDeactivatedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('genshin_deactivated_characters');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        'genshin_deactivated_characters',
        JSON.stringify(Array.from(deactivatedIds))
      );
    } catch (e) {
      console.warn('Error al guardar personajes desactivados:', e);
    }
  }, [deactivatedIds]);

  const handleToggleDeactivate = (charId) => {
    setDeactivatedIds((prev) => {
      const next = new Set(prev);
      if (next.has(charId)) {
        next.delete(charId);
      } else {
        next.add(charId);
      }
      return next;
    });
  };

  // Leer cantidad de equipos guardados en LocalStorage para el badge del switch
  useEffect(() => {
    const updateSavedCount = () => {
      try {
        const data = localStorage.getItem('genshin_saved_teams');
        const list = data ? JSON.parse(data) : [];
        setSavedCount(list.length);
      } catch {
        setSavedCount(0);
      }
    };

    updateSavedCount();
    window.addEventListener('storage', updateSavedCount);
    return () => window.removeEventListener('storage', updateSavedCount);
  }, [activeTab]);

  return (
    <div className="engine-container">
      {/* Barra de Navegación Segmented Control + Toggle de Acento */}
      <div className="engine-nav-header">
        <div className="engine-tab-switch-bar" role="tablist" aria-label="Secciones del motor">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'inventory'}
            className={`engine-switch-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <img
              src="/Images/Genshin Impact/UI_Icons/Icon_Character_Archive.webp"
              alt=""
              className="switch-icon-img"
              width="20"
              height="20"
            />
            <span className="switch-label">Personajes</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'affinity'}
            className={`engine-switch-btn ${activeTab === 'affinity' ? 'active' : ''}`}
            onClick={() => setActiveTab('affinity')}
          >
            <img
              src="/Images/Genshin Impact/UI_Icons/Icon_Party_Setup.webp"
              alt=""
              className="switch-icon-img"
              width="20"
              height="20"
            />
            <span className="switch-label">Creación Equipos</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'savedTeams'}
            className={`engine-switch-btn ${activeTab === 'savedTeams' ? 'active' : ''}`}
            onClick={() => setActiveTab('savedTeams')}
          >
            <img
              src="/Images/Genshin Impact/UI_Icons/Icon_Archive.webp"
              alt=""
              className="switch-icon-img"
              width="20"
              height="20"
            />
            <span className="switch-label">Guardados</span>
          </button>
        </div>
      </div>

      {/* Renderizado condicional según la pestaña activa */}
      <div className="engine-tab-content">
        {activeTab === 'inventory' && (
          <InventoryList
            inventory={inventory}
            onRemoveItem={onRemoveItem}
            onOpenModal={onOpenModal}
            onOpenEnkaModal={onOpenEnkaModal}
            deactivatedIds={deactivatedIds}
            onToggleDeactivate={handleToggleDeactivate}
          />
        )}

        {activeTab === 'affinity' && (
          <AffinityMatcher
            inventory={inventory}
            deactivatedIds={deactivatedIds}
            onToggleDeactivate={handleToggleDeactivate}
            onOpenModal={onOpenModal}
          />
        )}

        {activeTab === 'savedTeams' && (
          <SavedTeamsView
            onGoToOptimizer={() => setActiveTab('affinity')}
          />
        )}
      </div>
    </div>
  );
}

export default GenshinEngine;
