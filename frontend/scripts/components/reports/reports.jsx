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
      <div>
        <h1>Your Report</h1>

        <table className="table">
        <thead>
          <tr>
            <th>Vitamin</th>
            <th>Recommended?</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((el) => {
              return (
              <tr>
                <th scope="row" key={el.phenotype}>{el.phenotype}</th>
                <td key={`0${el.phenotype}`}>{el.score < 2 ? <Link to={`/${el.phenotype}`}>Browse Supplements</Link> : `Great News!, You May Not Need Supplements`}</td>
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
