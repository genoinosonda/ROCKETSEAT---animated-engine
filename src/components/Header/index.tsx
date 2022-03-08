import styles from './header.module.scss';

export default function Header() {
  return (
    <>
      <div className={styles.logo}>
        <img src="/logo.png" alt="logo" />
      </div>
    </>
  );
}
