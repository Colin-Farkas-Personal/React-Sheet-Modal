import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FlightsApp from './FlightsApp.tsx';
import './style/_module.scss';
import OnlineStoreApp from './OnlineStoreApp.tsx';

const root = createRoot(document.getElementById('root')!);

const renderApp = function () {
  const env = import.meta.env.VITE_APP;
  if (env === 'app-1') {
    return <FlightsApp />;
  } else if (
    env === 'app-2') {
      return <OnlineStoreApp />;
    }

  console.warn(`env path "${env}" does not exist`);
};

root.render(<StrictMode>{renderApp()}</StrictMode>);
