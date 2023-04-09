import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginModal.module.css";

export default function LoginModal({ user, visibleModal }) {
  const [loginModal, setLoginModal] = useState(true);

  // const REST_API_KEY = "be53e2150bbff9d4927bbf17a7104d90";
  // const REDIRECT_URI = "http://172.30.1.46:3000/kakaologin";

  const navi = useNavigate();

  const hideModal = (e) => {
    document.body.style.overflow = "unset";
  };

  const logout = () => {
    localStorage.removeItem("token");
    navi("/");
    window.location.reload();
  };

  return (
    <>
      {visibleModal === true || loginModal === true ? (
        <div className={styles.darkness}>
          {!user.name ? (
            <div className={styles.modalContainer}>
              <div
                className={styles.closeBtn}
                onClick={() => {
                  setLoginModal(false);
                  hideModal();
                }}
              ></div>
              <h2>올바른 투자 습관</h2>
              <div className={styles.logo}></div>
              <a
                href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
              >
                <div className={styles.kakaoContainer}>
                  <div className={styles.kakaoLogo}></div>
                  <span>카카오로 로그인</span>
                </div>
              </a>
              <h2>Please Login</h2>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
              }}
            >
              <div className={styles.kakao}>로그아웃</div>
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
