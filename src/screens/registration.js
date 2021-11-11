import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Pager, PagerProvider } from "@crowdlinker/react-native-pager";
import {
  WithContainer,
  RegistrationFirstForm,
  RegistrationSecondForm,
  RegistrationThirdForm,
  RegistrationFourthForm,
} from "../components";
import { setHubListData } from "../actions/dropdowns";
import { colors } from "../styles/index";
import { constants } from "../constants";

const Registration = ({ navigation }) => {
  const [activePage, setActivePage] = useState(0);
  const [registrationData, setRegistrationData] = useState({});
  const goBack = () => navigation.goBack();
  const { icons } = constants;
  const { t } = useTranslation();
  const { hubList } = useSelector((state) => ({
    hubList: state?.dropdowns?.hubList,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHubListData());
  }, []);

  return (
    <WithContainer
      title={t("registration.headerTitle")}
      isLoading={false}
      isHeader
      isRefreshControl={false}
      onLeftIconClick={goBack}
      leftIcon={icons.arrowBack.name}
      noContent>
      <PagerProvider activeIndex={activePage}>
        <Pager panProps={{ enabled: false }} style={styles.viewPager}>
          <RegistrationFirstForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
          />
          <RegistrationSecondForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            hubList={hubList}
            setHubListData={setHubListData}
            dispatch={dispatch}
          />
          <RegistrationThirdForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
          />
          <RegistrationFourthForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
          />
        </Pager>
      </PagerProvider>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: "100%",
  },
  textStyle: {
    color: colors.darkBlack,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 0,
    height: "100%",
    width: "100%",
  },
});
export default Registration;
