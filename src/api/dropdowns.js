import { get, post } from "./client";

const getEVListing = (driverID) => {
  return post(`EV/ActiveEVlist?driverid=${driverID}`);
};

const getHubListing = () => {
  return get("Hub/GetAll");
};

export { getEVListing, getHubListing };
