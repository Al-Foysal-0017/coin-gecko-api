import React, { useState, useEffect } from "react";
import "./App.css";
import Currency from "./components/Currency";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [coinData, setCoinData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);
  const filterCoins = coinData.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const currentPageData = filterCoins.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(filterCoins.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  // console.log("FILTERDATA:>>>", filterCoins);
  return (
    <div>
      <section>
        <div className="Header">Present Crypto Currency Situation</div>
        <div className="SearchBoxContainer">
          <input
            className="SearchBox"
            type="search"
            placeholder="Search here ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </section>

      {/* <section style={{ margin: "50px" }}>
        <Currency coinData={filterCoins} />
      </section> */}
      <section style={{ margin: "50px" }}>
        <Currency coinData={currentPageData} />
      </section>

      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}

export default App;
