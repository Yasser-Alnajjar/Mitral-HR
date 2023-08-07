import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ children, title, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={`modal ${open ? "show" : ""}`}>
      <div className={`modal__container ${open ? "show" : ""}`}>
        <button
          className="btn btn-danger modal__container__close"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
        <h3 className="modal__container__title">{title}</h3>
        <div className="modal__container__content">{children}</div>
      </div>
    </div>
  );
}
