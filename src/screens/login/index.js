import { connect } from "react-redux";
import Login from "./login";
import { setUserData } from "../../actions/login";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
