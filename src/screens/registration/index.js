import { connect } from "react-redux";
import Registration from "./registration";
import { setHubListData } from "../../actions/dropdowns";

const mapStateToProps = (state) => ({ hubList: state?.dropdowns?.hubList });

const mapDispatchToProps = { setHubListData };

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
