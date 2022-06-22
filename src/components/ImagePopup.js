function ImagePopup(props){
  //  console.log(props)
  //  console.log(Object.keys(props.dataCard).length)
    return (
    <div className={`popup popup_images popup_dark-theme ${Object.keys(props.dataCard).length!==0 ? 'popup_opened' : ''}`} name="imagePopup">
        <div className="popup__container popup__container_image">
          <img className="popup__image" src={props.dataCard.link} />
          <p className="popup__image-title">{props.dataCard.name}</p>
          <button className="popup__close-button" type="button" aria-label="Закрыть окно3" onClick={props.onClose}></button>
        </div>
    </div>
    );
}
export default ImagePopup;