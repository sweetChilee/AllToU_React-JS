// import styles from "./Investment.module.css";
import { useEffect, useState } from "react";
import styles from "./Investment.module.css";
import styled from "styled-components";
import axios from "axios";

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

export default function InvestMent(user) {
  //계좌
  const [userAccount, setUserAccount] = useState([]);
  //주식개요정보
  const [StockInfo, setStockInfo] = useState([]);
  //검색때 쓰는 상태관리
  const [liveData, setLiveData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  //검색해서 선택된주식정보
  const [selectStock, setSelectStock] = useState("");

  //<유저계좌생성or반환>투자 입장했을때 user의 계좌가 없으면 생성하고 이미있으면 계좌 반환
  useEffect(() => {
    if (user.length !== 0) {
      console.log("계좌생성");
      axios
        .post(
          `https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/user`,
          {
            id: user.id,
            name: user.name,
          }
        )
        .then((response) => {
          setUserAccount(response.data);
        });
    }
  }, [user]);
  //</유저계좌생성or반환>
  console.log(userAccount);
  //생데이터받아오기
  useEffect(() => {
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas`
    )
      .then((res) => res.json())
      .then((data) => {
        setLiveData(data);
        console.log("라이브데이터 받아오기 성공");
      });
  }, []);

  //이름으로 주식 객체 찾기
  const getStockObject = async (company) => {
    console.log("객체찾기", company);
    console.log("라이브 데이터", liveData);
    for (let i of liveData) {
      if (i.company === company) {
        setSelectStock(i);
        return i;
      }
    }
  };

  //단일주식정보가져오기
  const getStockInfo = (ticker) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //현재 가격정보가져오기

  //검색함수들
  //<검색>
  //돋보기눌렀을때
  const pushDot = () => {
    getStockObject(inputValue)
      .then((i) => {
        getStockInfo(i.ticker);
      })
      .then(() => {
        setInputValue("");
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
  //</검색>

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <div className={styles.search}>
          <h1>검색부분</h1>
          <WholeBox>
            <Input text="AutoComplete" />
            <InputBox isHaveInputValue={isHaveInputValue}>
              <Input
                type="text"
                value={inputValue}
                onChange={changeInputValue}
                onKeyUp={handleDropDownKey}
              />
              <button onClick={pushDot}>돋보기</button>
            </InputBox>
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
                      onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                      className={
                        dropDownItemIndex === dropDownIndex ? "selected" : ""
                      }
                    >
                      {dropDownItem}
                    </DropDownItem>
                  );
                })}
              </DropDownBox>
            )}
          </WholeBox>
        </div>
        <div className={styles.stockInfo}>
          <h1>주식정보부분</h1>
          {StockInfo === "" ? (
            <h5>null</h5>
          ) : (
            <>
              <h5>
                {StockInfo.company} : {StockInfo.ticker}
              </h5>
              <h5>개요 : {StockInfo.summaryInfo}</h5>
              <h5>업종 : {StockInfo.category}</h5>
              <h5>시총 : {StockInfo.marketSum}</h5>
            </>
          )}
        </div>
      </div>
      <div className={styles.invenArea}>
        <div className={styles.inven}>
          <div className={styles.inventory}>인벤토리</div>
          <div className={styles.invenlist}>인벤리스트</div>
        </div>
        <div className={styles.buySell}>바이셀</div>
      </div>
    </div>
  );
}

//검색부분 css

const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${(props) =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`;

//검색부분 css 종료
