import Image from "next/image";

export default function Card({ title, src, text, children, classes }) {
  return (
    <div className={`card ${classes}`}>
      <div className="card__header">
        {src && <Image src={src} alt={title} width={"100%"} height={"100%"} />}
        <h2 className="card__header__title">{title}</h2>
      </div>
      <div className="card__body">
        {text && <p className="card__body__text">{text}</p>}
        {children}
      </div>
    </div>
  );
}
