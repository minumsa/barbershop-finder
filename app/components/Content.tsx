import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "../page.module.css";
import { BarberShop } from "../model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Grid } from "./Grid";
import { useEffect } from "react";

interface ContentProps {
  price: number;
  barber: number;
  selectedBarbershop: BarberShop | null | undefined;
  filteredBarbershops: BarberShop[];
}

export const Content = () => {
  const { price, barber, selectedBarbershop, filteredBarbershops } = useSelector(
    (state: ContentProps) => ({
      price: state.price,
      barber: state.barber,
      selectedBarbershop: state.selectedBarbershop,
      filteredBarbershops: state.filteredBarbershops,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBarbershop]);

  return (
    <div className={styles["content-container"]}>
      {/* 모바일 화면일 때 표시할 부분 */}
      <div className={styles["mobile-tab-flexbox"]}>
        <div
          className={styles["mobile-map-container"]}
          style={
            selectedBarbershop
              ? {
                  height: 0,
                  minHeight: 0,
                }
              : undefined
          }
        >
          {filteredBarbershops.length === 0 ? <Grid /> : <Map />}
        </div>
        <div className={styles["tab-container"]}>
          {selectedBarbershop ? <SubTab /> : <MainTab />}
        </div>
      </div>
      {/* PC 화면일 때 표시할 부분 */}
      <div className={styles["tab-flexbox"]}>
        <div className={styles["tab-container"]}>
          {selectedBarbershop ? <SubTab /> : <MainTab />}
        </div>
        {selectedBarbershop && (
          <div
            className={styles["tab-bookmark"]}
            onClick={() => {
              dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: null });
            }}
          >
            <div className={styles["close"]} style={{ marginRight: "10px" }}>
              ×
            </div>
          </div>
        )}
      </div>
      <div className={styles["map-container"]}>
        <div className={styles["filter-box-container"]}>
          <div className={styles["filter-box"]}>
            <div className={styles["filter-box-title"]}>{`시술비 :`}</div>
            <div className={styles["filter-box-content"]}>
              {price === 50000 ? "전체 선택" : `${price.toLocaleString()}원 이하,`}
            </div>
          </div>
          <div className={styles["filter-box"]}>
            <div className={styles["filter-box-title"]}>{`바버 인원 :`}</div>
            <div className={styles["filter-box-content"]}>
              {barber === 3 ? "전체 선택" : barber === 2 ? "2인 이상" : `${barber}인`}
            </div>
          </div>
        </div>
        {filteredBarbershops.length === 0 ? <Grid /> : <Map />}
      </div>
    </div>
  );
};
