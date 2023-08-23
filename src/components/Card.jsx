import Image from "next/image";

export default function Card({
  title,
  src,
  text,
  children,
  classes,
  titleClassName,
  subtitleClassName,
  subtitle,
}) {
  return (
    <div className={`card ${classes}`}>
      <div className="card__header">
        {src && <Image src={src} alt={title} width={"100%"} height={"100%"} />}
        <h1 className={`card__header__title ${titleClassName}`}>{title}</h1>
        {subtitle && (
          <h1 className={`card__header__subtitle ${subtitleClassName}`}>
            {subtitle}
          </h1>
        )}
      </div>
      <div className="card__body">
        {text && <p className="card__body__text">{text}</p>}
        {children}
      </div>
    </div>
  );
}
