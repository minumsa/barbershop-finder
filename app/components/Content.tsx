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
  barbershops: BarberShop[];
}

interface Content {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  totalDataCount: number;
  price: number;
  barber: number;
}

export const Content = ({ setCurrentPage, keyword, totalDataCount, price, barber }: Content) => {
  const { selectedBarbershop, barbershops } = useSelector(
    (state: ContentProps) => ({
      price: state.price,
      barber: state.barber,
      selectedBarbershop: state.selectedBarbershop,
      barbershops: state.barbershops,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const isLoading = barbershops.length === 0;

  // 메인 탭, 서브 탭 전환 시 스크롤 맨 위로 이동
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
          {isLoading ? <Grid /> : <Map />}
        </div>
        <div className={styles["tab-container"]}>
          {selectedBarbershop ? (
            <SubTab />
          ) : (
            <MainTab
              setCurrentPage={setCurrentPage}
              keyword={keyword}
              totalDataCount={totalDataCount}
              price={price}
              barber={barber}
            />
          )}
        </div>
      </div>
      {/* PC 화면일 때 표시할 부분 */}
      <div className={styles["tab-flexbox"]}>
        <div className={styles["tab-container"]}>
          {selectedBarbershop ? (
            <SubTab />
          ) : (
            <MainTab
              setCurrentPage={setCurrentPage}
              keyword={keyword}
              totalDataCount={totalDataCount}
              price={price}
              barber={barber}
            />
          )}
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
        {isLoading ? <Grid /> : <Map />}
      </div>
    </div>
  );
};
