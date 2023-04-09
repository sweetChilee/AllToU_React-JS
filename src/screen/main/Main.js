import React, { useEffect, useState } from "react";
import styles from "../main/Main.module.css";
import TagCard from "../../component/maintag/TagCard";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import MainPage from "../../component/contents/mainpage/MainPage";

function Main() {
  const [firstTag, setFirstTag] = useState(false);

  useEffect(() => {
    setFirstTag(true);
  }, []);

  return (
    <div className={styles.container}>
      <MainPage />
      <CSSTransition
        in={firstTag}
        classNames="tag1"
        timeout={{ enter: 2000, exit: 2000 }}
        unmountOnExit
      >
        <TagCard title={"content"} tag={"/content"} />
      </CSSTransition>
      <CSSTransition in={firstTag} classNames="tag2" timeout={3000}>
        <TagCard title={"portfolio"} tag={"/portfolio"} />
      </CSSTransition>
      <CSSTransition in={firstTag} classNames="tag3" timeout={4000}>
        <TagCard title={"Investment"} tag={"/investment"} />
      </CSSTransition>
      <CSSTransition in={firstTag} classNames="tag4" timeout={5000}>
        <TagCard title={"contact us"} tag={"/contactus"} />
      </CSSTransition>
    </div>
  );
}

export default Main;
