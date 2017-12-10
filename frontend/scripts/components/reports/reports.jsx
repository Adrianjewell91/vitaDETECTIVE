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
            <th className="reports-th head">Vitamin</th>
            <th className="reports-th head">Recommended?</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((el) => {
              return (
              <tr className='tr-report-body'>
                <th className="reports-th row" scope="row" key={el.phenotype}>{el.phenotype}</th>
                <td className="reports-td row" scope="row" key={`0${el.phenotype}`}>{el.score < 3 ? <Link to={`/${el.phenotype}`}>Browse Supplements</Link> : `Great news! You may not need supplements.`}</td>
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
