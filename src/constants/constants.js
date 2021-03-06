const constants = {
  notificationTypes: {
    exampleType: "example_type",
  },
  regex: {
    name: /^([a-zA-Z\s])*$/,
    mobile: /^[1-9]{1}[0-9]{9}$/,
    onlyNumbers: /^[0-9]*$/,
    aadhar: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
    pan: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
    drivingLicense: /^(([A-Z]{2}[0-9]{2}))\s([0-9]{4})\s[0-9]{7}$/,
    pincode: /^[1-9]{1}[0-9]{5}$/,
    bankAccountNo: /^\d{9,18}$/,
    ifscCode: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    vehicleRegistrationNo: /^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/,
  },
  masks: {
    panNoMask: "[AAAAA0000A]",
    licenseNoMask: "[AA00]{ }[0000]{ }[0000000]",
    aadharMask: "[0000]{ }[0000]{ }[0000]",
    vehicleNoMask: "[AA]{ }[00]{ }[AA]{ }[0000]",
  },
  sortDropDownList: [
    { label: "Date: Oldest to Newest", value: "date_old_to_new" },
    { label: "Date: Newest to Oldest", value: "date_new_to_old" },
    { label: "Amount: Low to High", value: "amount_low_to_high" },
    { label: "Amount: High to Low", value: "amount_high_to_low" },
  ],
  icons: {
    home: { name: "home", type: "Entypo" },
    arrowBack: { name: "arrow-back", type: "MaterialIcons" },
    menu: { name: "menu", type: "MaterialIcons" },
    plus: { name: "plus", type: "AntDesign" },
    calendar: { name: "calendar", type: "EvilIcons" },
    clock: { name: "clockcircle", type: "AntDesign" },
    eye: { name: "eye", type: "FontAwesome" },
    eyeSlash: { name: "eye-slash", type: "FontAwesome" },
    search: { name: "search", type: "MaterialIcons" },
    logout: { name: "user-times", type: "FontAwesome" },
    info: { name: "info-outline", type: "MaterialIcons" },
    profile: { name: "person", type: "Fontisto" },
    pencil: { name: "pencil", type: "MaterialCommunityIcons" },
    bell: { name: "bell", type: "FontAwesome" },
    topUp: { name: "payment", type: "MaterialIcons" },
    car: { name: "directions-car", type: "MaterialIcons" },
    cash: { name: "money", type: "FontAwesome" },
    battery: { name: "battery-high", type: "MaterialCommunityIcons" },
    sort: { name: "sort-amount-down", type: "FontAwesome5" },
    company: { name: "building-o", type: "FontAwesome" },
    model: { name: "build", type: "MaterialIcons" },
    invoice: { name: "file-invoice", type: "FontAwesome5" },
    payment: { name: "payment", type: "MaterialIcons" },
    support: { name: "help", type: "MaterialIcons" },
    check: { name: "check-circle", type: "MaterialIcons" },
    building: { name: "building", type: "FontAwesome5" },
  },
  currencySign: "???",
};
export default constants;
