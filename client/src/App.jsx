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

  return (
    <div className="app-container">
      {/* Barra de cabecera con navegación y acciones */}
      <header className="app-header">
        <div className="header-left">
          {/* Logo y Nombre del Proyecto clickeable para ir a la raíz */}
          <div
            className="brand-wrapper"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            title="Ir a la pantalla principal de VGBuilder"
          >
            <img
              src="/LogoVGBuilder.webp"
              alt="Logotipo oficial de VGBuilder"
              className="brand-logo-img"
              width="36"
              height="36"
            />
            <div className="brand-title">
              VGBuilder
            </div>
          </div>

          {/* Navegación de Motores: solo visible fuera de /genshin */}
          {!isGenshinRoute && (
            <nav className="header-nav" aria-label="Navegación de motores">
              <button
                type="button"
                className="nav-btn"
                onClick={() => navigate('/genshin')}
                title="Ir al motor de Genshin Impact"
              >
                <span className="nav-btn-icon">✦</span>
                <span>Motor Genshin Impact</span>
              </button>

              <button
                type="button"
                className="nav-btn nav-btn-more"
                onClick={(e) => {
                  e.preventDefault();
                }}
                title="Próximamente más motores de juegos"
                aria-label="Más juegos próximamente"
              >
                <span className="nav-btn-plus">+</span>
                <span>Más</span>
                <span className="nav-pill-soon">Pronto</span>
              </button>
            </nav>
          )}
        </div>

        <div className="header-actions">
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

          {/* Botón simple de Modo Claro / Modo Oscuro con emoji cambiante */}
          <button
            type="button"
            className="theme-simple-btn"
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
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
              <span className="footer-brand-title">VGBuilder</span>
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

      {/* Popup Modal con carrusel, filtros, showcase animado y constelaciones (filtrando ya agregados) */}
      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCharacter={handleAddCharacter}
        inventory={inventory}
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
