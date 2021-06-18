import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  WithContainer,
  MyProfileFirstForm,
  MyProfileSecondForm,
} from "../../components";
import { StyleSheet } from "react-native";
import { Pager, PagerProvider } from "@crowdlinker/react-native-pager";
import { colors } from "../../styles/index";
import { constants } from "../../constants";

const MyProfile = ({
  navigation,
  setProfileData,
  profile,
  updateProfileData,
  route,
}) => {
  const [activePage, setActivePage] = useState(0);
  const [firstPageData, setFirstPageData] = useState({});
  const [profileImage, setProfileImage] = useState({
    uri: profile?.profilePhoto || "",
  });
  const openDrawer = () => navigation.openDrawer();
  const { icons } = constants;
  const { t } = useTranslation();

  useEffect(() => {
    setProfileData();
  }, []);

  return (
    <WithContainer
      title={t("myProfile.headerTitle")}
      isLoading={false}
      isHeader={true}
      isRefreshControl={false}
      onLeftIconClick={openDrawer}
      leftIcon={icons.menu.name}
      noContent={true}
    >
      <PagerProvider activeIndex={activePage}>
        <Pager panProps={{ enabled: false }} style={styles.viewPager}>
          <MyProfileFirstForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            setFirstPageData={setFirstPageData}
            profile={profile}
            route={route}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <MyProfileSecondForm
            setActivePage={setActivePage}
            activePage={activePage}
            navigation={navigation}
            firstPageData={firstPageData}
            profile={profile}
            updateProfileData={updateProfileData}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
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
export default MyProfile;
