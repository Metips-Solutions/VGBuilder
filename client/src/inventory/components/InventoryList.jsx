import React, { useState, useRef, useEffect } from 'react';
import { ELEMENTS } from '../data/characters';

export function InventoryList({
  inventory,
  onRemoveItem,
  onOpenModal,
  onOpenEnkaModal
}) {
  const [pressingIndex, setPressingIndex] = useState(null);
  const pressTimerRef = useRef(null);
  const pointerStartPos = useRef({ x: 0, y: 0 });

  // Limpieza del temporizador si el componente se desmonta o cambia el inventario
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    };
  }, [inventory]);

  const handlePointerDown = (e, index) => {
    // Si se hizo clic en el botón directo de la 'x', no iniciar long-press
    if (e.target.closest('.inventory-delete-btn')) return;

    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    setPressingIndex(index);

    pressTimerRef.current = setTimeout(() => {
      // Long-press completado (>650ms)
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setPressingIndex(null);
      onRemoveItem(index);
    }, 650);
  };

  const handlePointerMove = (e) => {
    if (!pressTimerRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartPos.current.x);
    const dy = Math.abs(e.clientY - pointerStartPos.current.y);

    // Si el usuario se desplaza verticalmente u horizontalmente (scroll en móvil), cancelar
    if (dx > 10 || dy > 10) {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
        pressTimerRef.current = null;
      }
      setPressingIndex(null);
    }
  };

  const handlePointerCancelOrUp = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setPressingIndex(null);
  };

  if (inventory.length === 0) {
    return (
      <div className="hero-empty">
        <div className="hero-icon">+</div>
        <h2 className="hero-title">Tu inventario de equipo está vacío</h2>
        <p className="hero-desc">
          Comienza seleccionando personajes de Teyvat para agregarlos a tu escuadra o sincroniza tu cuenta con Enka.Network.
        </p>
        <div className="hero-empty-actions">
          {onOpenEnkaModal && (
            <button
              type="button"
              className="btn-pill btn-pill-secondary btn-sync-enka"
              onClick={onOpenEnkaModal}
              title="Sincronizar inventario desde perfil de Enka.Network"
            >
              <span className="sync-icon-symbol">⚡</span>
              <span>Sincronizar Enka</span>
            </button>
          )}

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={onOpenModal}
          >
            + Agregar Personaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-section">
      <div className="inventory-header">
        <h2 className="inventory-heading">
          Personajes en Inventario
          <span className="badge-counter">{inventory.length}</span>
        </h2>

        <div className="inventory-header-actions">
          {onOpenEnkaModal && (
            <button
              type="button"
              className="btn-pill btn-pill-secondary btn-sync-enka"
              onClick={onOpenEnkaModal}
              title="Sincronizar inventario desde perfil de Enka.Network"
            >
              <span className="sync-icon-symbol">⚡</span>
              <span>Sincronizar Enka</span>
            </button>
          )}

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={onOpenModal}
          >
            + Agregar Personaje
          </button>
        </div>
      </div>

      <div className="inventory-grid">
        {inventory.map((item, index) => {
          const { character, constellation } = item;
          const elemMeta = ELEMENTS[character.element] || {
            name: character.element,
            color: '#38bdf8'
          };
          const sanitizeWebp = (url) => (typeof url === 'string' ? url.replace(/\.(png|jpe?g)$/i, '.webp') : url);
          const namecardUrl = sanitizeWebp(character.namecard);
          const thumbUrl = sanitizeWebp(character.icon || character.image);

          return (
            <div
              key={`${character.id}-${index}`}
              className={`inventory-card ${pressingIndex === index ? 'is-pressing' : ''}`}
              style={{
                '--card-elem-color': elemMeta.color,
                backgroundImage: namecardUrl ? `url("${namecardUrl}")` : undefined
              }}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerCancelOrUp}
              onPointerCancel={handlePointerCancelOrUp}
              onPointerLeave={handlePointerCancelOrUp}
              title="Mantén presionado para eliminar o usa la '✕' en la esquina"
            >
              <div className="inventory-card-backdrop" />

              <div
                className="inventory-card-thumb-wrap"
                style={{ borderColor: elemMeta.color }}
              >
                <img
                  src={thumbUrl}
                  alt={`Retrato de ${character.name}`}
                  className="inventory-card-thumb"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const fallback = `/Images/Genshin Impact/Character Icons/${character.name} · Icon · Genshin Impact.webp`;
                    if (e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
                />
              </div>

              <div className="inventory-card-info">
                <h4 className="inventory-card-name">{character.name}</h4>
                <div className="inventory-card-meta">
                  <span className="inventory-card-elem" style={{ color: elemMeta.color }}>
                    {elemMeta.icon && (
                      <img
                        src={elemMeta.icon}
                        alt={`Elemento ${elemMeta.name}`}
                        className="inventory-card-elem-icon"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    {elemMeta.name}
                  </span>
                  <span>·</span>
                  <span>{character.region}</span>
                </div>

                <span className="inventory-card-constellation-badge">
                  Constelación C{constellation}
                </span>
              </div>

              {/* Botón en la esquina con una X para eliminar */}
              <button
                type="button"
                className="inventory-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(index);
                }}
                title={`Eliminar ${character.name} del inventario`}
                aria-label={`Eliminar ${character.name} del inventario`}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryList;