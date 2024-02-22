import styles from "./Button.module.css";
function Button({ childern, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {childern}
    </button>
  );
}

export default Button;
