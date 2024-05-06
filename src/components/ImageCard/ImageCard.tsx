import css from "./ImageCard.module.css"

const ImageCard = ({ url, description, urlModal,openModal}) => {
   
  return (
      <div>
          <img className={css.gallery_image} src={url} alt={description} onClick={()=>openModal(urlModal,description)}/>
      </div>
  


  )
}

export default ImageCard