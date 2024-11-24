import { useState } from 'react';
import './style/app.css';
import { Sheet } from 'react-sheet-modal';

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function openSheet() {
    setIsSheetOpen(true);
  }
  function closeSheet() {
    setIsSheetOpen(false);
  }

  return (
    <>
      <button onClick={openSheet}>Open sheet</button>
      <Sheet isPresented={isSheetOpen} onClose={closeSheet} />
    </>
  );
}

export default App;
