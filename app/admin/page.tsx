"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { FilterWindow } from "../components/FilterWindow";
import { Content } from "../components/Content";
import { BarberShop } from "../model/BarberShop";
import { fetchData } from "../lib/api";
import { Provider } from "react-redux";
import { NavBar } from "../components/NavBar";
import { legacy_createStore as createStore } from "redux";

export default function Page() {
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const [keyword, setKeyword] = useState<string>("");
  const [barber, setBarber] = useState<number>(3);
  const [price, setPrice] = useState<number>(50000);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadData() {
      setBarbershops(await fetchData({ itemsPerPage: itemsPerPage, currentPage: currentPage }));
    }

    loadData();
  }, [currentPage]);

  // TODO: currentState, action 타입 지정하기
  const reducer = (currentState: any, action: any) => {
    if (currentState === undefined) {
      return {
        barbershops: barbershops,
        price: price,
        barber: barber,
        showFilterWindow: false,
        selectedBarbershop: selectedBarbershop,
        keyword: keyword,
        filteredBarbershops: [],
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
      };
    }

    const newState = { ...currentState };

    switch (action.type) {
      case "SET_PRICE":
        newState.price = action.payload;
        return newState;
      case "SET_BARBER":
        newState.barber = action.payload;
        return newState;
      case "SET_BARBERSHOPS":
        newState.barbershops = action.payload;
        return newState;
      case "SET_SHOW_FILTER_WINDOW":
        newState.showFilterWindow = action.payload;
        return newState;
      case "SET_SELECTED_BARBERSHOP":
        newState.selectedBarbershop = action.payload;
        return newState;
      case "SET_KEYWORD":
        newState.keyword = action.payload;
        return newState;
      case "SET_FILTERED_BARBERSHOPS":
        newState.filteredBarbershops = action.payload;
        return newState;
      case "SET_CURRENT_PAGE":
        newState.currentPage = action.payload;
        return newState;
      case "SET_ITEMS_PER_PAGE":
        newState.itemsPerPage = action.payload;
        return newState;
      default:
        return currentState;
    }
  };

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <FilterWindow />
      <div className={styles["container"]}>
        <NavBar />
        <Content />
      </div>
    </Provider>
  );
}
