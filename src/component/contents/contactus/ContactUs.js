import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./contactUs.module.css";
import PersonalCard from "./PersonalCard";
import "./styles.css";

export default function ContactUs() {
  const [fadeCard, setFadeCard] = useState(false);

  useEffect(() => {
    setFadeCard(true);
  }, []);

  console.log("로드 1");

  return (
    <div className={styles.main}>
      <CSSTransition in={fadeCard} classNames="card1" timeout={1000}>
        <div className={styles.card}>
          <div className={styles.profileImgArea}>
            <div className={styles.profileImg}></div>
            <div className={styles.profileText}>
              <h2>이우석</h2>
              <p>Developer</p>
              <p>Back End.</p>
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
      </CSSTransition>
      <CSSTransition in={fadeCard} classNames="card2" timeout={1500}>
        <div className={styles.card}>
          <div className={styles.profileImgArea}>
            <div className={styles.profileImg2}></div>
            <div className={styles.profileText}>
              <h2>민경서</h2>
              <p>Developer</p>
              <p>Back End.</p>
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
      </CSSTransition>
      <CSSTransition in={fadeCard} classNames="card3" timeout={2500}>
        <div className={styles.card}>
          <div className={styles.profileImgArea}>
            <div className={styles.profileImg3}></div>
            <div className={styles.profileText}>
              <h2>이광규</h2>
              <p>Developer</p>
              <p>Front End.</p>
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
      </CSSTransition>
    </div>
  );
}
