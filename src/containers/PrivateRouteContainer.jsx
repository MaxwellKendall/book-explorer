import { connect } from 'react-redux';
import * as uiActions from '../actions/ui';
import PrivateRoute from '../components/common/PrivateRoute';

const mapStateToProps = state => ({
  activeUser: state.ui.activeUser,
});

const mapDispatchToProps = dispatch => ({
  setActiveUser: user => dispatch(uiActions.setActiveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
