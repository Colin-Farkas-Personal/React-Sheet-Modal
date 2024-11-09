import { useState } from 'react';
import Sheet from './components/Sheet/Sheet';
import { SnapPoint } from './scripts/sheet-snap-points';

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function openSheet() {
    setIsSheetOpen(true);
  }
  function closeSheet() {
    console.log('CLOSED!');
    setIsSheetOpen(false);
  }

  return (
    <>
      <button onClick={openSheet}>Open sheet</button>
      <Sheet
        isPresented={isSheetOpen}
        onClose={closeSheet}
        snapPoints={[SnapPoint.medium, SnapPoint.large]}
        scaleBackdrop="root"
      >
        <button type="button" className="dismiss-button" onClick={closeSheet}>
          Dismiss
        </button>
      </Sheet>
    </>
  );
}

export default App;
