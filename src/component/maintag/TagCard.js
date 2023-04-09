import { useState } from "react";
import styles from "./TagCard.module.css";

export default function TagCard(props) {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setXY({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div style={{ width: "80%" }}></div>
        <a href={props.tag}>
          <div
            className={styles.triangle}
            onMouseMove={(e) => {
              handleMouseMove(e);
              console.log(xy);
            }}
          >
            <div
              className={styles.arrow}
              style={{
                position: "absolute",
                left: xy.x - 40,
                top: xy.y - 20,
              }}
            >
              Get Start
            </div>
          </div>
        </a>
        <div className={styles.titleName}>
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
}
