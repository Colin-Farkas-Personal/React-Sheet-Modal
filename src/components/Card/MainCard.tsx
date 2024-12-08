const getDateHoursAndMinutes = function (date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

interface MainCardProps {
  departure: Date;
  gate: string;
  origin: string;
  destination: string;
  onClick: () => void;
}
function MainCard({ departure, gate, origin, destination, onClick }: MainCardProps) {
  const departureTime = getDateHoursAndMinutes(departure);

  return (
    <div className="main-card" onClick={onClick}>
      <div className="main-card-heading">
        <div className="main-card-departure">
          <span>DEPARTURE</span>
          <span>{departureTime}</span>
        </div>

        <div className="main-card-gate">
          <span>GATE</span>
          <span>{gate}</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="main-card-locations">
        <span>{origin}</span>
        <span>{destination}</span>
      </div>
    </div>
  );
}

export default MainCard;
