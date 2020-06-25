import React from 'react';
import { getMaxProfit } from "../utils";
import '../App.css';

export class ResultsComponent extends React.Component {
        render() {
      const data = getMaxProfit(this.props.data);
  
          return (
              <div className="wrapper">
                  <div className="centre">
                  <p> Maximum profit = ${data.profit.toFixed(3)} </p>
                  </div>
                  <br/>
                  <div id="block1">
                  Purchase Price: ${data.buyPrice}
                  <br/>
                  <br/>
                  Buy Date: {data.buyDate}
                </div>

                <div id="block2">
                Sell Price: ${data.sellPrice}
                  <br/>
                  <br/>
                Sell Date: {data.sellDate}
                </div>
                <br/>
              </div>
          )
      }
  }