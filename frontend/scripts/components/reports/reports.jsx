import React from 'react';

import {Link} from 'react-router-dom';

class Reports extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    this.props.requestReports();
  }

  render() {

    const reports = this.props.reports;

    return (
      <div className="reports-div">
        <h1 className="your-report-header">Your Report</h1>

        <table className="report-table">
        <thead>
          <tr>
            <th className="reports-th">Vitamin</th>
            <th className="reports-th">Recommended?</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((el) => {
              return (
              <tr>
                <th className="reports-th" scope="row" key={el.phenotype}>{el.phenotype}</th>
                <td className="reports-td" key={`0${el.phenotype}`}>{el.score < 3 ? <Link to={`/${el.phenotype}`}>Browse Supplements</Link> : `Great News! You May Not Need Supplements`}</td>
              </tr> )
            })
          }
        </tbody>
      </table>
      </div>
    );
  }
}

export default Reports;
