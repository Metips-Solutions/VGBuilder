import React from 'react';
import { ELEMENTS } from '../data/characters';

export function ElementFilter({ activeElement, onSelectElement }) {
  const elementList = Object.values(ELEMENTS);

  return (
    <div className="filter-row">
      <span className="filter-label">Filtrar por Elemento</span>
      
      <div className="element-spheres-group">
        {elementList.map((elem) => {
          const isActive = activeElement === elem.id;
          return (
            <button
              key={elem.id}
              type="button"
              className={`element-sphere ${isActive ? 'active' : ''}`}
              style={{
                '--elem-color': elem.color,
                '--elem-tint': elem.bgTint
              }}
              onClick={() => onSelectElement(isActive ? null : elem.id)}
              title={`Filtrar por elemento ${elem.name}`}
              aria-label={`Filtrar por ${elem.name}`}
            >
              <img
                src={elem.icon}
                alt={elem.name}
                className="element-sphere-icon"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={`filter-reset-pill ${!activeElement ? 'active' : ''}`}
        onClick={() => onSelectElement(null)}
      >
        Todos
      </button>
    </div>
  );
}
