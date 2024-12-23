import { useState } from 'react';
import MainCard from './components/Card/MainCard';
import TicketSheet from './components/Sheet/TicketSheet';
import './style/app.css';

function FlightsApp() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function openSheet() {
    setIsSheetOpen(true);
  }

  function closeSheet() {
    setIsSheetOpen(false);
  }

  return (
    <div className="app-flights">
      <TicketSheet isPresented={isSheetOpen} onClose={closeSheet} />
      <section className="flights-main">
        <h1>Your flight</h1>
        <MainCard
          departure={new Date()}
          gate="A11"
          origin="CPH"
          destination="SYD"
          onClick={openSheet}
        />
      </section>
    </div>
  );
}

export default FlightsApp;
