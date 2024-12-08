
interface ListCardProps {
    date: string;
    origin: string;
    destination: string;
}
function ListCardItem({ date, origin, destination }: ListCardProps) {
  return (
    <li className='card-list-item'>
        <span>{date}</span>
        <div className="card-list-item-locations">
            <span>{origin}</span>
            <span>{destination}</span>
        </div>
    </li>
  )
}

export default ListCardItem;