import styles from "../header/Header.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export let onContactUsPage = false;

export default function Header({ user }) {
  const [scrollValue, setScrollValue] = useState(0);

  const [content, setContent] = useState(false);
  const [portfolio, setPortfolio] = useState(false);
  const [investment, setInvestment] = useState(false);
  const [contactUs, setContactUs] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const REST_API_KEY = "be53e2150bbff9d4927bbf17a7104d90";
  const REDIRECT_URI = "http://192.168.0.18:3000/kakaologin";
  const navi = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollValue(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  onContactUsPage = contactUs;

  const logout = () => {
    localStorage.removeItem("token");
    navi("/");
    window.location.reload();
  };

  const showModal = (e) => {
    document.body.style.overflow = "hidden";
  };

  const hideModal = (e) => {
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {scrollValue > 100 ? (
        <div className={styles.scrollNavContainer}>
          <Link exact to="/">
            <div className={styles.logoContainer}>
              <div className={styles.logo}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 className={styles.logoCircle}>All To U</h1>
              </div>
            </div>
          </Link>
          <ul className={styles.nav}>
            <Link to="/content">
              {content ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Content
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(true);
                    setPortfolio(false);
                    setInvestment(false);
                    setContactUs(false);
                  }}
                >
                  Content
                </li>
              )}
            </Link>
            <Link to="/portfolio">
              {portfolio ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Portfolio
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(true);
                    setInvestment(false);
                    setContactUs(false);
                  }}
                >
                  Portfolio
                </li>
              )}
            </Link>
            <Link to="/investment">
              {investment ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Investment
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(false);
                    setInvestment(true);
                    setContactUs(false);
                  }}
                >
                  Investment
                </li>
              )}
            </Link>
            <Link to="/contactus">
              {contactUs ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Contact Us
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(false);
                    setInvestment(false);
                    setContactUs(true);
                  }}
                >
                  Contact Us
                </li>
              )}
            </Link>
            {!user.name ? (
              <li
                className={styles.navlist}
                onClick={() => {
                  setLoginModal((prev) => !prev);
                  showModal();
                }}
              >
                Log In
              </li>
            ) : (
              <li
                className={styles.navlist}
                onClick={() => {
                  setLoginModal((prev) => !prev);
                  showModal();
                }}
              >
                {user.name} 님
              </li>
            )}
            {loginModal === true ? (
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
                    <div
                      className={styles.logOutContainer}
                      onClick={() => {
                        logout();
                        alert("로그아웃이 완료되었습니다.");
                      }}
                    >
                      <span>로그아웃</span>
                    </div>
                    <h2>Are you Sure??</h2>
                  </div>
                )}
              </div>
            ) : null}
          </ul>
        </div>
      ) : (
        <div className={styles.navContainer}>
          <Link exact to="/">
            <div
              className={styles.logoContainer}
              onClick={() => {
                setContent(false);
                setPortfolio(false);
                setInvestment(false);
                setContactUs(false);
              }}
            >
              <div className={styles.logo}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 className={styles.logoCircle}>All To U</h1>
              </div>
            </div>
          </Link>
          <ul className={styles.nav}>
            <Link to="/content">
              {content ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Content
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(true);
                    setPortfolio(false);
                    setInvestment(false);
                    setContactUs(false);
                  }}
                >
                  Content
                </li>
              )}
            </Link>
            <Link to="/portfolio">
              {portfolio ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Portfolio
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(true);
                    setInvestment(false);
                    setContactUs(false);
                  }}
                >
                  Portfolio
                </li>
              )}
            </Link>
            <Link to="/investment">
              {investment ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Investment
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(false);
                    setInvestment(true);
                    setContactUs(false);
                  }}
                >
                  Investment
                </li>
              )}
            </Link>
            <Link to="/contactus">
              {contactUs ? (
                <li className={styles.navlist} style={{ color: "yellow" }}>
                  Contact Us
                </li>
              ) : (
                <li
                  className={styles.navlist}
                  onClick={() => {
                    setContent(false);
                    setPortfolio(false);
                    setInvestment(false);
                    setContactUs(true);
                  }}
                >
                  Contact Us
                </li>
              )}
            </Link>
            {!user.name ? (
              <li
                className={styles.navlist}
                onClick={() => {
                  setLoginModal((prev) => !prev);
                  showModal();
                }}
              >
                Log In
              </li>
            ) : (
              <li
                className={styles.navlist}
                onClick={() => {
                  setLoginModal((prev) => !prev);
                  showModal();
                }}
              >
                {user.name} 님
              </li>
            )}
            {loginModal === true ? (
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
                    <div
                      className={styles.logOutContainer}
                      onClick={() => {
                        logout();
                        alert("로그아웃이 완료되었습니다.");
                      }}
                    >
                      <span>로그아웃</span>
                    </div>
                    <h2>Are you Sure??</h2>
                  </div>
                )}
              </div>
            ) : null}
          </ul>
        </div>
      )}
    </>
  );
}
