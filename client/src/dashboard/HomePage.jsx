import React from 'react';
import { useRouter } from '../shared/router';
import { GenshinLogo, ZZZLogo, HSRLogo, UmaMusumeLogo, WuWaLogo } from './GameLogos';

export function HomePage() {
  const { navigate } = useRouter();

  const games = [
    {
      id: 'genshin',
      name: 'Genshin Impact',
      tagline: 'Afinidad Elemental & Sinergias Teyvat',
      status: 'active',
      statusLabel: '✦ Motor Activo',
      logo: <GenshinLogo size={52} />,
      bannerImg: '/Images/banners/genshin.webp',
      webImg: 'https://wallpapercave.com/wp/wp7486905.jpg',
      desc: 'Gestión completa de inventario de personajes, constelaciones C0-C6, sincronización automática vía Enka.Network y optimización de afinidad elemental.',
      tags: ['Afinidad Elemental', 'Sincronización Enka', 'Constelaciones C0-C6', 'Filtrado por Elemento'],
      actionLabel: 'Abrir Motor de Genshin Impact →',
      action: () => navigate('/genshin'),
      featured: true
    },
    {
      id: 'zzz',
      name: 'Zenless Zone Zero (ZZZ)',
      tagline: 'Facciones de New Eridu & Bangboos',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logo: <ZZZLogo size={52} />,
      bannerImg: '/Images/banners/zzz.webp',
      webImg: 'https://wallpapercave.com/wp/wp12340088.jpg',
      desc: 'Análisis de acumulación de anomalías de atributos (Físico, Fuego, Hielo, Eléctrico, Éter), sinergias de facciones urbanas y compatibilidad de Bangboo.',
      tags: ['Sinergias de Facción', 'Cálculo de Anomalías', 'Compatibilidad Bangboo'],
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'hsr',
      name: 'Honkai: Star Rail',
      tagline: 'Vías Estelares & Cobertura de Debilidades',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logo: <HSRLogo size={52} />,
      bannerImg: '/Images/banners/hsr.webp',
      webImg: 'https://wallpapercave.com/wp/wp12342709.jpg',
      desc: 'Simulación de sinergias entre Vías de combate (Destrucción, Cacería, Armonía, Nihilidad), cobertura de debilidades de ruptura y optimización de Conos de Luz.',
      tags: ['Afinidad de Vías', 'Cobertura de Ruptura', 'Sinergias Conos de Luz'],
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'umamusume',
      name: 'Uma Musume: Pretty Derby',
      tagline: 'Linajes Genéticos & Factores de Herencia',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logo: <UmaMusumeLogo size={52} />,
      bannerImg: '/Images/banners/umamusume.webp',
      webImg: 'https://wallpapercave.com/wp/wp6538873.png',
      desc: 'Modelado de compatibilidad genética entre corredoras, simulación de factores de herencia (azul, rojo, blanco) y afinidad de mazos de soporte.',
      tags: ['Afinidad de Linaje', 'Factores de Herencia', 'Aptitud de Pista'],
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'wuwa',
      name: 'Wuthering Waves',
      tagline: 'Ecos de Sonata & Cadenas de Concierto',
      status: 'planned',
      statusLabel: 'Planificado',
      logo: <WuWaLogo size={52} />,
      bannerImg: '/Images/banners/wuwa.webp',
      webImg: 'https://wallpapercave.com/wp/wp12600978.jpg',
      desc: 'Optimización de conjuntos sonoros de Ecos, atributos de concierto y combinaciones de habilidades Intro/Outro entre resonadores.',
      tags: ['Conjuntos de Ecos', 'Cadenas Intro/Outro', 'Resonancia Elemental'],
      actionLabel: 'Planificado',
      action: null,
      featured: false
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Banner Principal con nombre de proyecto, imágenes de juegos y resumen */}
      <section className="home-hero">
        {/* <div className="home-hero-badge">
          <span className="hero-badge-spark">✦</span>
          <span>Plataforma de Optimización Gacha Multi-Juego</span>
        </div> */}

        <h1 className="home-hero-title">
          VGBuilder
        </h1>

        <p className="home-hero-summary">
          Plataforma de alto rendimiento diseñada para calcular afinidades, evaluar sinergias de escuadra y gestionar
          el inventario de tus personajes de forma <strong>100% local, privada y modular</strong> para los principales
          títulos gacha del mercado.
        </p>

        {/* Tira visual de imágenes de los juegos sacadas de internet en el banner */}
        <div className="hero-games-reel">
          {games.map((g) => (
            <div
              key={g.id}
              className={`reel-card ${g.featured ? 'reel-card-featured' : ''}`}
              onClick={g.action ? g.action : undefined}
              role={g.action ? 'button' : undefined}
              tabIndex={g.action ? 0 : undefined}
              title={g.action ? `Ir a ${g.name}` : `${g.name} (${g.statusLabel})`}
            >
              <img
                src={g.bannerImg}
                alt={`Banner ilustrativo de ${g.name}`}
                className="reel-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (e.target.src !== g.webImg) e.target.src = g.webImg;
                }}
              />
              <div className="reel-overlay" />
              <div className="reel-content">
                <span className="reel-logo">{g.logo}</span>
                <span className="reel-name">{g.name}</span>
                <span className={`reel-badge badge-${g.status}`}>{g.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="home-hero-actions">
          <button
            type="button"
            className="btn-pill btn-pill-primary home-btn-cta"
            onClick={() => navigate('/genshin')}
          >
            ✦ Abrir Motor de Genshin Impact
          </button>
          <a
            href="#motores"
            className="btn-pill btn-pill-secondary home-btn-explore"
          >
            Ver Catálogo Completo ↓
          </a>
        </div> */}

        {/* Pilares clave del proyecto en formato chips */}
        {/* <div className="home-hero-chips">
          <div className="hero-chip">
            <span className="hero-chip-icon">🎮</span>
            <span>Arquitectura Multi-Motor</span>
          </div>
          <div className="hero-chip">
            <span className="hero-chip-icon">⚡</span>
            <span>Sincronización Enka Automática</span>
          </div>
          <div className="hero-chip">
            <span className="hero-chip-icon">🔒</span>
            <span>100% Privado en LocalStorage</span>
          </div>
          <div className="hero-chip">
            <span className="hero-chip-icon">🚀</span>
            <span>React 19 + Bun</span>
          </div>
        </div> */}
      </section>

      {/* Directorio de Juegos: Banners, Logos y tarjetas de motores */}
      <section id="motores" className="games-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="section-badge">Directorio</span>
            <h2 className="section-heading">Motores de Juegos</h2>
          </div>
          <p className="section-subheading">
            Selecciona el motor correspondiente a tu juego favorito o explora las integraciones actualmente en desarrollo.
          </p>
        </div>

        <div className="games-grid">
          {games.map((game) => (
            <article
              key={game.id}
              className={`game-card ${game.featured ? 'game-card-featured' : ''} game-card-${game.status}`}
            >
              {/* Portada / Banner del juego extraído de internet */}
              <div className="game-card-cover">
                <img
                  src={game.bannerImg}
                  alt={`Portada oficial del juego ${game.name}`}
                  className="game-cover-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (e.target.src !== game.webImg) {
                      e.target.src = game.webImg;
                    }
                  }}
                />
                <div className="game-cover-overlay" />
                <div className="game-card-header">
                  <div className="game-logo-wrapper">
                    {game.logo}
                  </div>
                  <div className="game-status-badge">
                    <span className={`status-dot dot-${game.status}`} />
                    {game.statusLabel}
                  </div>
                </div>
              </div>

              <div className="game-card-body">
                <h3 className="game-title">{game.name}</h3>
                <span className="game-tagline">{game.tagline}</span>
                <p className="game-description">{game.desc}</p>

                <div className="game-tags">
                  {game.tags.map((tag) => (
                    <span key={tag} className="game-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="game-card-footer">
                {game.action ? (
                  <button
                    type="button"
                    className="btn-pill btn-pill-primary game-action-btn"
                    onClick={game.action}
                  >
                    {game.actionLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-pill btn-pill-secondary game-action-btn game-action-disabled"
                    disabled
                  >
                    {game.actionLabel}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Resumen de características y arquitectura */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-heading">¿Cómo funciona la plataforma VGBuilder?</h2>
          <p className="features-subheading">
            Diseñada pensando en la escalabilidad para abarcar múltiples juegos bajo un estándar común de experiencia de usuario.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3 className="feature-title">Motores Especializados Desacoplados</h3>
            <p className="feature-desc">
              Cada juego posee mecánicas singulares (reacciones elementales en Genshin, rupturas en Star Rail o factores en Uma Musume). Cada motor implementa sus algoritmos de forma independiente.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Ingesta Rápida por UID Público</h3>
            <p className="feature-desc">
              Evita tener que capturar personajes uno por uno a mano. Nos integramos con servicios comunitarios públicos (como Enka.Network) para leer los perfiles públicos y cargar personajes con un clic.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">Privacidad y Almacenamiento Local</h3>
            <p className="feature-desc">
              No almacenamos tus datos en bases de datos externas ni te pedimos cuentas privadas. Toda la información de tu equipo se guarda en el <code>localStorage</code> de tu propio navegador.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
