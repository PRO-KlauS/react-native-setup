import { get } from "../setup/client";

const getSupportContacts = (hubID) => {
  return get(`CustomerSupport/GetCustomerSupportContactNo?HubId=${hubID}`);
};

export { getSupportContacts };
