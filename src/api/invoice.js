import { get } from "./client";

const getInvoiceList = (body) => {
  return get("some_url", body);
};

const getInvoiceDetails = (body) => {
  return get("some_url", body);
};

export { getInvoiceList, getInvoiceDetails };
