import css from "./ImageCard.module.css"
import {Photo} from "../../App"

const ImageCard = ({ url, description, urlModal,openModal}: Photo) => {
   
  return (
      <div>
          <img className={css.gallery_image} src={url} alt={description} onClick={()=>openModal(urlModal,description)}/>
      </div>
  


  )
}

export default ImageCard