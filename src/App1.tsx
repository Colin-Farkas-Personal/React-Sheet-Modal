import { useState } from 'react';
import CardList from './components/Card/CardList';
import CardListItem from './components/Card/CardListItem';
import MainCard from './components/Card/MainCard';
import TicketSheet from './components/Sheet/TicketSheet';
import './style/app.css';

function App() {
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
      <section className="flights-prior">
        <h2>Previous flights</h2>
        <CardList>
          <CardListItem date="2024-04-08" origin="FRA" destination="JFK" />
          <CardListItem date="2024-04-09" origin="LHR" destination="DXB" />
          <CardListItem date="2024-04-10" origin="SYD" destination="LAX" />
        </CardList>
      </section>
    </div>
  );
}

export default App;
