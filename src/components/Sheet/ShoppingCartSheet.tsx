import { Sheet } from 'react-sheet-modal';
import CloseIcon from '../../assets/close-line.svg';
import CartList from '../Cart/CartList';
import CartListItem from '../Cart/CartListItem';

interface TicketSheetProps {
  isPresented: boolean;
  onClose: () => void;
}
function ShoppingCartSheet({ isPresented, onClose }: TicketSheetProps) {
  return (
    <Sheet
      className="cart-sheet"
      isPresented={isPresented}
      onClose={onClose}
      snapPoints={['medium', 'large']}
      scaleBackdrop
      showGrabber
    >
      {/* SHEET HEADER */}
      <header className="cart-sheet-header">
        <div className="cart-sheet-header-label">
          <span>$ 14.879.20</span>
          <span>5 items</span>
        </div>
        <span className="cart-sheet-header-close" onClick={onClose}>
          <CloseIcon />
        </span>
      </header>
      {/* SHEET BODY */}
      <div className="cart-sheet-body">
        <CartList>
          <CartListItem
            title="Falcon™ Hollow Body with String-Through Bigsby®"
            color="Gold-White"
            imagePath="/src/assets/gretsch-gold-white.png"
            price="3,349.99"
          />
          <CartListItem
            title="G8424T Billy Duffy Signature Falcon™ LTD H..."
            color="Vintage White"
            imagePath="/src/assets/gretsch-gold-white.png"
            price="4,499.99"
          />
          <CartListItem
            title="G2420 Streamliner™ Hollow Body with Chromatic..."
            color="Village Amber"
            imagePath="/src/assets/gretsch-gold-white.png"
            price="499.99"
          />
          <CartListItem
            title="G6120TGQM-56 Limited Edition Quilt Classic..."
            color="Roundup Orange Stain"
            imagePath="/src/assets/gretsch-gold-white.png"
            price="3,699.99"
          />
          <CartListItem
            title="G5420T Electromatic® Classic Hollow Body S..."
            color="Airline Silver"
            imagePath="/src/assets/gretsch-gold-white.png"
            price="799.99"
          />
        </CartList>
      </div>

      {/* SHEET FOOTER */}
      <div className="cart-sheet-footer">
        <button type="button">Continue to checkout</button>
      </div>
    </Sheet>
  );
}

export default ShoppingCartSheet;
