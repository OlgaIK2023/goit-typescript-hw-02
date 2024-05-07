import css from "./LoadMoreBtn.module.css"

export interface LoadMoreBtnProps {
   
    onClickButton: () => void;
    
  }

const LoadMoreBtn = ({ onClickButton}: LoadMoreBtnProps) => {
    return (
        <>
            <button type="button" id="load_btn"  className={css.load_more_btn} onClick={onClickButton}>Load more</button>
            
        </>
        
  )
}

export default LoadMoreBtn