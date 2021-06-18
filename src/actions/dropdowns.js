import { getEVListing, getHubListing } from "../api/dropdowns";

const SET_EV_LIST_DATA = "SET_EV_LIST_DATA";
const SET_HUB_LIST_DATA = "SET_HUB_LIST_DATA";

const setEVListData = () => (dispatch, getState) => {
  return getEVListing(getState()?.user?.driverId).then((res) => {
    if (res.data.success === true) {
      let evList =
        (res.data?.details?.length > 0 &&
          res.data.details.map((ev) => {
            return {
              label: ev.chassisNumber,
              value: ev.evRegId,
            };
          })) ||
        [];
      dispatch({
        type: SET_EV_LIST_DATA,
        payload: evList,
      });
    }
    return res.data;
  });
};

const setHubListData = () => (dispatch) => {
  return getHubListing().then((res) => {
    if (res.data.success === true) {
      let hubList =
        (res.data?.details?.length > 0 &&
          res.data.details.map((hub) => {
            return {
              label: hub?.hubName + ", " + hub.hubCity,
              value: hub?.hubId,
            };
          })) ||
        [];
      dispatch({
        type: SET_HUB_LIST_DATA,
        payload: hubList,
      });
    }
    return res.data;
  });
};

export { setEVListData, setHubListData, SET_EV_LIST_DATA, SET_HUB_LIST_DATA };
