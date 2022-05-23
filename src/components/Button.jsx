import styles from "./Button.module.css";

function Button({ title, onClick, disabled, id }) {
  return (
    <button disabled={disabled}  onClick={() => onClick()} id={id} data-testid="button-component" className={styles.button}>
      {title}
    </button>
  );
}

export default Button;
