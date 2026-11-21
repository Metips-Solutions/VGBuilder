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

  // Pegar desde el portapapeles
  const handlePaste = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const textFromClipboard = await navigator.clipboard.readText();
        if (textFromClipboard) {
          setUrl(textFromClipboard.trim());
          setError(null);
          return;
        }
      }
      throw new Error('Clipboard empty or unreadable');
    } catch {
      setError('No se pudo acceder al portapapeles automáticamente. Pega el enlace con Ctrl+V.');
    }
  };

  // Limpiar campo
  const handleClear = () => {
    setUrl('');
    setError(null);
    setSuccessMsg(null);
  };

  // Sincronizar
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
      const response = await fetch('https://apivgb.tyreans.dev/api/inventory/sync-by-url', {
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

      setSuccessMsg(`¡Sincronización exitosa! Se importaron ${normalizedCharacters.length} personajes.`);

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
      <div className="enka-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Encabezado del Popup */}
        <div className="enka-modal-header">
          <div className="enka-title-group">
            <div className="enka-badge-icon" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <h3 className="enka-modal-title">Sincronizar Perfil de Enka</h3>
              <p className="enka-modal-subtitle">
                Pega la URL de tu perfil para actualizar constelaciones e inventario
              </p>
            </div>
          </div>

          <div className="enka-header-actions">
            {/* Botón circular de Ayuda (?) con SVG limpio */}
            <button
              type="button"
              className={`enka-icon-btn ${showHelp ? 'active' : ''}`}
              onClick={() => setShowHelp(!showHelp)}
              title={showHelp ? 'Ocultar formato de enlace' : 'Ver formato de enlace'}
              aria-label="Ayuda de formato de enlace"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <circle cx="12" cy="17" r="0.6" fill="currentColor" />
              </svg>
            </button>

            {/* Botón circular de Cierre (×) con SVG limpio */}
            <button
              type="button"
              className="enka-icon-btn"
              onClick={onClose}
              title="Cerrar ventana"
              aria-label="Cerrar ventana"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Formulario / Input con acciones integradas y Botón Sincronizar */}
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
              placeholder="https://enka.network/u/usuario/123456"
              disabled={isLoading}
              autoFocus
            />

            {/* Acción integrada dentro del input a la derecha */}
            <div className="enka-input-action-slot">
              {!url ? (
                <button
                  type="button"
                  className="enka-paste-inline-btn"
                  onClick={handlePaste}
                  disabled={isLoading}
                  title="Pegar URL desde el portapapeles"
                >
                  Pegar
                </button>
              ) : (
                <button
                  type="button"
                  className="enka-clear-inline-btn"
                  onClick={handleClear}
                  disabled={isLoading}
                  title="Borrar texto"
                  aria-label="Borrar texto"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Panel de ayuda simplificado: solo formato de enlace de Enka */}
          {showHelp && (
            <div className="enka-help-compact-card">
              <p className="enka-help-text">
                Ingresa a <strong>enka.network</strong>, abre tu perfil público de builds y copia la URL completa desde tu navegador:
              </p>
              <div className="enka-help-example-box font-mono">
                <span className="enka-help-proto">https://enka.network</span>
                <span className="enka-help-path">/u/usuario/123456</span>
              </div>
            </div>
          )}

          {/* Mensajes de Estado */}
          {error && <div className="enka-feedback-msg error">{error}</div>}
          {successMsg && <div className="enka-feedback-msg success">{successMsg}</div>}

          {/* Botón Filled Sincronizar de ancho completo */}
          <button
            type="submit"
            className="enka-btn-sync"
            disabled={isLoading || !url.trim()}
          >
            {isLoading ? (
              <>
                <span className="enka-sync-spinner" aria-hidden="true" />
                <span>Sincronizando...</span>
              </>
            ) : (
              <span>Sincronizar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnkaSyncModal;