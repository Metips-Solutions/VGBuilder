import React, { useState, useEffect, useMemo } from 'react';
import { ELEMENTS, CHARACTERS } from '../data/characters';
import { findAffinityCharacter, isMainDps } from '../data/affinityCharacters';
import {
  getTeamMemberAvatar,
  getDefaultCharacterIcon,
  getShortCharacterName
} from '../data/characterStickers';
import { getArtifactSetIcon } from '../data/artifactIcons';

export function AffinityMatcher({
  inventory = [],
  deactivatedIds = new Set(),
  onToggleDeactivate,
  onOpenModal
}) {
  // Filtro exclusivo por elemento
  const [selectedElement, setSelectedElement] = useState('ALL');

  // Personaje principal (Carry) seleccionado — Ninguno seleccionado por defecto
  const [selectedCarryId, setSelectedCarryId] = useState(null);

  // Estado del menú desplegable lateral (Drawer)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Manejo de la tecla Escape para cerrar el drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Estado de la llamada HTTP
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [teams, setTeams] = useState(null);

  // Estado de equipos guardados en LocalStorage (para feedback de botón)
  const [savedTeamIds, setSavedTeamIds] = useState(() => {
    try {
      const data = localStorage.getItem('genshin_saved_teams');
      const list = data ? JSON.parse(data) : [];
      return new Set(list.map((t) => t.id));
    } catch {
      return new Set();
    }
  });

  const [saveToast, setSaveToast] = useState(null);

  // Mapear el inventario del jugador con los datos de afinidad (ID numérico 1-52 y roles)
  const mappedInventory = useMemo(() => {
    return inventory.map((item, originalIndex) => {
      const affinityChar = findAffinityCharacter(item.character);
      const isDps = affinityChar ? isMainDps(affinityChar) : false;
      return {
        ...item,
        originalIndex,
        affinityChar,
        isMainDps: isDps
      };
    });
  }, [inventory]);

  // Ejecutar cálculo de afinidad llamando a POST /affinity/match
  const handleCalculateTeams = async (targetCarryId) => {
    const carryId = targetCarryId || selectedCarryId;
    if (!carryId) {
      setErrorMsg('Por favor selecciona primero un personaje Main DPS.');
      return;
    }

    // Filtrar personajes activos (excluyendo desactivados, asegurando que el Carry seleccionado esté activo)
    const activeItems = mappedInventory.filter((item) => {
      if (!item.affinityChar) return false;
      if (item.affinityChar.id === carryId) return true;
      return !deactivatedIds.has(item.affinityChar.id);
    });

    if (activeItems.length < 4) {
      setErrorMsg(
        `Se requieren al menos 4 personajes activos en tu inventario para formar un equipo completo. Tienes ${activeItems.length} activo(s).`
      );
      setTeams(null);
      return;
    }

    const payload = {
      targetCharacterId: Number(carryId),
      inventory: activeItems.map((item) => ({
        characterId: Number(item.affinityChar.id),
        constellation: Number(item.constellation ?? 0)
      }))
    };

    console.log('📤 [VGBuilder Affinity] Request Payload:', payload);

    setIsLoading(true);
    setErrorMsg(null);
    const startTime = performance.now();

    try {
      const response = await fetch('/affinity/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const elapsed = (performance.now() - startTime).toFixed(1);
      console.log(`⏱️ [VGBuilder Affinity] Tiempo de respuesta: ${elapsed} ms (HTTP ${response.status})`);

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      console.log('📥 [VGBuilder Affinity] Response Data:', data);

      if (!response.ok) {
        throw new Error(
          (data && data.message) || `Error HTTP ${response.status}: ${response.statusText || 'Error en servidor'}`
        );
      }

      if (Array.isArray(data)) {
        // Enriquecer cada miembro del equipo con sticker aleatorio (o icono oficial si no posee)
        const enrichedTeams = data.map((teamObj) => ({
          ...teamObj,
          team: (teamObj.team || []).map((member) => ({
            ...member,
            avatar: getTeamMemberAvatar(member.name)
          }))
        }));
        setTeams(enrichedTeams);
        if (enrichedTeams.length === 0) {
          setErrorMsg('No se encontraron combinaciones viables con los acompañantes activos.');
        }
      } else {
        throw new Error('La respuesta del servidor no tiene el formato esperado.');
      }
    } catch (err) {
      console.error('❌ [VGBuilder Affinity] Error en petición:', err);
      setErrorMsg(
        err.message || 'No se pudo conectar con el endpoint /affinity/match. Asegúrate de que el servidor esté activo.'
      );
      setTeams(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Al presionar "Seleccionar Carry": asigna, cierra el drawer y automáticamente ejecuta la búsqueda (más fluido)
  const handleSelectCarry = (charId) => {
    if (deactivatedIds.has(charId) && onToggleDeactivate) {
      onToggleDeactivate(charId);
    }
    setSelectedCarryId(charId);
    setErrorMsg(null);
    setIsDrawerOpen(false); // Cierre suave del drawer para ver resultados de inmediato
    // Búsqueda inmediata fluida
    handleCalculateTeams(charId);
  };

  // Guardar equipo en LocalStorage (sin timestamp)
  const handleSaveTeam = (teamObj, index) => {
    try {
      const existing = localStorage.getItem('genshin_saved_teams');
      const list = existing ? JSON.parse(existing) : [];

      const memberNames = (teamObj.team || []).map((m) => m.name).sort().join('_');
      const uniqueId = `team_${teamObj.archetype || 'custom'}_${memberNames}`;

      const alreadyExists = list.some((t) => t.id === uniqueId);
      if (alreadyExists) {
        setSaveToast(`El equipo "${teamObj.archetype}" ya está guardado.`);
        setTimeout(() => setSaveToast(null), 2500);
        return;
      }

      // Guardar información limpia con avatares normalizados a .webp
      const teamToSave = {
        id: uniqueId,
        rank: teamObj.rank || index + 1,
        archetype: teamObj.archetype,
        totalScore: teamObj.totalScore,
        targetCharacterId: selectedCarryId,
        team: (teamObj.team || []).map((m) => {
          let avatar = m.avatar;
          if (avatar && typeof avatar === 'string') {
            avatar = avatar.replace(/\.(png|jpe?g)$/i, '.webp');
          }
          if (!avatar) {
            avatar = getTeamMemberAvatar(m.name);
          }
          return {
            ...m,
            avatar
          };
        }),
        artifactAssignments: teamObj.artifactAssignments || []
      };

      const updated = [teamToSave, ...list];
      localStorage.setItem('genshin_saved_teams', JSON.stringify(updated));

      setSavedTeamIds((prev) => new Set([...prev, uniqueId]));
      setSaveToast(`¡Equipo "${teamObj.archetype}" guardado con éxito!`);
      setTimeout(() => setSaveToast(null), 2500);
    } catch (err) {
      console.error('Error al guardar equipo en localStorage:', err);
      setSaveToast('Error al guardar el equipo.');
      setTimeout(() => setSaveToast(null), 2500);
    }
  };

  // Obtener imagen del personaje usando los logos del proyecto
  const getMemberImage = (memberName) => {
    if (!memberName) return null;
    const foundInProject = CHARACTERS.find(
      (c) => c.name.toLowerCase() === memberName.toLowerCase()
    );
    if (foundInProject) {
      return foundInProject.icon || foundInProject.image;
    }
    return `/Images/Genshin Impact/Character Icons/${memberName} · Icon · Genshin Impact.webp`;
  };

  // Filtrado de personajes por elemento
  const filterByElement = (item) => {
    if (selectedElement === 'ALL') return true;
    const elem = (item.character.element || item.affinityChar?.element || '').toLowerCase();
    return elem === selectedElement.toLowerCase();
  };

  const mainDpsCharacters = mappedInventory.filter(
    (item) => item.affinityChar && item.isMainDps && filterByElement(item)
  );

  const supportCharacters = mappedInventory.filter(
    (item) => item.affinityChar && !item.isMainDps && filterByElement(item)
  );

  const elementKeys = ['ALL', 'pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'];

  const selectedCarryItem = mappedInventory.find(
    (item) => item.affinityChar && item.affinityChar.id === selectedCarryId
  );

  if (inventory.length === 0) {
    return (
      <div className="affinity-empty-state">
        <div className="hero-icon">⚡</div>
        <h2 className="hero-title">Tu inventario está vacío</h2>
        <p className="hero-desc">
          Para utilizar el Optimizador de Afinidad, primero agrega personajes de Genshin Impact a tu inventario.
        </p>
        <button
          type="button"
          className="btn-apple btn-apple-tinted btn-apple-add"
          onClick={onOpenModal}
          title="Agregar personajes al inventario"
        >
          <svg
            className="btn-apple-icon-svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Agregar</span>
        </button>
      </div>
    );
  }

  return (
    <div className="affinity-container">
      {/* Toast flotante de confirmación de guardado */}
      {saveToast && <div className="affinity-toast-notification">{saveToast}</div>}

      {/* BARRA SUPERIOR PARA ESCRITORIO: Filtro compacto por Elementos */}
      <div className="affinity-filter-bar">
        <div className="affinity-filter-left">
          <span className="affinity-filter-label">Elemento:</span>
          <div className="element-filter-pills-compact no-scrollbar">
            {elementKeys.map((key) => {
              const isAll = key === 'ALL';
              const meta = !isAll ? ELEMENTS[key] : null;
              const label = isAll ? 'Todos' : meta?.name || key;
              const isActive = selectedElement.toLowerCase() === key.toLowerCase();

              return (
                <button
                  key={key}
                  type="button"
                  className={`filter-pill-compact ${isActive ? 'active' : ''}`}
                  style={{
                    '--elem-color': meta?.color || '#38bdf8'
                  }}
                  onClick={() => setSelectedElement(key)}
                  title={`Filtrar por ${label}`}
                >
                  {!isAll && meta?.icon && (
                    <img
                      src={meta.icon}
                      alt={`Elemento ${label}`}
                      className="filter-pill-icon-compact"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedCarryItem && (
          <div className="affinity-current-carry-tag">
            Carry: <strong>{selectedCarryItem.character.name}</strong>
          </div>
        )}
      </div>

      {/* BARRA DE CONTROL MÓVIL STICKY (SELECTOR DE CARRY ACTIVO TIPO APPLE DROPDOWN) */}
      <div className="affinity-mobile-control-bar">
        <button
          type="button"
          className="btn-drawer-trigger"
          onClick={() => setIsDrawerOpen(true)}
          title="Abrir catálogo para seleccionar Carry activo"
          aria-expanded={isDrawerOpen}
        >
          <div className="drawer-trigger-content">
            <div className="drawer-trigger-avatar-wrap">
              {selectedCarryItem ? (
                <img
                  src={(selectedCarryItem.character.icon || selectedCarryItem.character.image || getDefaultCharacterIcon(selectedCarryItem.character.name)).replace(/\.(png|jpe?g)$/i, '.webp')}
                  alt={selectedCarryItem.character.name}
                  className="drawer-trigger-avatar-img"
                  width="28"
                  height="28"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <img
                  src="/Images/Genshin Impact/UI_Icons/Icon_Character_Lumine.webp"
                  alt="Selector de Personaje"
                  className="drawer-trigger-avatar-img drawer-trigger-avatar-lumine"
                  width="28"
                  height="28"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <span className="drawer-trigger-name">
              {selectedCarryItem ? selectedCarryItem.character.name : 'Selector de Personaje'}
            </span>
          </div>

          <svg
            className="drawer-trigger-chevrons"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="7 15 12 20 17 15" />
            <polyline points="7 9 12 4 17 9" />
          </svg>
        </button>
      </div>

      {/* OVERLAY DEL DRAWER EN MÓVIL */}
      <div
        className={`affinity-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      />

      {/* DISPOSICIÓN PRINCIPAL: 
          En escritorio: grid 2 columnas (300px 1fr)
          En móvil: bloque donde el panel izquierdo se transforma en drawer deslizante
      */}
      <div className="affinity-layout">
        {/* PANEL IZQUIERDO: Roster de personajes 
            - En PC: Columna lateral fija (300px), visible permanentemente.
            - En Móvil: Cajón deslizante (Drawer) con clase .drawer-open cuando isDrawerOpen es true.
        */}
        <aside
          className={`affinity-panel affinity-panel-inventory ${isDrawerOpen ? 'drawer-open' : ''}`}
          role="region"
          aria-label="Catálogo de personajes del inventario"
        >
          {/* Cabecera del Drawer visible SOLO en móvil */}
          <div className="affinity-drawer-mobile-header">
            <h3 className="affinity-drawer-title">Selector de Personaje</h3>
            <button
              type="button"
              className="affinity-drawer-close-btn"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Cerrar selector"
            >
              ✕
            </button>
          </div>

          {/* Filtro compacto por Elementos visible SOLO en el drawer móvil */}
          <div className="affinity-drawer-mobile-filter">
            <span className="affinity-filter-label">Filtrar por elemento:</span>
            <div className="element-filter-pills-compact no-scrollbar">
              {elementKeys.map((key) => {
                const isAll = key === 'ALL';
                const meta = !isAll ? ELEMENTS[key] : null;
                const label = isAll ? 'Todos' : meta?.name || key;
                const isActive = selectedElement.toLowerCase() === key.toLowerCase();

                return (
                  <button
                    key={key}
                    type="button"
                    className={`filter-pill-compact ${isActive ? 'active' : ''}`}
                    style={{
                      '--elem-color': meta?.color || '#38bdf8'
                    }}
                    onClick={() => setSelectedElement(key)}
                    title={`Filtrar por ${label}`}
                  >
                    {!isAll && meta?.icon && (
                      <img
                        src={meta.icon}
                        alt={`Elemento ${label}`}
                        className="filter-pill-icon-compact"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECCIÓN 1: Main DPS */}
          <div className="section-label ios-section-header section-main-dps">
            <span className="ios-section-title">MAIN DPS</span>
          </div>
          <div className="ios-section-caption">
            <span>Click para calcular | Click en el retrato para excluir</span>
          </div>

          {mainDpsCharacters.length === 0 ? (
            <div className="affinity-empty-group">
              No hay personajes Main DPS con este filtro.
            </div>
          ) : (
            <div className="affinity-char-list ios-inset-grouped">
              {mainDpsCharacters.map((item) => {
                const char = item.character;
                const affChar = item.affinityChar;
                const rarity = char.rarity || char.stars || 4;
                const isCarrySelected = selectedCarryId === affChar.id;
                const isDeactivated = deactivatedIds.has(affChar.id);
                const elemKey = (char.element || affChar.element || '').toLowerCase();
                const elemMeta = ELEMENTS[elemKey] || { color: '#38bdf8' };

                return (
                  <div
                    key={`${char.name}-${item.originalIndex}`}
                    className={`affinity-char-row row-main-dps ${isCarrySelected ? 'row-selected-carry' : ''} ${isDeactivated ? 'row-deactivated' : ''
                      }`}
                    onClick={() => handleSelectCarry(affChar.id)}
                    role="button"
                    tabIndex={0}
                    title="Toca para seleccionar como Carry y calcular composiciones"
                  >
                    <div className="char-info-col">
                      {/* Clic en icono: monocromático y desactivado */}
                      <div
                        className={`char-avatar-box rarity-${rarity} ${isDeactivated ? 'is-monochrome' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleDeactivate) onToggleDeactivate(affChar.id);
                        }}
                        role="button"
                        tabIndex={0}
                        title={
                          isDeactivated
                            ? 'Toca para activar'
                            : 'Toca para excluir (monocromático)'
                        }
                      >
                        <img
                          src={(char.icon || char.image || getDefaultCharacterIcon(char.name)).replace(/\.(png|jpe?g)$/i, '.webp')}
                          alt={`Avatar de ${char.name}`}
                          className="char-avatar-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="char-text-box">
                        <div className="char-name-line">
                          <span className="char-name-bold">{char.name}</span>
                          <span
                            className="element-tag"
                            style={{
                              '--elem-color': elemMeta.color,
                              '--elem-color-light': elemMeta.colorLight || elemMeta.color,
                              '--elem-bg-light': elemMeta.bgTintLight || `${elemMeta.color}18`,
                              backgroundColor: `${elemMeta.color}22`,
                              color: elemMeta.color,
                              borderColor: `${elemMeta.color}44`
                            }}
                          >
                            {affChar.element}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isCarrySelected && (
                      <div className="char-selection-checkmark" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECCIÓN 2: Soportes, Sub-DPS y Curadores */}
          <div className="section-label ios-section-header section-supports">
            <span className="ios-section-title">SUB-DPS / SOPORTES</span>
            <span className="section-hint ios-section-hint">Solo exclusión</span>
          </div>

          {supportCharacters.length === 0 ? (
            <div className="affinity-empty-group">
              No hay soportes con este filtro.
            </div>
          ) : (
            <div className="affinity-char-list ios-inset-grouped">
              {supportCharacters.map((item) => {
                const char = item.character;
                const affChar = item.affinityChar;
                const rarity = char.rarity || char.stars || 4;
                const isDeactivated = deactivatedIds.has(affChar.id);
                const elemKey = (char.element || affChar.element || '').toLowerCase();
                const elemMeta = ELEMENTS[elemKey] || { color: '#38bdf8' };

                return (
                  <div
                    key={`${char.name}-${item.originalIndex}`}
                    className={`affinity-char-row ${isDeactivated ? 'row-deactivated' : ''}`}
                  >
                    <div className="char-info-col">
                      {/* Clic en icono: monocromático y desactivado */}
                      <div
                        className={`char-avatar-box rarity-${rarity} ${isDeactivated ? 'is-monochrome' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleDeactivate) onToggleDeactivate(affChar.id);
                        }}
                        role="button"
                        tabIndex={0}
                        title={
                          isDeactivated
                            ? 'Toca para activar'
                            : 'Toca para excluir (monocromático)'
                        }
                      >
                        <img
                          src={(char.icon || char.image || getDefaultCharacterIcon(char.name)).replace(/\.(png|jpe?g)$/i, '.webp')}
                          alt={`Avatar de ${char.name}`}
                          className="char-avatar-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="char-text-box">
                        <div className="char-name-line">
                          <span className="char-name-bold">{char.name}</span>
                          <span
                            className="element-tag"
                            style={{
                              '--elem-color': elemMeta.color,
                              '--elem-color-light': elemMeta.colorLight || elemMeta.color,
                              '--elem-bg-light': elemMeta.bgTintLight || `${elemMeta.color}18`,
                              backgroundColor: `${elemMeta.color}22`,
                              color: elemMeta.color,
                              borderColor: `${elemMeta.color}44`
                            }}
                          >
                            {affChar.element}
                          </span>
                        </div>
                        <div className="char-subline">
                          <span className="char-roles-text">
                            {(affChar.roles || []).join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* ÁREA DE RESULTADOS: Columna derecha en escritorio, vista principal en móvil */}
        <div className="affinity-panel affinity-panel-results">
          {/* Estado de carga */}
          {isLoading && (
            <div className="affinity-loading-box">
              <div className="loading-spinner" />
              <p>Calculando composiciones óptimas de afinidad...</p>
            </div>
          )}

          {/* Mensaje de aviso/error */}
          {errorMsg && !isLoading && (
            <div className="affinity-error-box">
              <span className="error-icon">⚠️</span>
              <div>
                <strong>Aviso:</strong> {errorMsg}
              </div>
            </div>
          )}

          {/* Si aún no se selecciona ningún Carry */}
          {!teams && !isLoading && !errorMsg && (
            <div className="affinity-placeholder-box">
              <img
                src="/Images/stckersGI/yuegui_dance.webp"
                alt="Yuegui"
                className="affinity-placeholder-sticker"
                width="140"
                height="140"
                loading="lazy"
                decoding="async"
              />
              <h3 className="placeholder-title">
                {selectedCarryItem
                  ? `Carry: ${selectedCarryItem.character.name}`
                  : 'Selecciona un Personaje Principal'}
              </h3>
              {/*<p className="placeholder-desc">
                Selecciona un personaje Main DPS de tu inventario para generar automáticamente las mejores combinaciones de equipo.
              </p>
              <button
                type="button"
                className="btn-pill btn-pill-primary mobile-only-trigger-btn"
                onClick={() => setIsDrawerOpen(true)}
              >
                👥 Abrir Catálogo & Elegir Carry
              </button>*/}
            </div>
          )}

          {/* RENDERIZADO VISUAL DE LOS EQUIPOS SUGERIDOS */}
          {teams && !isLoading && (
            <div className="teams-container">
              {teams.map((t, index) => {
                const memberNames = (t.team || []).map((m) => m.name).sort().join('_');
                const uniqueId = `team_${t.archetype || 'custom'}_${memberNames}`;
                const isSaved = savedTeamIds.has(uniqueId);

                return (
                  <div key={index} className="team-card team-card-clean">
                    {/* Encabezado: Nombre del equipo y botón de guardado */}
                    <div className="team-header">
                      <span className="team-archetype-title">
                        {t.archetype || 'Equipo Sugerido'}
                      </span>

                      <button
                        type="button"
                        className={`btn-save-team ${isSaved ? 'btn-save-team-saved' : ''}`}
                        onClick={() => handleSaveTeam(t, index)}
                        title={isSaved ? 'Equipo guardado en almacenamiento local' : 'Guardar equipo'}
                        aria-label={isSaved ? 'Guardado' : 'Guardar'}
                      >
                        <svg
                          className="btn-save-bookmark-icon"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill={isSaved ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                        <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
                      </button>
                    </div>

                    {/* Fila/Cuadrícula de Personajes */}
                    <div className="team-members-grid">
                      {(t.team || []).map((m, mIdx) => {
                        const rawAvatar = m.avatar && typeof m.avatar === 'string'
                          ? m.avatar.replace(/\.(png|jpe?g)$/i, '.webp')
                          : null;
                        const charImg = rawAvatar || getTeamMemberAvatar(m.name);
                        const shortName = getShortCharacterName(m.name);
                        const elemMeta = ELEMENTS[m.element?.toLowerCase()] || {};
                        const elemIcon = elemMeta.icon;

                        const artifactBind = (t.artifactAssignments || []).find(
                          (a) => a.characterName?.toLowerCase() === m.name?.toLowerCase() || a.characterId === m.id
                        );
                        const artifactSetName = artifactBind?.artifactSetName || 'Sin set sugerido';
                        const isNone = !artifactBind?.artifactSetName || artifactSetName === 'Sin set sugerido';
                        const artifactIcon = getArtifactSetIcon(artifactSetName);

                        return (
                          <div key={`${m.name}-${mIdx}`} className="team-member-showcase">
                            <div className="member-showcase-avatar-wrap">
                              {charImg ? (
                                <img
                                  src={charImg}
                                  alt={`Sticker o avatar de ${m.name}`}
                                  className="member-showcase-img"
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const fallback = getDefaultCharacterIcon(m.name);
                                    if (fallback && e.target.src !== fallback) {
                                      e.target.src = fallback;
                                    } else {
                                      e.target.style.display = 'none';
                                    }
                                  }}
                                />
                              ) : (
                                <div className="member-showcase-placeholder">
                                  {m.name.charAt(0)}
                                </div>
                              )}
                            </div>

                            {/* Contenedor de datos a la derecha en móvil / centrado en escritorio */}
                            <div className="member-showcase-details-col">
                              {/* [Icono del elemento] • [Nombre corto del personaje] • [Rol] */}
                              <div className="member-showcase-meta-line">
                                {elemIcon && (
                                  <img
                                    src={elemIcon}
                                    alt={`Elemento ${m.element}`}
                                    className="member-elem-icon-small"
                                    loading="lazy"
                                    decoding="async"
                                    title={`Elemento: ${m.element}`}
                                  />
                                )}
                                <span className="member-meta-separator">•</span>
                                <span className="member-short-name">{shortName}</span>
                                <span className="member-meta-separator">•</span>
                                <span className="member-short-role">{m.role || 'Miembro'}</span>
                              </div>

                              {/* Set de artefactos sugerido */}
                              <div
                                className={`member-showcase-artifact ${isNone ? 'is-none' : ''}`}
                                title={`Set sugerido: ${artifactSetName}`}
                              >
                                {artifactIcon ? (
                                  <img
                                    src={artifactIcon}
                                    alt=""
                                    className="artifact-set-icon-img"
                                    width="18"
                                    height="18"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : (
                                  <span className="artifact-icon-sparkle">✦</span>
                                )}
                                <span className="artifact-name-text">{artifactSetName}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AffinityMatcher;