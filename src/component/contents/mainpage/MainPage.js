import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./MainPage.module.css";
import "./styles.css";

export default function MainPage() {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <div className={styles.main}>
      <CSSTransition in={anim} classNames="mainImg" timeout={2000}>
        <div className={styles.mainImg}></div>
      </CSSTransition>
      <div className={styles.mainEx}>
        <CSSTransition in={anim} classNames="mainTitle" timeout={2500}>
          <h1>
            당신의 <br />
            올바른 투자 습관을 위해
          </h1>
        </CSSTransition>
        <CSSTransition in={anim} classNames="mainEx" timeout={3000}>
          <span>
            주식 투자는 단순히 돈을 투자하는 것이 아닌, 많은 지식과 경험이
            필요한 분야입니다.
            <br />
            <br /> AI를 통한 투자 조언을 받아 불확실한 주식시장에서 위험을 완화
            해보세요. 기업에 대한 정보 뿐만이 아니라 다양한 질문에 대한 답변을
            들을수 있습니다. <br />
            <br />
            자신만의 투자포트폴리오를 만들어 보세요. 장기투자를 도와주는
            자신만의 주식카드를 만들어 자신의 주식에게 애정을 가질수 있게
            도와드립니다. <br />
            <br />
            모의투자를 통해 투자를 진행하여 보세요. 실제 돈을 투자하기 전에 모의
            투자를 통해 투자 성과를 측정해 보세요. 많은 경험을 통해 자신만의
            무기를 만들어 보세요
          </span>
        </CSSTransition>
      </div>
    </div>
  );
}
