import React, { useState, useEffect } from 'react';
import { CharacterModal, InventoryList } from './inventory';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleRemoveItem = (indexToRemove) => {
    setInventory((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="app-container">
      {/* Barra de cabecera */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-logo">✦</div>
          <div className="brand-title">
            ASTRA
            <span className="brand-subtitle">Genshin Impact · Inventario</span>
          </div>
        </div>

        <div className="header-actions">
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

          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Agregar Personaje
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        <InventoryList
          inventory={inventory}
          onRemoveItem={handleRemoveItem}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </main>

      {/* Popup Modal con carrusel, filtros, showcase animado y constelaciones */}
      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCharacter={handleAddCharacter}
      />
    </div>
  );
}

export default App;
