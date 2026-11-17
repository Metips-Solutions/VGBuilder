import React from 'react';

export function ConstellationSelector({
  constellation,
  onChangeConstellation,
  activeColor = '#38bdf8'
}) {
  const handleSphereClick = (level) => {
    onChangeConstellation(level);
  };

  const handleDecrement = () => {
    if (constellation > 0) {
      onChangeConstellation(constellation - 1);
    }
  };

  const handleIncrement = () => {
    if (constellation < 6) {
      onChangeConstellation(constellation + 1);
    }
  };

  // 7 esferas: Nivel 0 (✕) + Niveles 1 a 6 (C1-C6)
  const sphereLevels = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div
      className="constellation-panel"
      style={{ '--active-color': activeColor }}
    >
      <span className="constellation-title">Constelación</span>

      {/* 7 Esferas en fila vertical (de arriba hacia abajo) */}
      <div className="constellation-vertical-spheres">
        {sphereLevels.map((lvl) => {
          const isReset = lvl === 0;
          // Si lvl === 0, está activo cuando constellation === 0
          // Si lvl > 0, está activo si la constelación actual es mayor o igual a ese nivel
          const isActive = isReset ? constellation === 0 : constellation >= lvl;

          return (
            <button
              key={lvl}
              type="button"
              className={`constellation-sphere ${isReset ? 'sphere-reset' : ''} ${
                isActive ? 'active' : ''
              }`}
              onClick={() => handleSphereClick(lvl)}
              title={isReset ? 'Sin constelación (C0 / Quitar)' : `Constelación C${lvl}`}
              aria-label={isReset ? 'Quitar constelación' : `Seleccionar C${lvl}`}
            >
              {isReset ? '✕' : lvl}
            </button>
          );
        })}
      </div>

      {/* Spinner numérico limitado de 0 a 6 */}
      <div className="spinner-container">
        <button
          type="button"
          className="spinner-btn"
          onClick={handleDecrement}
          disabled={constellation <= 0}
          aria-label="Disminuir constelación"
        >
          −
        </button>

        <span className="spinner-value">C{constellation}</span>

        <button
          type="button"
          className="spinner-btn"
          onClick={handleIncrement}
          disabled={constellation >= 6}
          aria-label="Aumentar constelación"
        >
          +
        </button>
      </div>
    </div>
  );
}
