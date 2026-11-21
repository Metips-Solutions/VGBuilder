import React, { useState, useRef, useEffect } from 'react';
import { ELEMENTS, CHARACTERS } from '../data/characters';

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
              className="btn-apple btn-apple-secondary btn-apple-sync"
              onClick={onOpenEnkaModal}
              title="Sincronizar inventario desde perfil de Enka.Network"
            >
              <img
                src="/Images/Genshin Impact/UI_Icons/Icon_Switch_Character.webp"
                alt=""
                className="btn-apple-icon-img"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
              <span>Sincronizar Enka</span>
            </button>
          )}

          <button
            type="button"
            className="btn-apple btn-apple-tinted btn-apple-add"
            onClick={onOpenModal}
            title="Agregar personajes al inventario"
          >
            <svg
              className="btn-apple-icon-svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Agregar</span>
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
              className="btn-apple btn-apple-secondary btn-apple-sync"
              onClick={onOpenEnkaModal}
              title="Sincronizar inventario desde perfil de Enka.Network"
            >
              <img
                src="/Images/Genshin Impact/UI_Icons/Icon_Switch_Character.webp"
                alt=""
                className="btn-apple-icon-img"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
              <span>Sincronizar Enka</span>
            </button>
          )}

          <button
            type="button"
            className="btn-apple btn-apple-tinted btn-apple-add"
            onClick={onOpenModal}
            title="Agregar personajes al inventario"
          >
            <svg
              className="btn-apple-icon-svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>

      <div className="inventory-grid">
        {inventory.map((item, index) => {
          const { character, constellation } = item;
          const elemMeta = ELEMENTS[character.element] || {
            name: character.element,
            color: '#38bdf8',
            colorLight: '#0284c7',
            bgTint: 'rgba(56, 189, 248, 0.15)',
            bgTintLight: 'rgba(2, 132, 199, 0.10)'
          };
          const rarity =
            character.rarity ||
            character.stars ||
            CHARACTERS.find((c) => c.name.toLowerCase() === character.name?.toLowerCase())?.rarity ||
            4;
          const sanitizeWebp = (url) => (typeof url === 'string' ? url.replace(/\.(png|jpe?g)$/i, '.webp') : url);
          const namecardUrl = sanitizeWebp(character.namecard);
          const thumbUrl = sanitizeWebp(character.icon || character.image);

          return (
            <div
              key={`${character.id}-${index}`}
              className={`inventory-card ${pressingIndex === index ? 'is-pressing' : ''}`}
              style={{
                '--card-elem-color': elemMeta.color,
                '--card-elem-color-light': elemMeta.colorLight || elemMeta.color,
                '--card-elem-bg': elemMeta.bgTint,
                '--card-elem-bg-light': elemMeta.bgTintLight || 'rgba(0, 0, 0, 0.04)',
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

              <div className={`inventory-card-thumb-wrap rarity-${rarity}`}>
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
                  <span className="inventory-card-elem">
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
                  <span className="meta-separator">·</span>
                  <span className="inventory-card-region">{character.region}</span>
                </div>

                <span className="inventory-card-constellation-badge">
                  Const. C{constellation}
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
