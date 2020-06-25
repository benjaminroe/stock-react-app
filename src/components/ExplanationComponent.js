import React from 'react';
import '../App.css';

export class ExplanationComponent extends React.Component {
    // TODO: Formatting and styling
        render() {
  
          return (
            <div className="centre">
                <br/>
                <br/>
            <p>
                This tool allows you to select a stock from the US Market and gather 7 days worth of its' intraday prices down to the minute. This includes the open, close, high and low prices, as well as the volume of that stock traded.
            </p>
            <p>
            Currently there are no free tools that allow you access to this much information, and this is all real data. 
            </p>
            <p>
            This was thrown together in a few days using React and Vercel to demonstrate rapid prototyping.
            </p>
            <p>
            As such, this is very much a WIP. It needs a whole lot of love in order to get it to a releasable state!
            </p>
            <br/>
            <br/>
            <p>
            Built by me - Benjamin Roe.
            </p>
            <a href="https://github.com/benjaminroe">GitHub</a>
            <br/>
            <a href="https://www.linkedin.com/in/benjamin-roe-626851100/">LinkedIn</a>
          </div>
          )
      }
  }