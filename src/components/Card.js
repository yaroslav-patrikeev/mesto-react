export default function Card({ card, userId, onCardClick }) {

    const handleCardClick = () => {
        onCardClick(card);
      }

    return (
        <li className="element">
            <img className="element__image" alt={card.name} onClick={handleCardClick} src={card.link}/>
            <button type="button" aria-label="Удалить"
            className={`element__bin button-hover ${userId !== card._id && 'element__bin_unvisible'}`}></button>
            <div className="element__box-like-title">
            <h2 className="element__title">{card.name}</h2>
            <button type="button" aria-label="Нравится" className="element__like"></button>
            <span className="element__like-counter">{card.likes.length}</span>
            </div>
        </li>
    )
}