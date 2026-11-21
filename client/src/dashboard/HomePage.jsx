import React from 'react';
import { useRouter } from '../shared/router';

export function HomePage() {
  const { navigate } = useRouter();

  const games = [
    {
      id: 'genshin',
      name: 'Genshin Impact',
      status: 'active',
      statusLabel: '✦ Motor Activo',
      logoSrc: '/Images/logos/gi_logo.webp',
      bannerImg: '/Images/banners/genshin.webp',
      webImg: 'https://wallpapercave.com/wp/wp7486905.jpg',
      desc: 'Creación de equipos optimizados y sincronización con tu cuenta de Genshin Impact a través de Enka.Network.',
      actionLabel: 'Abrir motor →',
      action: () => navigate('/genshin'),
      featured: true
    },
    {
      id: 'zzz',
      name: 'Zenless Zone Zero (ZZZ)',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logoSrc: '/Images/logos/zzz_logo.webp',
      bannerImg: '/Images/banners/zzz.webp',
      webImg: 'https://wallpapercave.com/wp/wp12340088.jpg',
      desc: 'Análisis de acumulación de anomalías de atributos, sinergias de facciones urbanas y compatibilidad de Bangboo.',
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'hsr',
      name: 'Honkai: Star Rail',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logoSrc: '/Images/logos/hsr_logo.webp',
      bannerImg: '/Images/banners/hsr.webp',
      webImg: 'https://wallpapercave.com/wp/wp12342709.jpg',
      desc: 'Simulación de sinergias entre Vías de combate, cobertura de debilidades de ruptura y optimización de Conos de Luz.',
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'umamusume',
      name: 'Uma Musume: Pretty Derby',
      status: 'upcoming',
      statusLabel: 'En Desarrollo',
      logoSrc: '/Images/logos/um_logo.webp',
      bannerImg: '/Images/banners/umamusume.webp',
      webImg: 'https://wallpapercave.com/wp/wp6538873.png',
      desc: 'Modelado de compatibilidad genética entre corredoras, factores de herencia y afinidad de cartas de soporte.',
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    },
    {
      id: 'wuwa',
      name: 'Wuthering Waves',
      status: 'planned',
      statusLabel: 'Planificado',
      logoSrc: '/Images/logos/ww_logo.webp',
      bannerImg: '/Images/banners/wuwa.webp',
      webImg: 'https://wallpapercave.com/wp/wp12600978.jpg',
      desc: 'Optimización de conjuntos sonoros de Ecos, atributos de concierto y combinaciones de habilidades Intro/Outro.',
      actionLabel: 'Próximamente',
      action: null,
      featured: false
    }
  ];

  // Lista de banners duplicada para loop infinito continuo tipo GIF
  const heroBanners = [...games, ...games];

  return (
    <div className="home-container">
      {/* Hero con carrusel automático tipo GIF (no interactivo) */}
      <section className="home-hero-wrapper">
        <div className="home-hero-banner-container">
          {/* Carrusel continuo sin gaps ni interactividad */}
          <div className="hero-banner-carousel" aria-hidden="true">
            <div className="hero-carousel-track">
              {heroBanners.map((game, idx) => (
                <div key={`${game.id}-${idx}`} className="hero-carousel-slide">
                  <img
                    src={game.bannerImg}
                    alt=""
                    className="hero-carousel-img"
                    loading={idx < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={(e) => {
                      if (game.webImg && e.target.src !== game.webImg) {
                        e.target.src = game.webImg;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Degradado oscuro de alto contraste */}
          <div className="hero-banner-overlay" />

          {/* Textos centrados sobre el degradado */}
          <div className="hero-banner-content">
            <h1 className="hero-banner-title">VGBuilder</h1>
            <p className="hero-banner-subtitle">
              Optimizador modular de escuadras y sinergias gacha
            </p>
          </div>
        </div>

        {/* Botones de acción debajo del Hero (Estilo iOS) */}
        <div className="home-hero-actions">
          <button
            type="button"
            className="home-btn-primary"
            onClick={() => {
              document.getElementById('motores')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explorar motores
          </button>
          <button
            type="button"
            className="home-btn-secondary"
            onClick={() => {
              document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Cómo funciona
          </button>
        </div>
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
              {/* Portada / Banner del juego */}
              <div className="game-card-cover">
                <img
                  src={game.bannerImg}
                  alt={`Portada oficial del juego ${game.name}`}
                  className="game-cover-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (game.webImg && e.target.src !== game.webImg) {
                      e.target.src = game.webImg;
                    }
                  }}
                />
                <div className="game-cover-overlay" />
                <div className="game-card-header">
                  {/* Contenedor del logo: abarca toda la caja con bordes redondeados y borde */}
                  <div className="game-logo-wrapper">
                    <img
                      src={game.logoSrc}
                      alt={`Logo de ${game.name}`}
                      className="game-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="game-status-badge">
                    <span className={`status-dot dot-${game.status}`} />
                    {game.statusLabel}
                  </div>
                </div>
              </div>

              <div className="game-card-body">
                <h3 className="game-title">{game.name}</h3>
                <p className="game-description">{game.desc}</p>
              </div>

              <div className="game-card-footer">
                {game.action ? (
                  <button
                    type="button"
                    className="game-action-btn game-action-btn-primary"
                    onClick={game.action}
                  >
                    {game.actionLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="game-action-btn game-action-btn-disabled"
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
      <section id="como-funciona" className="features-section">
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

export default HomePage;
