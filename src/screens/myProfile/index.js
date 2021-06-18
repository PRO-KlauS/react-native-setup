import { connect } from "react-redux";
import MyProfile from "./myProfile";
import { setProfileData, updateProfileData } from "../../actions/profile";
import { logout } from "../../actions/login";

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  updateProfileData,
  logout,
  setProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
