import logo from '../logo.svg';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import React, { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isTextButtonSave, setIsTextButtonSave] = useState('Сохранить');
  const [isTextButtonCreate, setIsTextButtonCreate] = useState('Создать');
  const [isTextButtonYes, setIsTextButtonYes] = useState('Да');
  React.useEffect(() => {
    api.getUserData()
    .then((res)=>{
      setCurrentUser(res);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
  React.useEffect(() => {
    api.getInitialCards()
    .then((res)=>{
      setCards(res);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    });
  } 
  function handleCardDelete(card) {
    setIsTextButtonYes('Удаление...')
    api.deleteCardElement(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id ));
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsTextButtonYes('Да')
    })
  }
  const handleCardClick = (dataCard) => {
    setSelectedCard(dataCard)
  };
  function handleButtonDelete(dataCard) {
    setIsDeletePopupOpen(true);
    setDeletedCard(dataCard)  
  }
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
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  };
  const handleUpdateUser = (formData) => {
    setIsTextButtonSave('Сохранение...')
    api.editUserData(formData)
    .then((res)=>{
      setCurrentUser(res);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsTextButtonSave('Сохранить')
    })
  }; 
  const handleUpdateAvatar = (formData) => {
    setIsTextButtonSave('Сохранение...')
    api.editUserAvatar(formData)
    .then((res)=>{
      setCurrentUser(res);
    })
    .then((res)=>{
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsTextButtonSave('Сохранить')
    })
  };
  const handleAddPlaceSubmit = (formData) => {
    setIsTextButtonCreate('Сохранение...')
    api.addCardElement(formData)
    .then((res)=>{
      setCards([res, ...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsTextButtonCreate('Создать')
    })
  };
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    handleCardDelete(deletedCard);
  } 
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header /> 
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleButtonDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatar}
          onCardClick={handleCardClick}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} textButton={isTextButtonSave} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} textButton={isTextButtonCreate}/>
        <PopupWithForm
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          dataCard={deletedCard}
          name="delete"
          title="Вы уверены?"
          textButton={isTextButtonYes}
          onSubmit={handleSubmitDelete}
        >
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} textButton={isTextButtonSave}/>
        <ImagePopup
          onClose={closeAllPopups}
          dataCard={selectedCard}
        />  
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
