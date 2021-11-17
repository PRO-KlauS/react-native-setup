import { constants } from "../../constants";

const icons = constants.icons;

const exampleMapper = {
  key: false,
};

const tabBarIconMapper = {
  myProfileStack: {
    name: icons.profile.name,
    type: icons.profile.type,
  },
  invoiceListingStack: {
    name: icons.invoice.name,
    type: icons.invoice.type,
  },
};

export { exampleMapper, tabBarIconMapper };
