import { useState } from 'react';
import ItemImageCarousel from './components/ItemImageCarousel/ItemImageCarousel';
import './style/app.css';
import ColorSelector from './components/ColorSelector/ColorSelector';
import ShoppingCartSheet from './components/Sheet/ShoppingCartSheet';

function OnlineStoreApp() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function openSheet() {
    setIsSheetOpen(true);
  }

  function closeSheet() {
    setIsSheetOpen(false);
  }

  return (
    <div className="app-online-store">
      <ShoppingCartSheet isPresented={isSheetOpen} onClose={closeSheet} />
      <ItemImageCarousel />

      <div className="item-heading">
        <span className="item-price">$ 3.349,99</span>
        <span className="item-category">Hollow Body</span>
        <h1 className="item-name">Falcon™ Hollow Body with String-Thru Bigsby®</h1>
      </div>

      {/* COLOR SELECTOR */}
      <ColorSelector />

      {/* Description */}
      <h2>Description</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quas corrupti suscipit
        eaque doloribus repellendus nostrum quisquam sequi exercitationem facilis, blanditiis
        natus est repellat debitis delectus rem corporis atque ipsum.
      </p>

      <div className="item-footer">
        <button type="button" className="button-cart" onClick={openSheet}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default OnlineStoreApp;
