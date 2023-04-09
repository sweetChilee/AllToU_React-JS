import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Portfolio.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPanorama,
  faHeading,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faCuttlefish } from "@fortawesome/free-brands-svg-icons";

const wholeTextArray = [
  "BGF리테일",
  "BNK금융지주",
  "CJ",
  "CJ대한통운",
  "CJ제일제당",
  "DB손해보험",
  "DB하이텍",
  "DGB금융지주",
  "DL",
  "DL이앤씨",
  "F&F",
  "GKL",
  "GS",
  "GS건설",
  "GS리테일",
  "HD현대",
  "HL만도",
  "HMM",
  "JB금융지주",
  "KB금융",
  "KCC",
  "KT",
  "KT&G",
  "LG",
  "LG디스플레이",
  "LG생활건강",
  "LG에너지솔루션",
  "LG유플러스",
  "LG이노텍",
  "LG전자",
  "LG화학",
  "LG화학우",
  "LIG넥스원",
  "LS",
  "LS ELECTRIC",
  "LX세미콘",
  "LX인터내셔널",
  "NAVER",
  "NH투자증권",
  "OCI",
  "PI첨단소재",
  "POSCO홀딩스",
  "S-Oil",
  "SK",
  "SKC",
  "SK가스",
  "SK네트웍스",
  "SK바이오사이언스",
  "SK바이오팜",
  "SK스퀘어",
  "SK아이이테크놀로지",
  "SK이노베이션",
  "SK케미칼",
  "SK텔레콤",
  "SK하이닉스",
  "강원랜드",
  "고려아연",
  "금양",
  "금호석유",
  "금호타이어",
  "기아",
  "기업은행",
  "넷마블",
  "녹십자",
  "농심",
  "대덕전자",
  "대성홀딩스",
  "대우건설",
  "대우조선해양",
  "대웅제약",
  "대한유화",
  "대한전선",
  "대한항공",
  "더존비즈온",
  "덴티움",
  "동국제강",
  "동서",
  "동원산업",
  "동원시스템즈",
  "두산",
  "두산밥캣",
  "두산에너빌리티",
  "두산퓨얼셀",
  "롯데쇼핑",
  "롯데에너지머티리얼즈",
  "롯데정밀화학",
  "롯데제과",
  "롯데지주",
  "롯데칠성",
  "롯데케미칼",
  "맥쿼리인프라",
  "메리츠금융지주",
  "메리츠증권",
  "명신산업",
  "미래에셋증권",
  "삼성SDI",
  "삼성물산",
  "삼성바이오로직스",
  "삼성생명",
  "삼성에스디에스",
  "삼성엔지니어링",
  "삼성전기",
  "삼성전자",
  "삼성전자우",
  "삼성중공업",
  "삼성증권",
  "삼성카드",
  "삼성화재",
  "삼아알미늄",
  "삼천리",
  "서울가스",
  "셀트리온",
  "솔루스첨단소재",
  "솔루엠",
  "신세계",
  "신한지주",
  "쌍용C&E",
  "쌍용차",
  "씨에스윈드",
  "아모레G",
  "아모레퍼시픽",
  "아시아나항공",
  "아이에스동서",
  "에스디바이오센서",
  "에스엘",
  "에스원",
  "엔씨소프트",
  "영원무역",
  "영풍",
  "오뚜기",
  "오리온",
  "오리온홀딩스",
  "우리금융지주",
  "유한양행",
  "이마트",
  "이수화학",
  "일진하이솔루스",
  "제일기획",
  "제주항공",
  "카카오",
  "카카오뱅크",
  "카카오페이",
  "코스모신소재",
  "코스모화학",
  "코오롱인더",
  "코웨이",
  "크래프톤",
  "키움증권",
  "팬오션",
  "포스코인터내셔널",
  "포스코케미칼",
  "풍산",
  "하나금융지주",
  "하이브",
  "하이트진로",
  "한국가스공사",
  "한국금융지주",
  "한국앤컴퍼니",
  "한국전력",
  "한국조선해양",
  "한국타이어앤테크놀로지",
  "한국항공우주",
  "한미반도체",
  "한미사이언스",
  "한미약품",
  "한샘",
  "한솔케미칼",
  "한온시스템",
  "한전KPS",
  "한전기술",
  "한진칼",
  "한화",
  "한화생명",
  "한화솔루션",
  "한화시스템",
  "한화에어로스페이스",
  "현대건설",
  "현대건설기계",
  "현대글로비스",
  "현대두산인프라코어",
  "현대로템",
  "현대모비스",
  "현대미포조선",
  "현대백화점",
  "현대엘리베이",
  "현대오토에버",
  "현대위아",
  "현대일렉트릭",
  "현대제철",
  "현대중공업",
  "현대차",
  "현대차2우B",
  "현대차우",
  "현대해상",
  "호텔신라",
  "효성",
  "효성첨단소재",
  "효성티앤씨",
  "후성",
  "휠라홀딩스",
];

