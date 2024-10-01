import ToastUi from "../components/toastUI/ToastUi";
import styles from "styles/toastUiTest.module.css";

const toastUiTest =()=>{
    return(
        <div className={styles.wrapper}>
            <ToastUi/>
        </div>
    );
};

export default toastUiTest;
