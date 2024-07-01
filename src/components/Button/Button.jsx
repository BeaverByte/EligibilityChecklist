import styles from "./Button.module.css";

function Button({ children, onClick, type, name }) {
  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
