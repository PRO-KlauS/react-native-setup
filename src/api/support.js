import { get } from "./client";

const getSupportContacts = (hubID) => {
  return get(`CustomerSupport/GetCustomerSupportContactNo?HubId=${hubID}`);
};

export { getSupportContacts };
