import logo from '../logo.svg';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react'
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
  const handleCardClick = (dataCard) => {
    setSelectedCard(dataCard)
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };
  const handleEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({})
  };  
  return (
    <div className="page">
      <Header />  
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatar}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
        <input className="popup__input popup__input_name_username" id="username-input" name="username" type="text" required placeholder="имя" />
        <input className="popup__input popup__input_name_userjob" id="userjob-input" name="userjob" type="text" required placeholder="о себе" />
      </PopupWithForm>
      <PopupWithForm
        name="cards"
        title="Новое место"
        textButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >  
      <input className="popup__input popup__input_add popup__input_name_namecards" id="namecards-input" name="namecards" type="text" required placeholder="Название"/>
      <input className="popup__input popup__input_add popup__input_name_linkcards popup__input_placeholder" id="linkcards-input" name="linkcards" type="url" placeholder="Ссылка на картинку" required />
      </PopupWithForm>  
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        textButton="Да"
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
      <input className="popup__input popup__input_avatar popup__input_name_linkavatar" id="linkavatar-input" name="linkavatar" type="url" placeholder="https://somewebsite.com/someimage.jpg" required />
      </PopupWithForm>
      <ImagePopup
        onClose={closeAllPopups}
        dataCard={selectedCard}
      />  
      <Footer />
    </div>
  );
}

export default App;
