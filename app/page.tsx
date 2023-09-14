"use client";

import { useState } from "react";
import { barbers, openDate, priceRange } from "./lib/data";
import { FilterContent } from "./FilterContent";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [showDetailBar, setShowDetailBar] = useState<boolean>(false);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!isFilterActive);

  return (
    <div className="container">
      <div
        className="filter-content"
        style={isFilterActive ? { position: "fixed" } : { display: "none" }}
      >
        <FilterContent title={"시술비"} data={priceRange} />
        <FilterContent title={"바버 인원"} data={barbers} />
        <FilterContent title={"개점일"} data={openDate} />
        <div
          className="close filter-close"
          style={isFilterActive ? { position: "absolute" } : { display: "none" }}
          onClick={() => {
            handleFilter();
          }}
        >
          ×
        </div>
      </div>
      <div className="nav-container">
        <div className="title">
          <div
            onClick={() => {
              setShowDetailBar(false);
            }}
          >
            <span style={{ color: "#4285F4" }}>B</span>
            <span style={{ color: "#DB4437" }}>a</span>
            <span style={{ color: "#F4B400" }}>r</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#0F9D58" }}>l</span>
            <span style={{ color: "#DB4437" }}>e</span>
          </div>
        </div>
        <div className="search-container">
          <div className="search">
            <div className="search-glass" style={{ zIndex: "100" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className="search-input"
              placeholder="지역을 입력해주세요"
              style={{ paddingLeft: "35px" }}
            />
            <div className="search-button" style={{ paddingRight: "10px" }}>
              <div>검색</div>
            </div>
          </div>
        </div>
        <div className="category">
          {/* <div className="category-content">지도 ▾</div> */}
          <div
            className="category-content"
            onClick={() => {
              handleFilter();
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
      </div>
      <Content showDetailBar={showDetailBar} setShowDetailBar={setShowDetailBar} />
    </div>
  );
}
