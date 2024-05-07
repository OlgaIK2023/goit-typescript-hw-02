
import { useEffect, useState, useRef } from 'react'

import SearchBar from './components/SearchBar/SearchBar'
import { fetchPhotosByInput } from './photos-api'
import ImageGallery from './components/ImageGallery/ImageGallery'
import Loader from './components/Loader/Loader'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'
import ScrollIntoView from 'react-scroll-into-view'
import ScrollUp from "./components/ScrollUp/ScrollUp";


// import { ImageGalleryProps } from './components/ImageGallery/ImageGallery'
export interface Photo {
  
  url: string
  urls:
  { small: string; regular: string }
  description: string
  id: number
  alt_description: string
  urlModal: string 
  
}

interface FetchPhotosResponse {
  total_pages: number;
  results: Photo[];
}


const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<HTMLInputElement>();
  const [page, setPage] = useState<number>(1);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scrollBtn, setScrollBtn] = useState<boolean>(false);
  // const lastImageRef = useRef<HTMLImageElement>(null);
  const lastImageRef = useRef<HTMLLIElement> (null)

  const scrollToLastImage = () => {
    if (lastImageRef.current) {
    lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  };

useEffect(() => {
    if (!inputSearch) return;
    async function fetchPhotos()  {
    try {
      setLoading(true);
      setError(false);
      const {total_pages,results}: FetchPhotosResponse =await fetchPhotosByInput(inputSearch!, page);
      
      setPhotos((prevPhotos) => [...prevPhotos, ...results]);
      
      setShowBtn(total_pages > page);
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false);
      }
    }
  fetchPhotos();
  scrollToLastImage();
    
}, [inputSearch, page])
  
const onSubmit = (inputSearch: HTMLInputElement): void => {
  setInputSearch(inputSearch);
  setPhotos([]);
  setPage(1);
  setShowBtn(false);
}


  const onClickButton = () => {
    setPage((prevPage) => prevPage + 1);
    setScrollBtn(true);
  };

  const openModal = (urlModal: string,description: string) => {
    setImageSrc(urlModal);
    setDescription(description);
  };

  const closeModal = () => {
    setImageSrc('')
  };


  const onScrollBtn = () => {
    setScrollBtn(false)
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length !== 0 && <ImageGallery photos={photos} openModal={openModal} lastImageRef={lastImageRef} onClickButton={onClickButton} isLastImage={false}  />}
      {showBtn && <LoadMoreBtn onClickButton={onClickButton} />}
      <ImageModal isOpen={imageSrc !== null} onClose={closeModal} urlModal={imageSrc} description={description} />
      {/* <ImageModal isOpen={imageSrc !== null} onClose={closeModal} urlModal={imageSrc} description={description} /> */}
      {scrollBtn && <ScrollIntoView selector="#header"><ScrollUp onScrollBtn={onScrollBtn} /></ScrollIntoView>}
    
    </>
  );
};

export default App
