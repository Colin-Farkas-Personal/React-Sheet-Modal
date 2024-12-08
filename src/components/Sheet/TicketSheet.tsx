import { Sheet } from 'react-sheet-modal';
import InfoIcon from '../../assets/info-line.svg';

interface TicketSheetProps {
  isPresented: boolean;
  onClose: () => void;
}
function TicketSheet({ isPresented, onClose }: TicketSheetProps) {

  return (
    <Sheet
      className="ticket-sheet"
      isPresented={isPresented}
      onClose={onClose}
      snapPoints={['medium']}
    >
      <header className="ticket-sheet-header">
        <h2>Your ticket</h2>
        <InfoIcon />
      </header>
      <div className="ticket-sheet-body">
        <img
          src="/src/assets/qr-wikipedia.png"
          alt="A QR code for the URL of the English Wikipedia Mobile main page"
        />
        <span>A010304B010203</span>
      </div>
    </Sheet>
  );
}

export default TicketSheet;
