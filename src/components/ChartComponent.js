
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from './Chart';
import React from 'react';

export class ChartComponent extends React.Component {
    // TODO: Fix nested render
      render() {
      // render(
      //   <ExplanationComponent data={this.props.data}/>,
      //   document.getElementById("explanation")
      // );
      console.log(this.props.data);
          return (
              <TypeChooser>
                  {type => <Chart type={type} data={this.props.data} />}
              </TypeChooser>
          )
      }
  }