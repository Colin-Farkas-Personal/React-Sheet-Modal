import { useState } from 'react';
import { Sheet, SnapPoint } from '../';
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
    <>
      <button onClick={openSheet}>Open sheet</button>
      <Sheet
        isPresented={isSheetOpen}
        onClose={closeSheet}
        snapPoints={[SnapPoint.large]}
        scaleBackdrop
      >
        <h1>Sheet</h1>
      </Sheet>
    </>
  );
}

export default App;
