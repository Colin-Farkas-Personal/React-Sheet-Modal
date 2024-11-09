import { useState } from 'react';
import Sheet from './components/Sheet/Sheet';
import { SnapPoint } from './scripts/sheet-snap-points';

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
      <Sheet isPresented={isSheetOpen} onClose={closeSheet} snapPoints={[SnapPoint.fitContent]}>
        <div className="sheet-body">
          <button type="button" className="dismiss-button" onClick={closeSheet}>
            Dismiss
          </button>
        </div>
      </Sheet>
    </>
  );
}

export default App;
