import React from 'react';
import {connect} from 'react-redux';

import Reports from './reports';
import {requestReports} from '../../actions/report_actions';

const mapStateToProps = state => {
  return {reports: state.entities.reports};
}

const mapDispatchToProps = dispatch => {
  return {requestReports: () => dispatch(requestReports())};
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
