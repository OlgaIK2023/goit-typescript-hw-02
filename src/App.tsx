
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


export interface Photo {
  id: string
  url: string
  description: string
  urlModal: string
  // urls.small: string
  // urls.regular: string
  // openModal: string
}

interface FetchPhotosResponse {
  total_pages: number;
  results: Photo[];
}

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [scrollBtn, setScrollBtn] = useState<boolean>(false);
  const lastImageRef = useRef<HTMLImageElement>(null);

useEffect(() => {
    if (!inputSearch) return;
    async function fetchPhotos()  {
    try {
      setLoading(true);
      setError(false);
      const {total_pages,results}: FetchPhotosResponse =await fetchPhotosByInput(inputSearch, page);
      
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
  
const onSubmit = (inputSearch: string) => {
  setInputSearch(inputSearch);
  setPhotos([]);
  setPage(1);
  setShowBtn(false);
}

const scrollToLastImage = () => {
  if (lastImageRef.current) {
  lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
};
  const onClickButton = () => {
    setPage((prevPage) => prevPage + 1);
    setScrollBtn(true);
  };

  const openModal = (urlModal: string,description: string) => {
    setImageSrc(urlModal);
    setDescription(description);
  };

  const closeModal = () => {
    setImageSrc(null)
  };


  const onScrollBtn = () => {
    setScrollBtn(false)
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length !== 0 && <ImageGallery photos={photos} openModal={openModal} lastImageRef={lastImageRef}  onClickButton={onClickButton} />}
      {showBtn && <LoadMoreBtn onClickButton={onClickButton} />}
      <ImageModal isOpen={imageSrc !== null} onClose={closeModal} urlModal={imageSrc} description={description} />
      {scrollBtn && <ScrollIntoView selector="#header"><ScrollUp onScrollBtn={onScrollBtn} /></ScrollIntoView>}
    
    </>
  );
};

export default App
