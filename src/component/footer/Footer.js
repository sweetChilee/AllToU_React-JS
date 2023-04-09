import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerArea}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.logo}></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h2>NAVIGATION</h2>
        <p>Pricing</p>
        <p>Features</p>
        <p>Services</p>
        <p>F.A.Q</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h2>ABOUT US</h2>
        <p>What is ATU</p>
        <p>Check security</p>
        <p>Check Connection</p>
        <p>Privacy policy</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>FOLLOW US</h2>
        <p>Instagram</p>
        <p>Twitter</p>
        <p>Git Hub</p>
        <p>Naver</p>
      </div>
      <div></div>
    </footer>
  );
}