let info = [
  "동사는 국내 1위 포털 서비스를 기반으로 광고, 쇼핑, 디지털 간편결제 사업을 영위하고 있으며, 공공/금융 분야를 중심으로 클라우드를 비롯한 다양한 IT 인프라 및 기업향 솔루션 제공을 확대해가고 있음.네이버파이낸셜, 네이버웹툰, 스노우, 네이버제트 등을 연결대상 종속회사로 보유했음.2022년 3분기 기준 매출은 서치플랫폼 44.6%, 커머스 22.1%, 핀테크 14.6%, 콘텐츠 13.9%, 클라우드 4.9%로 구성됐음",
  "국내 시장 점유율 1위 메신저 카카오톡을 중심으로 커머스, 모빌리티, 페이, 게임, 뮤직, 콘텐츠 등 다양한 영역에서 수익을 창출하고 있음. 매출은 플랫폼 부문 52.6%, 콘텐츠 부문 47.4%로 구성됐음. 신규 사업에 지속 투자하고 있음. 카카오엔터프라이즈를 통해 B2B 행보를 본격화할 계획이며 카카오브레인은 기술 트렌드 센서 역할을 하고 있음. 2022년 4월에는 디지털헬스케어 사업 본격화를 위해 카카오헬스케어를 출범함.",
];

