import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext({
  path: '/',
  navigate: () => {}
});

function getCleanPath() {
  if (typeof window === 'undefined') return '/';

  // Soporte para hash fallback (#/genshin) si se accede sin rewrite de servidor
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const hashPath = hash.slice(1).split('?')[0].toLowerCase();
    return hashPath || '/';
  }

  // Normalizar pathname: sin barra final excepto en raíz
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  return pathname;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(getCleanPath);

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCleanPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((to) => {
    const target = to.toLowerCase();
    const current = getCleanPath();
    if (current !== target) {
      window.history.pushState({}, '', target);
      setPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, className, onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
