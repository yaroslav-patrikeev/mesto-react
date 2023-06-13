import React from 'react';
import api from '../utils/api';
import defaultAvatar from '../images/profile-photo.jpg';
import Card from './Card';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatar);
  const [cards, setCards] = React.useState([]);

  let myId;

  React.useEffect(() => {
    api.getUserInfo()
    .then(info => {
      setUserName(info.name);
      setUserDescription(info.about);
      setUserAvatar(info.avatar);
      myId = info._id;
     })
    .catch(err => console.log(err));

    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => console.log(err));
  }, []);

  return (
  <main className="main">
    <section className="profile">
      <div className="profile__change-avatar-button" onClick={onEditAvatar}><img src={userAvatar} alt="Фотография" className="profile__photo"/></div>
        <div className="profile__container">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" aria-label="Редактировать" onClick={onEditProfile} className="profile__edit-button button-hover"></button>
        </div>
        <p className="profile__status">{userDescription}</p>
      <button type="button" aria-label="Добавить" onClick={onAddPlace} className="profile__add-button button-hover"></button>
    </section>
    <ul className="elements elements_position" aria-label="Фотокарточки">
      {cards.map(item => <Card key={item._id} card={item} userId={myId} onCardClick={onCardClick} />)}
    </ul>
  </main>
  );
}