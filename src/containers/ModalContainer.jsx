import { connect } from 'react-redux';
import * as actions from '../actions/ui';
import Modal from '../components/common/Modal';

const mapStateToProps = state => ({
  modal: state.ui.modal,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(actions.hideModal()),
  setLoading: bool => dispatch(actions.setLoading(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
