import ToastUi from "../components/toastUI/ToastUi";
import styles from "styles/toastUiTest.module.css";

const toastUiTest =()=>{
    return<>
    <div className={styles.wrapper}>toast ui 테스트 페이지
        <ToastUi/>
    </div>
    </>
}

export default toastUiTest;