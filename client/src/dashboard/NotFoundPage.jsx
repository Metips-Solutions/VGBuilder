import React from 'react';
import { useRouter } from '../shared/router';

export function NotFoundPage() {
  const { path, navigate } = useRouter();

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-badge">
          <span className="not-found-sparkle">✦</span>
          <span>Error 404 · Desconexión Dimensional</span>
        </div>

        <div className="not-found-number">404</div>

        <h1 className="not-found-title">Página o Motor No Encontrado</h1>

        <p className="not-found-desc">
          La coordenada <code className="not-found-path">{path}</code> no existe en el mapa de Teyvat ni en el registro de motores de <strong>VGBuilder</strong>. Es posible que la dirección esté mal escrita o que el motor para este juego aún se encuentre en desarrollo.
        </p>

        <div className="not-found-actions">
          <button
            type="button"
            className="btn-pill btn-pill-primary not-found-btn"
            onClick={() => navigate('/')}
          >
            ← Volver a la Pantalla Principal
          </button>

          <button
            type="button"
            className="btn-pill btn-pill-secondary not-found-btn"
            onClick={() => navigate('/genshin')}
          >
            ✦ Ir al Motor de Genshin Impact
          </button>
        </div>

        <div className="not-found-hint">
          <span>Tip: Puedes consultar todos los juegos y motores disponibles desde la página de inicio.</span>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
