import React, { useState, useEffect } from 'react';
import { CharacterModal, EnkaSyncModal, GenshinEngine } from './inventory';
import { CHARACTERS } from './inventory/data/characters';
import { HomePage, NotFoundPage } from './dashboard';
import { RouterProvider, useRouter } from './shared/router';
import { AppleConfirmModal } from './shared';

export function sanitizeToWebp(url) {
  if (!url || typeof url !== 'string') return url;
  return url.replace(/\.(png|jpe?g)$/i, '.webp');
}

function AppContent() {
  const { path, navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnkaModalOpen, setIsEnkaModalOpen] = useState(false);
  const [isResetStorageModalOpen, setIsResetStorageModalOpen] = useState(false);
  // Iniciar por defecto en modo claro (light)
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('genshin_inventory_team');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Auto-migración inmediata a .webp y sincronización con el catálogo canónico CHARACTERS
      const migrated = parsed.map((item) => {
        const canonical = CHARACTERS.find(
          (c) => c.id === item.character?.id || c.name.toLowerCase() === item.character?.name?.toLowerCase()
        );
        if (canonical) {
          return {
            ...item,
            character: { ...canonical }
          };
        }
        return {
          ...item,
          character: {
            ...item.character,
            icon: sanitizeToWebp(item.character?.icon),
            image: sanitizeToWebp(item.character?.image),
            namecard: sanitizeToWebp(item.character?.namecard)
          }
        };
      });
      localStorage.setItem('genshin_inventory_team', JSON.stringify(migrated));
      return migrated;
    } catch {
      return [];
    }
  });

  // Migración global preventiva de equipos guardados en localStorage para garantizar stickers en .webp
  useEffect(() => {
    try {
      const savedTeamsData = localStorage.getItem('genshin_saved_teams');
      if (savedTeamsData) {
        const list = JSON.parse(savedTeamsData);
        let hasChanged = false;
        const migratedList = list.map((t) => ({
          ...t,
          team: (t.team || []).map((m) => {
            if (m.avatar && typeof m.avatar === 'string' && /\.(png|jpe?g)$/i.test(m.avatar)) {
              hasChanged = true;
              return {
                ...m,
                avatar: m.avatar.replace(/\.(png|jpe?g)$/i, '.webp')
              };
            }
            return m;
          })
        }));
        if (hasChanged) {
          localStorage.setItem('genshin_saved_teams', JSON.stringify(migratedList));
        }
      }
    } catch (e) {
      console.warn('Error en migración de genshin_saved_teams:', e);
    }
  }, []);

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

  const handleResetLocalStorageConfirmed = () => {
    try {
      localStorage.removeItem('genshin_inventory_team');
      localStorage.removeItem('genshin_saved_teams');
      localStorage.clear();
    } catch (err) {
      console.warn('Error al limpiar localStorage:', err);
    }
    setInventory([]);
    window.location.reload();
  };

  const isGenshinRoute = path === '/genshin' || path === '/genshin-impact';
  const isHomeRoute = path === '/' || path === '';
  const isNotFound = !isGenshinRoute && !isHomeRoute;

  return (
    <div className="app-container">
      {/* Barra de cabecera unificada: solo logo, nombre y botón de modo oscuro en toda la app */}
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
              src="/Images/logos/LogoVGBuilder.webp"
              alt="Logotipo oficial de VGBuilder"
              className="brand-logo-img"
              width="36"
              height="36"
            />
            <div className="brand-title">
              VGBuilder
            </div>
          </div>
        </div>

        <div className="header-actions">
          {/* Botón de Modo Claro / Modo Oscuro con iconografía limpia (SF Symbols style) */}
          <button
            type="button"
            className="theme-simple-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <svg
                className="theme-btn-icon icon-moon"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg
                className="theme-btn-icon icon-sun"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
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
              © {new Date().getFullYear()} <strong>Metips Solutions</strong>
            </p>
            <p className="footer-copyright">
              VGBuilder es una herramienta independiente creada por fans y no está afiliada, asociada ni respaldada por HoYoverse / COGNOSPHERE.
            </p>
            <button
              type="button"
              className="footer-reset-link"
              onClick={() => setIsResetStorageModalOpen(true)}
              title="Borra todos los personajes y configuraciones almacenadas en este navegador"
            >
              Restablecer datos locales
            </button>
          </div>
        </div>
      </footer>

      {/* Modal de confirmación nativo estilo Apple para restablecer datos locales */}
      <AppleConfirmModal
        isOpen={isResetStorageModalOpen}
        title="¿Restablecer datos locales?"
        description="Se eliminarán todos los personajes del inventario, constelaciones y configuraciones guardadas en este navegador. Esta acción no se puede deshacer."
        confirmText="Eliminar todo"
        cancelText="Cancelar"
        onConfirm={() => {
          handleResetLocalStorageConfirmed();
          setIsResetStorageModalOpen(false);
        }}
        onCancel={() => setIsResetStorageModalOpen(false)}
        isDestructive={true}
      />

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
