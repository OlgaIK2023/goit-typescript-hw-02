import ImageCard from "../ImageCard/ImageCard"
import css from "./ImageGallery.module.css"

import {Photo} from "../../App"
import { ImageCardProps } from "../ImageCard/ImageCard"

export interface ImageGalleryProps extends ImageCardProps {
  photos: Photo[],
  lastImageRef: React.RefObject<HTMLImageElement> | null
  id: number
}

const ImageGallery = ({ photos, openModal,lastImageRef }: ImageGalleryProps) => {
     
  return (
     <ul className={css.gallery_list} >
         {photos.map((photo, index) => {
             const isLastImage = index === photos.length - 1;
             return (
       <li className={css.gallery_item} key={photo.id} ref={isLastImage ? lastImageRef : null}>
         <ImageCard url={photo.urls.small} description={photo.alt_description} urlModal={photo.urls.regular} openModal={openModal} />
       </li>
     );
         })}

     </ul>

 )

}

export default ImageGallery