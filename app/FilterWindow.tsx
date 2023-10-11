import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";

interface FilterWindowProps {
  price: number;
  barber: number;
  showFilterWindow: boolean;
}

export const FilterWindow = () => {
  const { price, barber, showFilterWindow } = useSelector(
    (state: FilterWindowProps) => ({
      price: state.price,
      barber: state.barber,
      showFilterWindow: state.showFilterWindow,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  return (
    <div
      className={styles["filter-content"]}
      style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
    >
      <div className={styles["filter-container"]}>
        <div
          className={styles["filter-close"]}
          onClick={() => {
            dispatch({ type: "SET_SHOW_FILTER_WINDOW", payload: false });
          }}
        >
          <div>지도 옵션</div>
          <div className={styles["close"]}>×</div>
        </div>
        <div style={{ display: "flex", marginTop: "15px" }}>
          <div>시술비</div>
          <div style={{ paddingLeft: "30px" }}>
            {price === 50000 ? "전체 선택" : `${price.toLocaleString()}원 이하`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ paddingTop: "20px" }}>
            <input
              className="filter-input"
              type="range"
              id="price"
              name="price"
              list="price-markers"
              min={20000}
              max={50000}
              step={5000}
              value={price}
              onChange={e => {
                const newPrice = Number(e.target.value);
                dispatch({ type: "SET_PRICE", payload: newPrice });
              }}
            />
            <datalist id="price-markers">
              <option value="20000"></option>
              <option value="25000"></option>
              <option value="30000"></option>
              <option value="35000"></option>
              <option value="40000"></option>
              <option value="45000"></option>
              <option value="50000"></option>
            </datalist>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "50px" }}>
          <div>바버 인원</div>
          <div style={{ paddingLeft: "30px" }}>
            {barber === 1 ? "1인" : barber === 2 ? "2인 이상" : "전체 선택"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ paddingTop: "20px" }}>
            <input
              className="filter-input"
              type="range"
              id="barber"
              name="barber"
              min={1}
              max={3}
              step={1}
              value={barber}
              list="barber-markers"
              onChange={e => {
                const newBarber = Number(e.target.value);
                dispatch({ type: "SET_BARBER", payload: newBarber });
              }}
            />
            <datalist id="barber-markers">
              <option value="0"></option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
};
