import React from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { Layout } from './components/Layout';
import { OpeningSplash } from './components/OpeningSplash';
import { useScrollReveal } from './hooks/useReveal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StartProjectPage } from './pages/StartProjectPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ConceptPage } from './pages/ConceptPage';

const AppRoutes: React.FC = () => {
  const { pathname } = useRouter();
  useScrollReveal(pathname);

  if (pathname === '/concepts/frame') {
    return (
      <Layout hideChrome>
        <ConceptPage slug="frame" />
      </Layout>
    );
  }
  if (pathname === '/concepts/showcase') {
    return (
      <Layout hideChrome>
        <ConceptPage slug="showcase" />
      </Layout>
    );
  }
  if (pathname === '/concepts/identity') {
    return (
      <Layout hideChrome>
        <ConceptPage slug="identity" />
      </Layout>
    );
  }
  if (pathname === '/concepts/decor') {
    return (
      <Layout hideChrome>
        <ConceptPage slug="decor" />
      </Layout>
    );
  }

  let page: React.ReactNode = <HomePage />;
  if (pathname === '/services') page = <ServicesPage />;
  else if (pathname === '/studio') page = <AboutPage />;
  else if (pathname === '/contact') page = <ContactPage />;
  else if (pathname === '/start-a-project') page = <StartProjectPage />;
  else if (pathname === '/privacy') page = <PrivacyPage />;

  return <Layout>{page}</Layout>;
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <OpeningSplash />
      <AppRoutes />
    </RouterProvider>
  );
};

export default App;
