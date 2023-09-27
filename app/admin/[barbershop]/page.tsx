"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faScissors,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FilterWindow } from "@/app/FilterWindow";
import { Upload } from "@/app/Upload";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export default function Page({ params }: any) {
  const id = params.barbershop;
  const [price, setPrice] = useState<number>(50000); // price원 이상
  const [barber, setBarber] = useState<number>(3); // barber명 이상
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const router = useRouter();

  return (
    <div className={styles["container"]}>
      <div
        className={styles["filter-content"]}
        style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
      >
        <FilterWindow
          setIsFilterActive={setIsFilterActive}
          price={price}
          setPrice={setPrice}
          barber={barber}
          setBarber={setBarber}
        />
      </div>
      <div className={styles["nav-container"]}>
        <div
          className={styles["title"]}
          onClick={() => {
            router.push("/admin");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faScissors} />
          </div>
          <div>Barber</div>
        </div>
        <div className={styles["search-container"]}>
          <div className={styles["search"]}>
            <div className={styles["magnifying-glass"]}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className={styles["search-input"]}
              placeholder="지역을 입력해주세요"
              style={{ paddingLeft: "35px" }}
            />
            <div className={styles["search-button"]}>
              <div>검색</div>
            </div>
          </div>
        </div>
        <div className={styles["category"]}>
          <div
            className={styles["filter-icon"]}
            style={{ marginRight: "15px" }}
            onClick={() => {
              router.push("/admin/upload");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div
            className={styles["filter-icon"]}
            onClick={() => {
              handleFilter();
            }}
          >
            <FontAwesomeIcon icon={faSliders} />
          </div>
        </div>
      </div>
      <Upload id={id} />
    </div>
  );
}
