import { connect } from "react-redux";
import InvoiceDetails from "./invoiceDetails";

const mapStateToProps = (state) => ({ driverID: state?.user?.driverId });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails);
