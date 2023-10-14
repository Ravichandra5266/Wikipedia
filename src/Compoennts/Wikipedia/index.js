import { useState } from "react";
import "./style.css";
import SearchItems from "../SearchItems";

const Wikipedia = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageItems = 5;
  const startIndex = (currentPage - 1) * perPageItems;
  const endIndex = startIndex + perPageItems;
  const sliceData = displayData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayData.length / perPageItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };
  const onkeypress = async (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      const url = `https://apis.ccbp.in/wiki-search?search=${inputValue}`;
      const options = {
        method: "GET",
      };
      const reqData = await fetch(url, options);
      const resData = await reqData.json();
      setDisplayData(resData.search_results);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentPageChange = (i) => {
    setCurrentPage(i);
  };
  return (
    <div className="bg-primary-subtle">
      <div className="container">
        <div className="row p-3">
          <div className="d-flex align-items-center justify-content-center head-card">
            <img
              src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png"
              alt="wikipedia"
              className="img-fluid logo"
            />
          </div>
        </div>
        <div className="row mt-3 p-3">
          <input
            type="search"
            placeholder="Search"
            className="form-control text-center p-2"
            value={inputValue}
            onChange={inputChange}
            onKeyDownCapture={onkeypress}
          />
        </div>
        <div className="row">
          {displayData.length !== 0 && (
            <>
              <ul>
                {sliceData.map((each) => {
                  return <SearchItems each={each} key={each.link} />;
                })}
              </ul>
              <ul className="pagination d-flex align-items-center justify-content-center ps-3 pe-3">
                <li className="page-item">
                  <button
                    disabled={currentPage === 1}
                    className="page-link"
                    onClick={prevPage}
                  >
                    Previous
                  </button>
                </li>
                {pageNumbers.map((_, i) => {
                  return (
                    <li className="page-item">
                      <button
                        className={` ${
                          currentPage === i + 1
                            ? "btn btn-primary"
                            : "page-link"
                        }`}
                        onClick={() => currentPageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                })}
                <li className="page-item">
                  <button
                    disabled={currentPage === totalPages}
                    className="page-link"
                    onClick={nextPage}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Wikipedia;
