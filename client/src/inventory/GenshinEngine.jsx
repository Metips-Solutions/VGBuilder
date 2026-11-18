import React from 'react';
import { InventoryList } from './components/InventoryList';
import { useRouter } from '../shared/router';

export function GenshinEngine({
  inventory,
  onRemoveItem,
  onOpenModal,
  onOpenEnkaModal
}) {
  const { navigate } = useRouter();

  return (
    <div className="engine-container">
      {/* Barra de contexto del motor de Genshin Impact */}
      <div className="engine-banner">
        <div className="engine-banner-info">
          <div className="engine-breadcrumb">
            <button
              type="button"
              className="breadcrumb-back-btn"
              onClick={() => navigate('/')}
              title="Volver a la pantalla principal"
            >
              ← Inicio
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Genshin Impact</span>
            <span className="engine-badge-active">Motor Activo</span>
          </div>

          <h1 className="engine-title">
            Motor de Optimización: Genshin Impact
          </h1>
          <p className="engine-desc">
            Organiza tus personajes de Teyvat, configura sus constelaciones y calcula composiciones de afinidad óptimas.
          </p>
        </div>

        <div className="engine-banner-actions">
          <button
            type="button"
            className="btn-pill btn-pill-secondary btn-sync-enka"
            onClick={onOpenEnkaModal}
            title="Sincronizar inventario desde perfil de Enka.Network"
          >
            <span className="sync-icon-symbol">⚡</span>
            Sincronizar Enka
          </button>

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={onOpenModal}
          >
            + Agregar Personaje
          </button>
        </div>
      </div>

      {/* Lista del inventario de personajes */}
      <InventoryList
        inventory={inventory}
        onRemoveItem={onRemoveItem}
        onOpenModal={onOpenModal}
      />
    </div>
  );
}

export default GenshinEngine;
