import React from 'react';
import { ELEMENTS } from '../data/characters';

export function InventoryList({ inventory, onRemoveItem, onOpenModal }) {
  if (inventory.length === 0) {
    return (
      <div className="hero-empty">
        <div className="hero-icon">+</div>
        <h2 className="hero-title">Tu inventario de equipo está vacío</h2>
        <p className="hero-desc">
          Comienza seleccionando personajes de Teyvat para agregarlos a tu escuadra con su respectivo nivel de constelación.
        </p>
        <button
          type="button"
          className="btn-pill btn-pill-primary"
          onClick={onOpenModal}
        >
          + Agregar Primer Personaje
        </button>
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

        <button
          type="button"
          className="btn-pill btn-pill-primary"
          onClick={onOpenModal}
        >
          + Agregar Personaje
        </button>
      </div>

      <div className="inventory-grid">
        {inventory.map((item, index) => {
          const { character, constellation } = item;
          const elemMeta = ELEMENTS[character.element] || {
            name: character.element,
            color: '#38bdf8'
          };

          return (
            <div
              key={`${character.id}-${index}`}
              className="inventory-card"
              style={{
                '--card-elem-color': elemMeta.color,
                backgroundImage: character.namecard ? `url("${character.namecard}")` : undefined
              }}
            >
              <div className="inventory-card-backdrop" />

              <div
                className="inventory-card-thumb-wrap"
                style={{ borderColor: elemMeta.color }}
              >
                <img
                  src={character.icon || character.image}
                  alt={character.name}
                  className="inventory-card-thumb"
                  loading="lazy"
                />
              </div>

              <div className="inventory-card-info">
                <h4 className="inventory-card-name">{character.name}</h4>
                <div className="inventory-card-meta">
                  <span className="inventory-card-elem" style={{ color: elemMeta.color }}>
                    {elemMeta.icon && (
                      <img
                        src={elemMeta.icon}
                        alt=""
                        className="inventory-card-elem-icon"
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

              <button
                type="button"
                className="inventory-delete-btn"
                onClick={() => onRemoveItem(index)}
                title="Eliminar del inventario"
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
