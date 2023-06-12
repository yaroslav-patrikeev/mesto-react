export default function PopupWithForm ({name, title, children, isOpen, onClose}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={evt => {
      if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close')) {
        return onClose();
      }
    }}>
    <div className="popup__container">
      <button type="button" aria-label="Закрыть" className="popup__close popup__close_place_forms button-hover"></button>
      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  </section>
  );
}