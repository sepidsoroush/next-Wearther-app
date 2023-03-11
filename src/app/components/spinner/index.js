import styles from '../../page.module.css';
const Spinner = ()=>{
return(
<div className={styles.skFadingCircle}>
    <div className={`${styles.skCircle} ${styles.skcircle1}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle2}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle3}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle4}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle5}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle6}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle7}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle8}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle9}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle10}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle11}`}></div>
    <div className={`${styles.skCircle} ${styles.skCircle12}`}></div>
</div>
);
}

export default Spinner;