export default function Portfolio({ user }) {
  const [userPort, setUserPort] = useState([]);
  const [liveData, setLiveData] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  //
  const [selectValue, setSelectValue] = useState("");
  const [selectTicker, setSelectTicker] = useState("");
  const [dalliValue, setDalliValue] = useState("");
  const [dalliImg, setDalliImg] = useState("");
  const [stockInfoDic, setStockInfoDic] = useState({});
  const [stockInfo, setStockInfo] = useState([]);

  const [loadingImg, setLoadingImg] = useState(true);

  //단일주식정보가져오기
  const getStockInfo = async (ticker) => {
    console.log("스탁인포시작");
    axios
      .post(
        "https://vzjj45kvapsj55iz7apot27wiq0ddvnm.lambda-url.ap-northeast-2.on.aws/",
        {
          ticker: ticker,
        }
      )
      .then((response) => {
        setStockInfo(response.data.body);
        return response.data.body;
      })
      .then((res) => {
        let res2 = res.ticker;
        stockInfoDic[res2] = res;
        setStockInfoDic(stockInfoDic);
      });
  };

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  //
  useEffect(() => {
    console.log("포토폴리오 유저", typeof user);
    if (user.length !== 0) {
      axios
        .post(
          `https://port-0-alltu-portpoilo-6g2llfxqu2r0.sel3.cloudtype.app/portpoilo?id=${user.id}`
        )
        .then((response) => {
          setUserPort(response.data);
          for (let i of response.data.portpoiloList) {
            getStockInfo(i.ticker);
          }
        });
    }
  }, [user]);

  // 검색데이터 받아오기
  useEffect(() => {
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas`
    )
      .then((res) => res.json())
      .then((data) => {
        setLiveData(data);
      });
    setLoadingImg(true);
  }, []);

  const sendInputValue = (e) => {
    let ticker = "";
    for (let i of liveData) {
      if (i.company === inputValue) {
        setSelectValue(i.company);
        setSelectTicker(i.ticker);
      }
    }
    console.log("함수진입", inputValue);
    setInputValue("");
  };

  const getPortFolioList = (portpoiloList) => {
    if (Array.isArray(portpoiloList)) {
      return portpoiloList.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imgBx}>
            <img src={item.img} alt="asdf"></img>
          </div>
          <div className={styles.content}>
            <h2>{item.company}</h2>
            <p>
              {item.company} : {item.ticker}
            </p>
            <span>{info[index]}</span>
            <br />
            <br />
            <br />
            <button
              onClick={() => {
                axios
                  .delete(
                    `https://port-0-alltu-portpoilo-6g2llfxqu2r0.sel3.cloudtype.app/deleteportcard?id=${user.id}&ticker=${item.ticker}`
                  )
                  .then(() => window.location.reload());
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      ));
    } else {
      <h1>로그인 하세요</h1>;
    }
  };

  const getDalliImg = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://4bqpiasedtrge4p5vrcr5kbkgq0dhtsn.lambda-url.ap-northeast-2.on.aws",
        {
          picture: `${dalliValue}`,
        }
      )
      .then((response) => {
        axios
          .post(
            "https://wztsxvynfak4swpbp3jqronl5y0typhp.lambda-url.ap-northeast-2.on.aws",
            {
              img: response.data,
              filename: dalliValue + String(new Date().getMilliseconds()),
            }
          )
          .then((response) => setDalliImg(response.data));
      });
    setDalliValue("");
  };

  const sendAllPortfolio = () => {
    axios
      .put(
        `https://port-0-alltu-portpoilo-6g2llfxqu2r0.sel3.cloudtype.app/updateportcard?id=${user.id}`,
        {
          ticker: selectTicker,
          company: selectValue,
          img: dalliImg,
        }
      )
      .then(() => {
        window.location.reload();
        console.log("then까지 됐어요");
      });
  };
  return (
    <>
      {visibleModal ? (
        <div className={styles.darkness}>
          <div className={styles.portfolioModal}>
            <div className={styles.closeBtnArea}>
              <button
                onClick={() => {
                  setVisibleModal(false);
                }}
                className={styles.closeBtn}
              >
                X
              </button>
            </div>
            <div className={styles.mainContainer}>
              <div className={styles.companyArea}>
                <div className={styles.companySearch}>
                  <div
                    className={styles.companyInputBox}
                    isHaveInputValue={isHaveInputValue}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={changeInputValue}
                      onKeyUp={handleDropDownKey}
                      placeholder="회사명을 입력해주세요"
                      className={styles.companyInput}
                    />
                    <button
                      className={styles.companyBtn}
                      onClick={sendInputValue}
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ color: "#5333cd" }}
                      />
                    </button>
                  </div>
                  {isHaveInputValue && (
                    <DropDownBox>
                      {dropDownList.length === 0 && (
                        <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
                      )}
                      {dropDownList.map((dropDownItem, dropDownIndex) => {
                        return (
                          <DropDownItem
                            key={dropDownIndex}
                            onClick={() => clickDropDownItem(dropDownItem)}
                            onMouseOver={() =>
                              setDropDownItemIndex(dropDownIndex)
                            }
                            className={
                              dropDownItemIndex === dropDownIndex
                                ? "selected"
                                : ""
                            }
                          >
                            {dropDownItem}
                          </DropDownItem>
                        );
                      })}
                    </DropDownBox>
                  )}
                </div>
                <div className={styles.companyEx}>
                  <h3 className={styles.ex1}>
                    Company <br />
                    <br />
                    <h2>{selectValue}</h2>
                  </h3>
                  <h3>
                    CompanyCode <br />
                    <br />
                    <h2>{selectTicker}</h2>
                  </h3>
                </div>
              </div>
              <div className={styles.imgSearchContainer}>
                <div className={styles.imgSearch}>
                  <form onSubmit={getDalliImg} className={styles.imgInputBox}>
                    <input
                      className={styles.imgInput}
                      value={dalliValue}
                      placeholder="그림 컨셉을 입력해주세요"
                      onChange={(e) => {
                        setDalliValue(e.target.value);
                      }}
                    />
                    <button className={styles.imgBtn}>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={{ color: "#F4E603" }}
                      />
                    </button>
                  </form>
                </div>
                <div className={styles.imgArea}>
                  <div className={styles.images}>
                    {dalliImg === "" ? (
                      <div className={styles.isLoadingImg}>
                        <FontAwesomeIcon
                          icon={faPanorama}
                          style={{ color: "white" }}
                        />
                      </div>
                    ) : (
                      <img
                        src={dalliImg}
                        alt={"이미지 로드에 실패하였습니다."}
                        onLoad={() => {
                          setLoadingImg(false);
                          console.log("이미지 로드되었음");
                        }}
                      ></img>
                    )}
                  </div>
                  <div className={styles.addImgBtnArea}>
                    <div
                      className={styles.addImgBtn}
                      onClick={sendAllPortfolio}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.portfolioTitle}>
        <h1>AI가 그려주는 나만의 포토카드를 만들어보세요!!</h1>
        <h3>Dall-E라는 AI 프로그램이 이미지를 반환해줄거에요</h3>
      </div>
      <div className={styles.container}>
        {userPort !== "" ? (
          getPortFolioList(userPort.portpoiloList)
        ) : (
          // <h1>리스트 있음</h1>
          <h1>리스트 없음</h1>
        )}
        <div className={styles.addPortBtnOutLine}>
          <div
            className={styles.addPortBtn}
            onClick={() => {
              setVisibleModal(true);
            }}
          >
            +
          </div>
        </div>
      </div>
    </>
  );
}

const DropDownBox = styled.ul`
  position: absolute;
  display: block;
  width: 20%;
  margin: 0 auto;
  padding: 8px 0;
  background-color: #5333cd;
  border: 7px solid rgba(0, 0, 0, 1);
  /* border-top: none; */
  border-radius: 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: black;
    color: white;
  }
`;
