import ReactDOM  from 'react-dom'
import styles from "../loader/Loader.module.scss"
import imgLoader from "../../assets/loader.gif"


const Loader = () => {
    return ReactDOM.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={imgLoader} alt='Loading...' />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export default Loader
