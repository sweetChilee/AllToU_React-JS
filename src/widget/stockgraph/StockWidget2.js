// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget(props) {
  const contariner = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    if (document.getElementById("1") !== null) {
      const sc = document.getElementById("1");
      sc.remove();
    }
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.id = "1";
    script.innerHTML = props.data;
    contariner.current.appendChild(script);
  }, [props.data]);

  return (
    <div className="tradingview-widget-container" ref={contariner}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
