interface CartListItemProps {
  title: string;
  color: string;
  imagePath: string;
  price: string;
}
function CartListItem({ title, color, imagePath, price }: CartListItemProps) {
  return (
    <div className="cart-list-item">
      <div className="cart-list-item-top">
        <div className="cart-list-item-label">
          <h2>{title}</h2>
          <span>{color}</span>
        </div>
        <div className="cart-list-item-image">
          <img src={imagePath} alt={title} />
        </div>
      </div>
      <div className="cart-list-item-bottom">
        <span className="increase">-</span>
        <span className="amount">1</span>
        <span className="decrease">+</span>
        <span className="price">{`$ ${price}`}</span>
      </div>
    </div>
  );
}

export default CartListItem;
