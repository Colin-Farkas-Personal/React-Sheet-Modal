import { ReactNode } from 'react';

interface CardListProps {
    children: ReactNode;
}
function CardList({ children }: CardListProps) {
  return (
    <ul className='card-list'>{children}</ul>
  )
}

export default CardList