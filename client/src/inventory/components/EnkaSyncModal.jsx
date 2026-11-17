import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';

export function EnkaSyncModal({ isOpen, onClose, onSyncSuccess }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset al abrir
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessMsg(null);
      setShowHelp(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Botón 1: Pegar desde el portapapeles
  const handlePaste = async () => {
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      if (textFromClipboard) {
        setUrl(textFromClipboard.trim());
        setError(null);
      }
    } catch (err) {
      setError('No se pudo acceder al portapapeles automáticamente. Pega el enlace manualmente con Ctrl+V.');
    }
  };

  // Botón 2: Borrar campo
  const handleClear = () => {
    setUrl('');
    setError(null);
    setSuccessMsg(null);
  };

  // Botón 3: Aceptar / Sincronizar
  const handleSync = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError('Por favor pega o escribe la URL de tu perfil de Enka.Network.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/inventory/sync-by-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error al sincronizar con el perfil de Enka.');
      }

      if (!result.data || result.data.length === 0) {
        throw new Error('No se encontraron personajes disponibles en el perfil especificado.');
      }

      // Normalizar datos de Enka contra el catálogo gráfico local (CHARACTERS)
      const normalizedCharacters = [];

      result.data.forEach((item) => {
        const characterMeta = CHARACTERS.find(
          (c) => c.name.toLowerCase() === item.name.toLowerCase() || c.id === item.name.toLowerCase()
        );

        if (characterMeta) {
          normalizedCharacters.push({
            character: characterMeta,
            constellation: Math.min(6, Math.max(0, item.constellations ?? 0)),
            source: 'enka',
            syncedAt: new Date().toISOString(),
          });
        }
      });

      if (normalizedCharacters.length === 0) {
        throw new Error('Los personajes detectados en Enka no están disponibles en el catálogo actual de VGBuilder.');
      }

      setSuccessMsg(`¡Sincronización exitosa! Se importaron/actualizaron ${normalizedCharacters.length} personajes.`);

      // Notificar al padre para actualizar estado y localStorage
      if (onSyncSuccess) {
        onSyncSuccess(normalizedCharacters);
      }

      // Auto-cierre después de mostrar éxito
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al intentar sincronizar el perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="enka-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`enka-modal-content ${showHelp ? 'with-help' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Popup */}
        <div className="enka-modal-header">
          <div className="enka-title-group">
            <span className="enka-badge-icon">⚡</span>
            <div>
              <h3 className="enka-modal-title">Sincronizar Perfil de Enka</h3>
              <p className="enka-modal-subtitle">
                Pega la URL de tu perfil para actualizar constelaciones e inventario
              </p>
            </div>
          </div>

          <div className="enka-header-actions">
            {/* Botón de Ayuda */}
            <button
              type="button"
              className={`enka-icon-btn ${showHelp ? 'active' : ''}`}
              onClick={() => setShowHelp(!showHelp)}
              title={showHelp ? 'Ocultar guía' : 'Ver guía paso a paso'}
              aria-label="Ayuda para sincronizar con Enka"
            >
              ❓
            </button>

            {/* Botón Cerrar Ventana */}
            <button
              type="button"
              className="enka-icon-btn"
              onClick={onClose}
              title="Cerrar ventana"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Formulario / Input y Acciones */}
        <form onSubmit={handleSync} className="enka-modal-body">
          <label className="enka-input-label" htmlFor="enka-url-input">
            URL de Perfil / Builds de Enka.Network:
          </label>

          <div className="enka-input-wrapper">
            <input
              id="enka-url-input"
              type="text"
              className="enka-text-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://enka.network/u/tu_usuario/123456/builds/"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Mensajes de Estado */}
          {error && <div className="enka-feedback-msg error">{error}</div>}
          {successMsg && <div className="enka-feedback-msg success">{successMsg}</div>}

          {/* Barra de 3 Botones Principales + Cancelar */}
          <div className="enka-modal-footer">
            <div className="enka-secondary-group">
              {/* Botón 1: Pegar */}
              <button
                type="button"
                className="btn-pill btn-pill-secondary btn-sm"
                onClick={handlePaste}
                disabled={isLoading}
                title="Pegar URL desde el portapapeles"
              >
                📋 Pegar
              </button>

              {/* Botón 2: Borrar */}
              <button
                type="button"
                className="btn-pill btn-pill-secondary btn-sm"
                onClick={handleClear}
                disabled={isLoading || !url}
                title="Limpiar campo"
              >
                🗑️ Borrar
              </button>
            </div>

            <div className="enka-primary-group">
              <button
                type="button"
                className="enka-btn-cancel"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>

              {/* Botón 3: Aceptar */}
              <button
                type="submit"
                className="btn-pill btn-pill-primary btn-sm btn-accept"
                disabled={isLoading || !url.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="enka-spinner"></span>
                    Sincronizando...
                  </>
                ) : (
                  <>✓ Aceptar</>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Submódulo de Ayuda Desplegable */}
        {showHelp && (
          <div className="enka-help-drawer">
            <div className="enka-help-header">
              <span className="enka-help-title">❓ Guía de Obtención de Perfil Enka (4 Pasos)</span>
              <span className="enka-help-badge">Soporte In-Game</span>
            </div>

            <div className="enka-steps-grid">
              <div className="enka-step-card">
                <div className="step-num">1</div>
                <h4>En Genshin</h4>
                <p>Abre el Menú de Paimon → <strong>Editar Perfil</strong> y activa la casilla <strong>"Mostrar detalles de los personajes"</strong>.</p>
              </div>

              <div className="enka-step-card">
                <div className="step-num">2</div>
                <h4>Exhibidor</h4>
                <p>Coloca en tu exhibidor público los personajes que desees importar (hasta 8).</p>
              </div>

              <div className="enka-step-card">
                <div className="step-num">3</div>
                <h4>Enka.Network</h4>
                <p>Ve a <strong>enka.network</strong>, ingresa tu UID público y copia el enlace de tu perfil de builds.</p>
              </div>

              <div className="enka-step-card highlight">
                <div className="step-num">4</div>
                <h4>Pegar y Listo</h4>
                <p>Haz clic en el botón <strong>"📋 Pegar"</strong> y luego en <strong>"✓ Aceptar"</strong> para sincronizar.</p>
              </div>
            </div>

            <div className="enka-privacy-note">
              🔒 <strong>Privacidad:</strong> Solo se leen los datos públicos del exhibidor. Tus datos se guardan exclusivamente en el <code>localStorage</code> de tu navegador.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default EnkaSyncModal;
