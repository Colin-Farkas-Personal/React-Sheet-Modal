import { useState } from 'react';

function useSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function openSheet() {
    setIsSheetOpen(true);
  }
  function closeSheet() {
    setIsSheetOpen(false);
  }

  return {
    isSheetOpen,
    openSheet,
    closeSheet,
  };
}
export default useSheet;
