import React from 'react';

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
            <th>Name</th>
            <th>Genetic insights</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((el) => {
              return (
              <tr>
                <th scope="row" key={el.phenotype}>{el.phenotype}</th>
                <td key={`0${el.phenotype}`}>{`${el.summary} | ${el.score}/4`}</td>
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
