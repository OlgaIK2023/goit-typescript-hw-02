import css from "./Loader.module.css"
import { MagnifyingGlass  } from 'react-loader-spinner'

const Loader = () => {
    return (
  <div className={css.loader}>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="blue"
        />
  </div>
    )
  }
  
  export default Loader