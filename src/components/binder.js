import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default connect(
  state => state.toJS(),
  dispatch => bindActionCreators(actions, dispatch)
);
