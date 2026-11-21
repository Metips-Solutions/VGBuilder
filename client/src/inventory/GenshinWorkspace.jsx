import React, { useState, useEffect } from 'react';
import { CharacterModal } from './components/CharacterModal';
import { EnkaSyncModal } from './components/EnkaSyncModal';
import { GenshinEngine } from './GenshinEngine';
import { CHARACTERS } from './data/characters';

export function sanitizeToWebp(url) {
  if (!url || typeof url !== 'string') return url;
  return url.replace(/\.(png|jpe?g)$/i, '.webp');
}

export function GenshinWorkspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnkaModalOpen, setIsEnkaModalOpen] = useState(false);

  const [inventory, setInventory] = useState(() => {
    if (typeof window === 'undefined') return [];
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

  return (
    <>
      <GenshinEngine
        inventory={inventory}
        onRemoveItem={handleRemoveItem}
        onOpenModal={() => setIsModalOpen(true)}
        onOpenEnkaModal={() => setIsEnkaModalOpen(true)}
      />

      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCharacter={handleAddCharacter}
        inventory={inventory}
      />

      <EnkaSyncModal
        isOpen={isEnkaModalOpen}
        onClose={() => setIsEnkaModalOpen(false)}
        onSyncSuccess={handleSyncEnkaSuccess}
      />
    </>
  );
}

export default GenshinWorkspace;
