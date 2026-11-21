import React, { useState, useEffect } from 'react';
import { CHARACTERS, ELEMENTS } from '../data/characters';
import {
  getTeamMemberAvatar,
  getDefaultCharacterIcon,
  getShortCharacterName
} from '../data/characterStickers';
import { getArtifactSetIcon } from '../data/artifactIcons';
import { AppleConfirmModal } from '../../shared';

export function SavedTeamsView({ onGoToOptimizer }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [savedTeams, setSavedTeams] = useState(() => {
    try {
      const data = localStorage.getItem('genshin_saved_teams');
      if (!data) return [];
      const list = JSON.parse(data);
      // Auto-migración a .webp para avatares y stickers guardados
      const migrated = list.map((t) => ({
        ...t,
        team: (t.team || []).map((m) => {
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
        })
      }));
      localStorage.setItem('genshin_saved_teams', JSON.stringify(migrated));
      return migrated;
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

  const handleClearAllConfirmed = () => {
    if (savedTeams.length === 0) return;
    setSavedTeams([]);
    try {
      localStorage.removeItem('genshin_saved_teams');
    } catch (e) {
      console.warn('Error al limpiar equipos en localStorage:', e);
    }
    setNotification('Se han eliminado todos los equipos guardados');
    setTimeout(() => setNotification(null), 2000);
  };

  const getCharacterImage = (memberName) => {
    if (!memberName) return null;
    const found = CHARACTERS.find(
      (c) => c.name.toLowerCase() === memberName.toLowerCase()
    );
    return found ? (found.icon || found.image) : `/Images/Genshin Impact/Character Icons/${memberName} · Icon · Genshin Impact.webp`;
  };

  if (savedTeams.length === 0) {
    return (
      <div className="saved-teams-empty">
        <img
          src="/Images/Genshin Impact/Character Icons/wolfy_sleep.webp"
          alt="Sin equipos guardados"
          className="saved-teams-empty-sticker"
          width="130"
          height="130"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const fallback = '/Images/Genshin Impact/Character Icons/wolfy_sleep.png';
            if (e.target.src !== fallback) {
              e.target.src = fallback;
            }
          }}
        />
        <p className="saved-teams-empty-desc">
          ¡Usa el <strong>Creador de Equipos</strong> para guardar tu equipo preferido aquí!
        </p>
      </div>
    );
  }

  return (
    <div className="saved-teams-section">
      <div className="saved-teams-header">
        <div className="saved-teams-title-group">
          <div className="saved-teams-title-row">
            <h2 className="saved-teams-heading">
              Equipos Guardados
              <span className="badge-counter">{savedTeams.length}</span>
            </h2>
            <div className="saved-teams-actions">
              {notification && (
                <span className="saved-teams-toast">{notification}</span>
              )}
              <button
                type="button"
                className="btn-apple-destructive-tinted"
                onClick={() => setIsConfirmModalOpen(true)}
                title="Vaciar todos los equipos guardados"
                aria-label="Vaciar equipos guardados"
              >
                {/* <svg
                  className="btn-destructive-trash-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg> */}
                <span>Vaciar</span>
              </button>
            </div>
          </div>
          {/* <p className="saved-teams-subheading">
            Tus composiciones favoritas guardadas en el almacenamiento local
          </p> */}
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
                  Eliminar
                </button>
              </div>

              {/* Fila de Personajes con imágenes más grandes, sin bordes ni fondo */}
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

      {/* Modal de confirmación nativo estilo Apple para vaciar guardados */}
      <AppleConfirmModal
        isOpen={isConfirmModalOpen}
        title="¿Vaciar equipos guardados?"
        description="Esta acción eliminará todas las composiciones guardadas de forma permanente. No se puede deshacer."
        confirmText="Eliminar todo"
        cancelText="Cancelar"
        onConfirm={() => {
          handleClearAllConfirmed();
          setIsConfirmModalOpen(false);
        }}
        onCancel={() => setIsConfirmModalOpen(false)}
        isDestructive={true}
      />
    </div>
  );
}

export default SavedTeamsView;
