import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch(console.error);
    api
      .getInitialCards()
      .then((res) => setCards(res))
      .catch(console.error);
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (evt) => {
    evt.preventDefault();
    api
      .deleteCard(activeCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== activeCard._id));
      })
      .catch(console.error)
      .finally(() => {
        handleCloseAllPopups();
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };

  const handleClickCardBin = (card) => {
    setActiveCard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    Array.from(document.forms).forEach((form) => form.reset());
    setSelectedCard({});
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .changeUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
      .finally(() => {
        handleCloseAllPopups();
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
      .finally(() => {
        handleCloseAllPopups();
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };

  const handleAddPlace = ({ title, link }) => {
    api
      .addNewCard(title, link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch(console.error)
      .finally(() => {
        handleCloseAllPopups();
        setIsSubmit(false);
      });
    setIsSubmit(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleClickCardBin}
      />
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isSubmit ? "Сохранение..." : "Сохранить"}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={isSubmit ? "Сохранение..." : "Сохранить"}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
        onAddPlace={handleAddPlace}
        buttonText={isSubmit ? "Создание..." : "Создать"}
      />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        isOpen={isConfirmDeletePopupOpen}
        onClose={handleCloseAllPopups}
        isValid={true}
        buttonText={isSubmit ? "Удаление..." : "Да"}
        onSubmit={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
