import React from "react";

const Currency = ({ coinData }) => {
  return (
    <>
      <div className="TableContainer">
        <div className="tableData bg-red">Name and Image</div>
        <div className="tableData bg-red">Symbol</div>
        <div className="tableData bg-red">Total Supply</div>
        <div className="tableData bg-red">Total Volume</div>
        <div className="tableData bg-red">Market Cap Change(%)</div>
        <div className="tableData bg-red">Markrt Cap</div>
      </div>
      {coinData.map((item) => (
        <div key={item.id} className="TableContainer">
          <div className="tableData">
            <img src={item.image} alt="" className="cryptoLogo" />
            {item.name}
          </div>
          <div className="tableData">{item.symbol}</div>
          <div className="tableData">$ {item.total_supply}</div>
          <div className="tableData">${item.total_volume}</div>
          <div className="tableData">
            {item.market_cap_change_percentage_24h > 0 && (
              <span className="red">
                {item.market_cap_change_percentage_24h}
              </span>
            )}
            {item.market_cap_change_percentage_24h < 0 && (
              <span className="green">
                {item.market_cap_change_percentage_24h}
              </span>
            )}
          </div>
          <div className="tableData">mkt cap: {item.market_cap}</div>
        </div>
      ))}
    </>
  );
};

export default Currency;
