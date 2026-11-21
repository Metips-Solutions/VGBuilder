import React from 'react';
import { useRouter } from '../shared/router';

export function NotFoundPage() {
  const { navigate } = useRouter();

  return (
    <div className="not-found-container">
      <img
        src="/Images/stckersGI/aino_fix.webp"
        alt="Página no encontrada"
        className="not-found-sticker"
      />
      <h1 className="not-found-title">La página que buscas no existe</h1>
      <a
        href="/"
        className="not-found-link"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        O ve a nuestra página principal
      </a>
    </div>
  );
}

export default NotFoundPage;
