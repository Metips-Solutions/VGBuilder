import React, { useState, useEffect } from 'react';
import { CharacterModal, EnkaSyncModal, GenshinEngine } from './inventory';
import { HomePage, NotFoundPage } from './dashboard';
import { RouterProvider, useRouter } from './shared/router';

function AppContent() {
  const { path, navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnkaModalOpen, setIsEnkaModalOpen] = useState(false);
  // Iniciar siempre en modo oscuro (sin persistencia en localStorage para garantizar inicio dark)
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('genshin_inventory_team');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('genshin_inventory_team', JSON.stringify(inventory));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }, [inventory]);

  const handleAddCharacter = (newItem) => {
    setInventory((prev) => [newItem, ...prev]);
  };

  const handleSyncEnkaSuccess = (syncedCharacters) => {
    setInventory((prev) => {
      // Merge inteligente: actualiza constelaciones existentes y agrega nuevos personajes
      const prevMap = new Map(prev.map((item) => [item.character.id, item]));
      syncedCharacters.forEach((item) => {
        prevMap.set(item.character.id, item);
      });
      const updated = Array.from(prevMap.values());
      try {
        localStorage.setItem('genshin_inventory_team', JSON.stringify(updated));
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
      }
      return updated;
    });
  };

  const handleRemoveItem = (indexToRemove) => {
    setInventory((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleResetLocalStorage = (e) => {
    if (e) e.preventDefault();
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas restablecer el almacenamiento local (localStorage)?\n\nSe eliminarán todos los personajes y constelaciones guardados en este navegador.'
    );
    if (confirmed) {
      try {
        localStorage.removeItem('genshin_inventory_team');
        localStorage.clear();
      } catch (err) {
        console.warn('Error al limpiar localStorage:', err);
      }
      setInventory([]);
    }
  };

  const isGenshinRoute = path === '/genshin' || path === '/genshin-impact';
  const isHomeRoute = path === '/' || path === '';
  const isNotFound = !isGenshinRoute && !isHomeRoute;

  let subtitleText = 'Astra · Plataforma Multi-Juego';
  if (isGenshinRoute) subtitleText = 'Genshin Impact · Motor';
  else if (isNotFound) subtitleText = 'Error 404 · No encontrado';

  return (
    <div className="app-container">
      {/* Barra de cabecera con navegación y acciones */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-logo">✦</div>
          <div className="brand-title">
            VGBuilder
            <span className="brand-subtitle">Genshin Impact · Inventario</span>
          </div>

          {/* Navegación de Motores: Botón Genshin Impact y Botón "Más" (no-op) */}
          <nav className="header-nav" aria-label="Navegación de motores">
            <button
              type="button"
              className={`nav-btn ${isGenshinRoute ? 'nav-btn-active' : ''}`}
              onClick={() => navigate('/genshin')}
              title="Ir al motor de Genshin Impact"
            >
              <span className="nav-btn-icon">✦</span>
              <span>Motor Genshin Impact</span>
              {isGenshinRoute && <span className="nav-btn-dot" />}
            </button>

            <button
              type="button"
              className="nav-btn nav-btn-more"
              onClick={(e) => {
                e.preventDefault();
                // Botón de más que no hace nada (según requerimiento)
              }}
              title="Próximamente más motores de juegos"
              aria-label="Más juegos próximamente"
            >
              <span className="nav-btn-plus">+</span>
              <span>Más</span>
              <span className="nav-pill-soon">Pronto</span>
            </button>
          </nav>
        </div>

        <div className="header-actions">
          {/* Si está en la ruta del motor de Genshin, muestra los botones de acción rápida */}
          {isGenshinRoute && (
            <>
              <button
                type="button"
                className="btn-pill btn-pill-secondary btn-sync-enka header-enka-btn"
                onClick={() => setIsEnkaModalOpen(true)}
                title="Sincronizar inventario desde perfil de Enka.Network"
              >
                <span className="sync-icon-symbol">⚡</span>
                <span className="btn-label-text">Sincronizar Enka</span>
              </button>

              <button
                type="button"
                className="btn-pill btn-pill-primary header-add-btn"
                onClick={() => setIsModalOpen(true)}
              >
                + Agregar Personaje
              </button>
            </>
          )}

          {/* Si está en la pantalla principal (raíz) o 404, botón directo para entrar al motor */}
          {!isGenshinRoute && (
            <button
              type="button"
              className="btn-pill btn-pill-primary header-direct-btn"
              onClick={() => navigate('/genshin')}
            >
              ✦ Abrir Motor Genshin
            </button>
          )}

          {/* Toggle de Modo Claro / Modo Oscuro */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          >
            <span
              className={`theme-toggle-indicator ${theme === 'dark' ? 'dark' : 'light'}`}
            />
            <span
              className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`}
            >
              ☀️
            </span>
            <span
              className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`}
            >
              🌙
            </span>
          </button>
        </div>
      </header>

      {/* Contenido principal según la ruta activa */}
      <main className="main-content">
        {isGenshinRoute && (
          <GenshinEngine
            inventory={inventory}
            onRemoveItem={handleRemoveItem}
            onOpenModal={() => setIsModalOpen(true)}
            onOpenEnkaModal={() => setIsEnkaModalOpen(true)}
          />
        )}
        {isHomeRoute && <HomePage />}
        {isNotFound && <NotFoundPage />}
      </main>

      {/* Separador y Pie de página con información de la aplicación y empresa (mantenido de App.jsx) */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-brand">
              <span className="footer-brand-title">VGBuilder · Astra</span>
              <span className="footer-version-badge">PoC v0.1.0</span>
            </div>
            <p className="footer-desc">
              Plataforma de optimización de afinidad y sinergias Gacha para Genshin Impact y más juegos.
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} <strong>Metips Solutions</strong> · Todos los derechos reservados.
            </p>
          </div>

          <div className="footer-actions">
            <span className="footer-action-label">Gestión de Almacenamiento:</span>
            <a
              href="#reset-storage"
              className="footer-reset-link"
              onClick={handleResetLocalStorage}
              role="button"
              title="Borra todos los personajes y configuraciones almacenadas en este navegador"
            >
              Restablecer datos locales (Resetear localStorage)
            </a>
          </div>
        </div>
      </footer>

      {/* Popup Modal con carrusel, filtros, showcase animado y constelaciones */}
      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCharacter={handleAddCharacter}
      />

      {/* Popup Modal compacto para sincronizar con perfil de Enka */}
      <EnkaSyncModal
        isOpen={isEnkaModalOpen}
        onClose={() => setIsEnkaModalOpen(false)}
        onSyncSuccess={handleSyncEnkaSuccess}
      />
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
