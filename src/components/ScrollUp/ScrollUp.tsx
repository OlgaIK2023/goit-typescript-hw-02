import { CiSaveUp2 } from "react-icons/ci";
import css from "./ScrollUp.module.css"


export interface ScrollUpBtnProps {
   
  onScrollBtn: () => void;
  
}

const ScrollUp = ({onScrollBtn}: ScrollUpBtnProps) => {
  return (
    <div className={css.scroll_up} onClick={onScrollBtn}><CiSaveUp2 size='50'/></div>
  )
}

export default ScrollUp