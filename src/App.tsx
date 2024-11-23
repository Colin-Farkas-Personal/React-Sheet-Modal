import { useState } from 'react';
import Sheet from './components/Sheet/Sheet';
import { SnapPoint } from './scripts/sheet-snap-points';
import "./style/app.css";

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
        snapPoints={[250, SnapPoint.large]}
      >
        <div className="sheet-header">
          <h1>Sheet</h1>
          <button onClick={closeSheet}>&times;</button>
        </div>
        <div className="sheet-body">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ul>
        </div>
      </Sheet>
    </>
  );
}

export default App;
