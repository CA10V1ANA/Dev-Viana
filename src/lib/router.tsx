import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface RouterContextValue {
  pathname: string;
  search: string;
  hash: string;
  isNavigating: boolean;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  search: '',
  hash: '',
  isNavigating: false,
  navigate: () => {},
});

function parseLocation() {
  return {
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
    hash: window.location.hash || '',
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loc, setLoc] = useState(parseLocation);
  const [isNavigating, setIsNavigating] = useState(false);

  const commitLocation = useCallback((next: { pathname: string; search: string; hash: string }) => {
    const updateDom = () => {
      setLoc(next);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };

    if (
      typeof doc.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsNavigating(true);
      const transition = doc.startViewTransition(updateDom);
      transition.finished.finally(() => {
        setTimeout(() => setIsNavigating(false), 180);
      });
    } else {
      setIsNavigating(true);
      updateDom();
      setTimeout(() => setIsNavigating(false), 320);
    }
  }, []);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean }) => {
      const url = new URL(to, window.location.origin);
      const next = {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      };

      const samePath = url.pathname === window.location.pathname && url.search === window.location.search;

      if (options?.replace) {
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      } else {
        window.history.pushState({}, '', url.pathname + url.search + url.hash);
      }

      if (samePath && url.hash) {
        setLoc(next);
        const target = document.getElementById(url.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      commitLocation(next);

      requestAnimationFrame(() => {
        if (url.hash) {
          const target = document.getElementById(url.hash.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    },
    [commitLocation]
  );

  useEffect(() => {
    const onPopState = () => {
      commitLocation(parseLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [commitLocation]);

  return (
    <RouterContext.Provider value={{ ...loc, isNavigating, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      to.startsWith('http') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:')
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
