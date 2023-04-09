import styles from "./contactUs.module.css";

export default function PersonalCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.profileImgArea}>
        <div className={styles.profileImg}></div>
        <div className={styles.profileText}>
          <h2>{props.name}</h2>
          <p>{props.infoText}</p>
          <p>{props.infoText2}</p>
        </div>
      </div>
      <div className={styles.profileArea}>
        <div className={styles.profileFirst}>
          <div className={styles.phone}></div>
          <div className={styles.github}></div>
          <div className={styles.email}></div>
        </div>
        <div className={styles.profileSecond}>
          <h4 style={{ color: "white" }}>Personal info.</h4>
        </div>
      </div>
    </div>
  );
}
