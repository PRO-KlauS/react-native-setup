import { connect } from 'react-redux';
import OTP from './otp';
import { setUserData } from '../../actions/login';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
