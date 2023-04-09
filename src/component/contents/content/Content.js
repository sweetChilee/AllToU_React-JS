import { useEffect, useState } from "react";
import StockWidget from "../../../widget/stockgraph/StockWidget";
// import AutoComplete from "../../test/test";
import styles from "./Content.module.css";
import styled from "styled-components";
import axios from "axios";

const wholeTextArray = [];

// prettier-ignore
const data = `{
  "symbols":[["삼성전자", "005930|1D"]
  ],
  "chartOnly": false,
  "width": "700",
  "height": "450",
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

export default function Area() {
  const [stockData, setStockData] = useState(data);

  const [gptValue, setGptValue] = useState("");
  const [gptRes, setGptRes] = useState("");

  // input에 입력한 값 includes를 사용
  const [inputValue, setInputValue] = useState("");

  // input값이 있으면 true 없으면 false
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);

  // dropdwonlist를 DB와 연동해 set을 하면 됨.
  const [dropDownList, setDropDownList] = useState([]);
  const [secondDropDownList, setSecondDropDownList] = useState([]);

  // dropDownList에 있는 요소를 선택하기 위해 마우스를 올렸을 때 효과를 주기 위한 인덱스 번호 설정
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  // 주식 설명 받아오기
  const [stockInfo, setStockInfo] = useState([]);

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

  useEffect(() => {
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search/nas`
    )
      .then((res) => res.json())
      .then((data) => {
        setSecondDropDownList(data);
      });
  }, []);

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
    setIsHaveInputValue(true);
    fetch(
      `https://port-0-alltu-search-6g2llfxqu2r0.sel3.cloudtype.app/search?company=${event.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setSecondDropDownList(data);
        setDropDownList(data);
      });
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

  const PushData = (ticker) => {
    let JsonData = JSON.parse(stockData);
    JsonData.symbols.pop(0);
    JsonData.symbols.push([`${inputValue}`, `${ticker}|1D`]);
    let LastData = JSON.stringify(JsonData);
    setStockData(LastData);
  };

  const sendInputValueBtn = () => {
    let ticker = "";
    for (let i of secondDropDownList) {
      if (i.company === inputValue) {
        console.log("티커", i.ticker);
        PushData(i.ticker);
        ticker = i.ticker;
      }
    }
    getStockInfo(ticker);
    setInputValue("");
  };

  const getGPT = async () => {
    axios
      .post(
        "https://wdcnuqnh7l3aono7mdgjpdbw3i0jmxss.lambda-url.ap-northeast-2.on.aws/",
        {
          question: gptValue,
        }
      )
      .then((response) => {
        setGptRes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendChatGPT = (e) => {
    e.preventDefault();
    getGPT();
    setGptValue("");
  };
  const sendChatGPTBtn = (e) => {
    getGPT();
    setGptValue("");
  };

  // 주식 정보 받아오기 영역
  const getStockInfo = (ticker) => {
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

  return (
    <div className={styles.main}>
      <div className={styles.stockArea}>
        <StockWidget data={stockData} className={styles.stockgraph} />
        <div className={styles.outLineStockEx}>
          <div className={styles.stockExArea}>
            {stockInfo === "" ? (
              <h5 style={{ color: "white" }}>null</h5>
            ) : (
              <>
                <div className={styles.speaker}></div>
                <div className={styles.stockEx}>
                  <h3 style={{ color: "white" }}>종목명</h3>
                  <span>
                    ☞ {stockInfo.company} : {stockInfo.ticker}
                  </span>
                </div>
                {/* <div className={styles.stockEx}>
                  <h3 style={{ color: "white" }}>개요</h3>
                  <span>☞ {stockInfo.summaryInfo}</span>
                </div> */}
                <div className={styles.stockEx}>
                  <h3 style={{ color: "white" }}>업종</h3>
                  <span>☞ {stockInfo.category}</span>
                </div>
                <div className={styles.stockEx}>
                  <h3 style={{ color: "white" }}>시총</h3>
                  <span>☞ {stockInfo.marketSum}</span>
                </div>
                <div className={styles.speaker}></div>
              </>
            )}
            {/* <h5 style={{ color: "white" }}>{stockData.symbols}</h5> */}
          </div>
        </div>
      </div>
      <div className={styles.searchArea}>
        <div className={styles.searchCompanyContainer}>
          <div className={styles.companyInputBox}>
            <input
              type="text"
              value={inputValue}
              onChange={changeInputValue}
              onKeyUp={handleDropDownKey}
              isHaveInputValue={isHaveInputValue}
              className={styles.companyInput}
              placeholder="회사명을 입력해주세요"
            />
            <button
              onClick={() => {
                sendInputValueBtn();
              }}
              className={styles.companyBtn}
            >
              &#43;
            </button>
          </div>

          {isHaveInputValue && (
            <ul className={styles.dropDownBox}>
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
            </ul>
          )}
        </div>
        <div className={styles.gptSearch}>
          <h3>답변 : {gptRes}</h3>
          <form onSubmit={sendChatGPT}>
            <input
              type="text"
              onChange={(e) => {
                setGptValue(e.target.value);
              }}
              value={gptValue}
              className={styles.gptInput}
              placeholder={"Use Chat GPT"}
            ></input>
            <button
              type="submit"
              onClick={sendChatGPTBtn}
              className={styles.chatGptBtn}
            >
              ⌲
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: black;
    color: #f4e603;
  }
`;
