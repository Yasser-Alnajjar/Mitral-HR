export default function CardStatus({ name, length }) {
  return (
    <div className="card-container__cardstatus">
      <h2 className="cardstatus__title">{name}</h2>
      <p className="cardstatus__length">{length}</p>
    </div>
  );
}
