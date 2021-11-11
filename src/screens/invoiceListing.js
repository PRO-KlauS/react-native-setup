import React, { useEffect, useCallback } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import {
  WithContainer,
  SearchBar,
  InvoiceListItem,
  Loader,
  Footer,
  SortDropdown,
} from "../components";
import { constants } from "../constants";
import { spacing } from "../styles";
import { getInvoiceList } from "../api/invoice";
import { showToast, useStateCallback } from "../utility";

const InvoiceListing = ({ navigation }) => {
  const { t } = useTranslation();
  const [state, setState] = useStateCallback({
    listEndLoading: true,
    isLoadingData: false, // Make this true after API implementation
    endReached: false,
    page: 1,
    invoiceList: [
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Cash",
        id: 1,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Credit/Debit Card",
        id: 2,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Credit/Debit Card",
        id: 3,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Credit/Debit Card",
        id: 4,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Cash",
        id: 5,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Cash",
        id: 6,
      },
      {
        ev_number: "AB 01 XY 1231",
        amount: 100,
        date: "05/05/2021",
        paymentMethod: "Cash",
        id: 7,
      },
    ],
    searchValue: "",
    sortMethod: "",
  });

  const {
    listEndLoading,
    isLoadingData,
    endReached,
    page,
    invoiceList,
    searchValue,
    sortMethod,
  } = state;

  useEffect(() => {
    // getInvoices("", 1);
  }, []);

  const onSortMethodChange = (sortMethod) => {
    setState({ ...state, sortMethod });
  };

  const getInvoices = (search, page) => {
    getInvoiceList({ q: { search_cont: search }, page })
      .then((res) => {
        if (res.data.success) {
          setState({
            ...state,
            isLoadingData: false,
            page:
              page + 1 > res.data.pageCount
                ? res.data.pageCount > 0
                  ? res.data.pageCount
                  : 1
                : page + 1,
            listEndLoading: true,
            invoiceList:
              page === 1 ? res.data.data : [...invoiceList, ...res.data.data],
            endReached: res.data.pageCount <= page,
            searchValue: search,
          });
        } else {
          showToast(res.data.errors);
          setState({
            ...state,
            isLoadingData: false,
            listEndLoading: false,
            endReached: true,
            searchValue: search,
          });
        }
      })
      .catch(() => {
        setState({
          ...state,
          isLoadingData: false,
          listEndLoading: false,
          searchValue: search,
        });
      });
  };

  const searchInvoices = (value) => {
    getInvoices(value, 1);
  };

  const debouncedSearchInvoices = useCallback(
    _.debounce(searchInvoices, 1000),
    [],
  );

  const handleSearchValueChange = (value) => {
    setState(
      {
        ...state,
        searchValue: value,
        isLoadingData: true,
        page: 1,
      },
      ({ searchValue }) => {
        debouncedSearchInvoices(searchValue);
      },
    );
  };

  const onInvoiceClick = (invoiceID) =>
    navigation.navigate("invoiceDetails", { invoiceID });

  const renderItem = ({ item = {} }) => {
    return (
      <InvoiceListItem
        amount={item.amount}
        date={item.date}
        ev_number={item.ev_number}
        paymentMethod={item.paymentMethod}
        onClick={() => onInvoiceClick(item?.invoiceId)}
        key={item.id}
      />
    );
  };

  const handleMore = () => {
    if (!endReached) {
      getInvoices(searchValue, page);
    }
  };
  const openDrawer = () => navigation.openDrawer();
  const { icons } = constants;
  return (
    <WithContainer
      title={t("invoiceListing.headerTitle")}
      containerStyle={styles.container}
      onLeftIconClick={openDrawer}
      leftIcon={icons.menu.name}
      isRefreshControl={false}
      isHeader
      noContent>
      <View style={styles.container}>
        <View style={styles.searchParent}>
          <SearchBar
            placeholder={t("invoiceListing.searchPlaceholder")}
            value={searchValue}
            onChange={handleSearchValueChange}
            style={styles.searchBar}
          />
          <SortDropdown
            selectedValue={sortMethod}
            options={t("invoiceListing.sortDropDownList", {
              returnObjects: true,
            })}
            onChange={onSortMethodChange}
            parentStyle={styles.dropDown}
            prompt={t("invoiceListing.sortPlaceholder")}
          />
        </View>
        {isLoadingData ? (
          <Loader hasLoaderText hasLoader parentStyle={{ marginTop: -60 }} />
        ) : (
          <FlatList
            style={styles.content}
            data={invoiceList}
            renderItem={renderItem}
            onEndReached={handleMore}
            onEndReachedThreshold={0.01}
            bounces
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              <Footer
                data={invoiceList}
                listEndLoading={!endReached && listEndLoading}
                message={t("messages.noInvoiceHistory")}
              />
            }
          />
        )}
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    // padding: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 0,
    height: "100%",
    width: "100%",
    flex: 1,
  },
  searchBar: {
    marginBottom: spacing.md,
    marginLeft: 20,
    marginRight: 20,
    width: Dimensions.get("window").width - 140,
  },
  content: {
    paddingRight: spacing.md,
    paddingLeft: spacing.md,
  },
  searchParent: {
    flexDirection: "row",
  },
  dropDown: {
    width: 80,
    marginTop: 15,
  },
});
export default InvoiceListing;
