import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from './post';
import * as actions from '../actions';

export default connect(state => state, dispatch => bindActionCreators(actions, dispatch))(Post);
