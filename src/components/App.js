import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} />
        <Footer />
        <PopupWithForm title='Обновить аватар' name='change-avatar' children={
          <>
          <input type="url" id ="input-avatar-link" className="popup__input popup__input_field_change-avatar" placeholder="Ссылка на новый аватар"required/>
          <span id="input-avatar-link-error" className="popup__error"></span>
          <button type="submit" className="popup__button">Сохранить</button>
          </>
        } isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups} />
        <PopupWithForm title="Редактировать профиль" name="edit-profile" children={
            <form name="edit-profile" noValidate>
            <input type="text" id ="input-name" className="popup__input popup__input_field_first" placeholder="Имя" minLength="2" maxLength="40" required/>
            <span id="input-name-error" className="popup__error"></span>
            <input type="text" id ="input-about" className="popup__input popup__input_field_second" placeholder="О себе" minLength="2" maxLength="200" required/>
            <span id="input-about-error" className="popup__error"></span>
            <button type="submit" className="popup__button">Сохранить</button>
            </form>
        } isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups} />
        <PopupWithForm title="Новое место" name="add-place" children={
          <form name="add-place" noValidate>
            <input type="text" id ="input-title" className="popup__input popup__input_field_first" minLength="2" maxLength="30" placeholder="Название" required/>
            <span id="input-title-error" className="popup__error"></span>
            <input type="url" id ="input-link" className="popup__input popup__input_field_second" placeholder="Ссылка на картинку" required/>
            <span id="input-link-error" className="popup__error"></span>
            <button type="submit" className="popup__button">Создать</button>
          </form>
        } isOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopups} />
        <PopupWithForm title="Вы уверены?" name="confirm" children={
          <>
            <button type="submit" className="popup__button">Да</button>
          </>
        } />
        <ImagePopup card={selectedCard} onClose={handleCloseAllPopups}/>
    </ >
  );
}

export default App;