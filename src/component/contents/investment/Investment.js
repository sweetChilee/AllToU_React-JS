// import styles from "./Investment.module.css";
import { useEffect, useState } from "react";
import styles from "./Investment.module.css";
import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StockWidget from "../../../widget/stockgraph/StockWidget2";

// prettier-ignore
const data = `{
  "symbols":[["삼성전자", "005930|1D"]
  ],
  "chartOnly": false,
  "width": "700",
  "height": "500",
  "locale": "en",
  "colorTheme": "dark",
  "autosize": false,
  "showVolume": false,
  "showMA": false,
  "hideDateRanges": false,
  "hideMarketStatus": false,
  "hideSymbolLogo": false,
  "scalePosition": "right",
  "scaleMode": "Normal",
  "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  "fontSize": "10",
  "noTimeScale": false,
  "valuesTracking": "1",
  "changeMode": "price-and-percent",
  "chartType": "line",
  "maLineColor": "#2962FF",
  "maLineWidth": 1,
  "maLength": 9
}`;

export default function InvestMent({ user }) {
  //차트데이터
  const [stockData, setStockData] = useState(data);
  //유저 계좌
  const [userAccount, setUserAccount] = useState([]);
  //유저주식리스트
  const [userStock, setUserStock] = useState([]);
  //주식개요정보
  const [StockInfo, setStockInfo] = useState([]);
  //검색때 쓰는 상태관리
  const [liveData, setLiveData] = useState([]);
  //검색해서 선택된주식정보
  const [selectStock, setSelectStock] = useState([]);
  //검색때 사용하는 온채인지
  const [inputValue, setInputValue] = useState("");
  //검색된 주식리스트
  const [stockList, setStockList] = useState([]);
  //실시간 가격리스트
  const [stockPriceList, setStockPriceList] = useState([]);
  //구매하거나 판매할 주식의 수량
  const [countStock, setCountStock] = useState(0);
  //유저의 총 매입가
  const [allbuy, setAllBuy] = useState([]);
  //주식 상세 정보
  const [jusikDetail, setJusikDetail] = useState([]);

  //차트 입력
  const PushData = (ticker, company) => {
    let JsonData = JSON.parse(stockData);
    JsonData.symbols.pop(0);
    JsonData.symbols.push([`${company}`, `${ticker}|1D`]);
    let LastData = JSON.stringify(JsonData);
    setStockData(LastData);
  };

  //유저의 총 매입가 가져오기
  const getUserAllBuy = () => {
    if (user.id) {
      axios
        .get(
          `https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/useraccount?id=${user.id}`
        )
        .then((res) => res.data)
        .then((data) => {
          setAllBuy(data);
          console.log(data);
        });
    }
  };
  //<유저계좌생성or반환>투자 입장했을때 user의 계좌가 없으면 생성하고 이미있으면 계좌 반환
  useEffect(() => {
    if (user.length !== 0) {
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
          setUserStock(response.data.stocks);
        });
    }
    getUserAllBuy();
  }, [user]);
  //주식디테일받기
  const getJusikDetail = (ticker, company) => {
    axios
      .get(
        `https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/stockinfo?id=${user.id}&ticker=${ticker}`
      )
      .then((res) => res.data)
      .then((data) => {
        setJusikDetail(data);
        console.log(data);
      });
  };
  useEffect(() => {
    //생데이터받아오기
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas`
    )
      .then((res) => res.json())
      .then((data) => {
        setLiveData(data);
      });
    //주식리스트받기
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas`
    )
      .then((res) => res.json())
      .then((data) => {
        setStockList(data);
      });
    //초기 가격정보 받기
    stockPrice();
    //다음 가격정보 받기
    setInterval(() => {
      stockPrice();
    }, 30000);
  }, []);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //현재 가격정보가져오기
  const stockPrice = () => {
    axios
      .get(
        "https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/stocklist"
      )
      .then((res) => res.data)
      .then((data) => {
        setStockPriceList(data);
        console.log("데이터받아옴");
      });
  };
  //가격 자동화

  //주식 클릭
  const clickJu = (ticker, company) => {
    setSelectStock({ ticker: ticker, company: company });
    setInputValue(`현재 종목 : ${company}`);
    getStockInfo(ticker);
    PushData(ticker, company);
  };
  //내 주식 클릭
  const clickMyjusik = (ticker, company) => {
    setSelectStock({ ticker: ticker, company: company });
    getStockInfo(ticker);
    getJusikDetail(ticker, company);
    PushData(ticker, company);
  };
  //검색함수
  const inputChange = (e) => {
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas?company=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStockList(data);
      });
    setInputValue(e.target.value);
  };
  //주식구매
  const buyjusik = (ticker, count, company) => {
    axios
      .post(
        `https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/buystock?id=${user.id}&ticker=${ticker}&count=${count}&company=${company}`
      )
      .then((res) => res.data)
      .then((data) => {
        alert(data);
        window.location.reload();
      });
    setCountStock(0);
  };
  //주식판매
  const selljusik = (ticker, count, company) => {
    axios
      .post(
        `https://port-0-alltu-toza-6g2llfxqu2r0.sel3.cloudtype.app/sellstock?id=${user.id}&ticker=${ticker}&count=${count}&company=${company}`
      )
      .then((res) => res.data)
      .then((data) => {
        alert(data);
        window.location.reload();
      });
    setCountStock(0);
  };

  return (
    <>
      <div className={styles.investmentTitle}>
        <h1>모의 투자를 해보세요</h1>
        <h3>
          : All T U 시뮬레이터로 실제 투자와 같이 모의투자를 해볼 수 있어요!!
        </h3>
      </div>
      <div className={styles.container}>
        <div className={styles.searchArea}>
          <div className={styles.searchHead}>
            <h1 style={{ color: "white", textAlign: "center" }}>종목 검색</h1>
            <div className={styles.inputArea}>
              <input
                value={inputValue}
                onChange={inputChange}
                className={styles.inputBox}
              />
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className={styles.serachDropDownBox}>
              {stockList.length == 0 ? (
                <p style={{ color: "white" }}>해당 검색어가 없습니다.</p>
              ) : (
                stockList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      clickJu(item.ticker, item.company);
                    }}
                    className={styles.dropdownItem}
                  >
                    <span style={{ color: "#F4E603" }}>종목명</span> :{" "}
                    {item.company}{" "}
                    <span style={{ color: "#F4E603" }}>종목 코드</span> :{" "}
                    {item.ticker}
                    <span style={{ color: "#F4E603" }}>가격</span> :{" "}
                    {stockPriceList[String(item.ticker)]}원
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.chart}>
            <StockWidget data={stockData} className={styles.stockgraph} />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <h1
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          {"<"} 종목 정보 {">"}
        </h1>
        <div className={styles.stockInfo}>
          {StockInfo.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>종목을 선택해주세요</h1>
          ) : (
            <>
              <h3>
                <span style={{ color: "#F4E603" }}>종목명</span> :{" "}
                {StockInfo.company}
                {"("}
                {StockInfo.ticker}
                {")"}
              </h3>
              <h3>
                <span style={{ color: "#F4E603" }}>개요</span> :{" "}
                <span
                  style={{
                    letterSpacing: 1,
                    lineHeight: 1.5,
                    fontSize: 15,
                    wordBreak: "break-all",
                  }}
                >
                  {StockInfo.summaryInfo}
                </span>
              </h3>
              <h3>
                <span style={{ color: "#F4E603" }}>업종</span> :{" "}
                {StockInfo.category}
              </h3>
              <h3>
                <span style={{ color: "#F4E603" }}>시총</span> :{" "}
                {StockInfo.marketSum}
              </h3>
            </>
          )}
        </div>
        <br />
        <hr />
        <br />
        <h1 style={{ textAlign: "center", color: "white", margin: 50 }}>
          {"<"}보유 주식 현황{">"}
        </h1>
        <div className={styles.invenOutline}>
          <div className={styles.invenArea}>
            {/* <div className={styles.inven}> */}
            <div className={styles.inventory}>
              <h1 style={{ textAlign: "center" }}>보유 주식 정보</h1>
              <div style={{ overflow: "auto" }}>
                {Object.keys(userStock).length == 0 ? (
                  <h1>아직 매입 전 입니다.</h1>
                ) : (
                  Object.keys(userStock).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        clickMyjusik(
                          userStock[item].ticker,
                          userStock[item].company
                        );
                      }}
                      style={{ overflow: "auto", wordBreak: "break-all" }}
                      className={styles.stockInfoText}
                    >
                      <h3>
                        <span style={{ color: "#f4e603" }}>종목</span> :{"  "}
                        <span style={{ fontSize: 20 }}>
                          {userStock[item].company}
                          {" ("}
                          {userStock[item].ticker}
                          {")"} - {userStock[item].buyprice} 원
                        </span>
                      </h3>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className={styles.invenlist}>
              <h1>{user.name} 님의 잔고</h1>
              {Object.keys(allbuy).length == 0 ? (
                <h1>리스트없음</h1>
              ) : (
                <>
                  <h3>
                    <span style={{ color: "#f4e603" }}>예수금</span> :{" "}
                    {userAccount.money} 원
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>주식 매입가</span> :{" "}
                    {allbuy.buyStockprice} 원
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>보유 평가액</span> :{" "}
                    {allbuy.nowStockprice} 원
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>평가 손익</span> :{" "}
                    {Number(allbuy.nowStockprice) -
                      Number(allbuy.buyStockprice)}{" "}
                    원
                  </h3>
                </>
              )}
              <br />
              <h1>
                {user.name} 님의 <br />
                보유 주식 상세 정보
              </h1>
              {Object.keys(jusikDetail).length == 0 ? (
                <h2 style={{ color: "red" }}>보유 주식 하나를 선택해주세요</h2>
              ) : (
                <>
                  <h3>
                    <span style={{ color: "#f4e603" }}>종목 명</span> :{" "}
                    {selectStock.company} {"("}
                    {jusikDetail.ticker}
                    {")"}
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>보유 수량</span> :{" "}
                    {jusikDetail.count} 주
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>매입가</span> :{" "}
                    {jusikDetail.buyMoney}원 /{" "}
                    <span style={{ color: "#f4e603" }}>현재가</span> :{" "}
                    {jusikDetail.nowMoney} 원
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>평가 손익</span> :{" "}
                    {jusikDetail.benefit} 원
                  </h3>
                  <h3>
                    <span style={{ color: "#f4e603" }}>수익률</span> :{" "}
                    {jusikDetail.stockReturn} %
                  </h3>
                </>
              )}
            </div>
            {/* </div> */}
            <div className={styles.buySell}>
              <h1>매수 / 매도</h1>
              <h3>
                <span style={{ color: "#f4e603" }}>종목명</span> :{" "}
                {selectStock.company} {"("}
                {selectStock.ticker}
                {")"}
              </h3>
              <div>
                <input
                  value={countStock}
                  onChange={(e) => {
                    setCountStock(e.target.value);
                  }}
                  className={styles.buysellInput}
                />
                <div className={styles.buysellBtnArea}>
                  <button
                    onClick={() => {
                      buyjusik(
                        selectStock.ticker,
                        countStock,
                        selectStock.company
                      );
                    }}
                  >
                    매수
                  </button>
                  <button
                    onClick={() => {
                      selljusik(
                        selectStock.ticker,
                        countStock,
                        selectStock.company
                      );
                    }}
                  >
                    매도
                  </button>
                </div>
              </div>
              <div className={styles.logoArea}>
                <div className={styles.logo}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
