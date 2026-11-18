import React, { useState, useEffect } from 'react';
import { CHARACTERS, ELEMENTS } from '../data/characters';
import {
  getTeamMemberAvatar,
  getDefaultCharacterIcon,
  getShortCharacterName
} from '../data/characterStickers';

export function SavedTeamsView({ onGoToOptimizer }) {
  const [savedTeams, setSavedTeams] = useState(() => {
    try {
      const data = localStorage.getItem('genshin_saved_teams');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('genshin_saved_teams', JSON.stringify(savedTeams));
    } catch (e) {
      console.warn('Error al guardar equipos en localStorage:', e);
    }
  }, [savedTeams]);

  const handleDeleteTeam = (teamId) => {
    const updated = savedTeams.filter((t) => t.id !== teamId);
    setSavedTeams(updated);
    setNotification('Equipo eliminado');
    setTimeout(() => setNotification(null), 2000);
  };

  const handleClearAll = () => {
    if (savedTeams.length === 0) return;
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar TODOS los equipos guardados?'
    );
    if (confirmed) {
      setSavedTeams([]);
      try {
        localStorage.removeItem('genshin_saved_teams');
      } catch (e) {
        console.warn('Error al limpiar equipos en localStorage:', e);
      }
      setNotification('Se han eliminado todos los equipos guardados');
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const getCharacterImage = (memberName) => {
    if (!memberName) return null;
    const found = CHARACTERS.find(
      (c) => c.name.toLowerCase() === memberName.toLowerCase()
    );
    return found ? (found.icon || found.image) : `/Images/Genshin Impact/Character Icons/${memberName} · Icon · Genshin Impact.png`;
  };

  if (savedTeams.length === 0) {
    return (
      <div className="saved-teams-empty">
        <div className="saved-teams-empty-icon">💾</div>
        <h3 className="saved-teams-empty-title">No hay equipos guardados</h3>
        <p className="saved-teams-empty-desc">
          En el <strong>Optimizador de Afinidad</strong>, selecciona un Main DPS y pulsa el botón <strong>💾 Guardar Equipo</strong> para conservarlos aquí.
        </p>
        {onGoToOptimizer && (
          <button
            type="button"
            className="btn-pill btn-pill-primary"
            onClick={onGoToOptimizer}
          >
            ⚡ Ir al Optimizador de Afinidad
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="saved-teams-section">
      <div className="saved-teams-header">
        <div className="saved-teams-title-group">
          <h2 className="saved-teams-heading">
            Equipos Guardados
            <span className="badge-counter">{savedTeams.length}</span>
          </h2>
          <p className="saved-teams-subheading">
            Tus composiciones favoritas guardadas en el almacenamiento local
          </p>
        </div>

        <div className="saved-teams-actions">
          {notification && (
            <span className="saved-teams-toast">{notification}</span>
          )}
          <button
            type="button"
            className="btn-pill btn-pill-danger-outline"
            onClick={handleClearAll}
            title="Borrar todas las composiciones guardadas"
          >
            🗑️ Vaciar Guardados
          </button>
        </div>
      </div>

      <div className="teams-container">
        {savedTeams.map((t, index) => {
          return (
            <div key={t.id || index} className="team-card team-card-clean">
              {/* Encabezado limpio: Nombre del equipo y botón de acción */}
              <div className="team-header">
                <span className="team-archetype-title">
                  {t.archetype || 'Equipo Personalizado'}
                </span>

                <button
                  type="button"
                  className="btn-team-delete"
                  onClick={() => handleDeleteTeam(t.id)}
                  title="Eliminar este equipo guardado"
                  aria-label="Eliminar equipo"
                >
                  🗑️ Eliminar
                </button>
              </div>

              {/* Fila de Personajes con imágenes más grandes, sin bordes ni fondo */}
              <div className="team-members-grid">
                {(t.team || []).map((m, mIdx) => {
                  const charImg = m.avatar || getTeamMemberAvatar(m.name);
                  const shortName = getShortCharacterName(m.name);
                  const elemMeta = ELEMENTS[m.element?.toLowerCase()] || {};
                  const elemIcon = elemMeta.icon;

                  const artifactBind = (t.artifactAssignments || []).find(
                    (a) => a.characterName?.toLowerCase() === m.name?.toLowerCase() || a.characterId === m.id
                  );
                  const artifactSetName = artifactBind?.artifactSetName || 'Sin set sugerido';
                  const isNone = !artifactBind?.artifactSetName || artifactSetName === 'Sin set sugerido';

                  return (
                    <div key={`${m.name}-${mIdx}`} className="team-member-showcase">
                      <div className="member-showcase-avatar-wrap">
                        {charImg ? (
                          <img
                            src={charImg}
                            alt={m.name}
                            className="member-showcase-img"
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

                      {/* [Icono del elemento] • [Nombre corto del personaje] • [Rol] */}
                      <div className="member-showcase-meta-line">
                        {elemIcon && (
                          <img
                            src={elemIcon}
                            alt={m.element}
                            className="member-elem-icon-small"
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
                        <span className="artifact-icon-sparkle">✦</span>
                        <span className="artifact-name-text">{artifactSetName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavedTeamsView;
