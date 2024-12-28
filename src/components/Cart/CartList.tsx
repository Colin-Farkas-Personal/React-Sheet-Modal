import { ReactNode } from 'react';

interface CartListProps {
  children: ReactNode;
}
function CartList({ children }: CartListProps) {
  return <ul className="cart-list">{children}</ul>;
}

export default CartList;
