import avatarLogo from '../images/jakivkysto.svg'
import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';
function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getUserData()
    .then((res)=>{
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
  React.useEffect(() => {
    api.getInitialCards()
    .then((res)=>{
      setCards([...res]);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
    return (
    <main className="content">
          <section className="profile">
              <div className="profile__container">
                  <button className="profile__avatar-button" name="edit-button" type="button" aria-label="Редактировать фото профиля" onClick={props.onEditAvatar}><img className="profile__avatar" src={userAvatar}/></button>
                  <div className="profile__info">
                      <div className="profile__title-container">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" name="edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                      </div>
                      <p className="profile__subtitle">{userDescription}</p>
                  </div>
              </div>
              <button className="profile__add-button" name="add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
          </section>
  
          <section className="cards">
            <ul className="cards__container">
              {cards.map((item, i) => (
              <Card card={item} onCardClick={props.onCardClick} key={item._id}/>
              ))
              }
            </ul>
          </section>
    </main>
    );
}
export default Main;