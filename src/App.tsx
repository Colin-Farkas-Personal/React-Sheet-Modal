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
      <Sheet isPresented={isSheetOpen} onClose={closeSheet}>
        <div className="sheet-header">
          <h1>Maps</h1>
          <button onClick={closeSheet}>X</button>
        </div>
      </Sheet>
    </>
  );
}

export default App;
