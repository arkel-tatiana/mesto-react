import React from 'react';
function Card({card, onCardClick}) {
    function handleClick(){
      onCardClick(card)
    } 
    return (
      <li className="cards__item" onClick={handleClick}>
        <div className="cards__images">
          <img className="cards__image" alt={`фото ${card.name}`} src={card.link}/>
          <button className="cards__delete" type="button" aria-label="Удалить фото"></button>
        </div>
        <p className="cards__title">{card.name}</p>
        <div className="cards__like">
          <button className="cards__likelogo" type="button" aria-label="Поставить Лайк"></button>
          <p className="cards__likecount">{card.likes.length}</p>
        </div>
      </li>  
    );
}
export default Card;