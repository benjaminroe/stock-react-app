import React from 'react';
import { useState } from 'react';
import './App.css';
/* eslint-disable */


import { CSVDownloader } from './components/CsvDownloader';
import { TitleComponent } from './components/Title';
import { ChartComponent } from './components/ChartComponent';
import { ExplanationComponent } from './components/ExplanationComponent';
import { ResultsComponent } from './components/ResultsComponent';
import Select from 'react-select';

import { formatJSONtoCSV, parseUploadedData } from "./utils";

import { CSVReader } from 'react-papaparse';

// TODO: Define css styles
// TODO: Add own logo -> favicon.ico
// TODO: Update manifest
const options = [
  { value: 'AAPL', label: 'Apple' },
  { value: 'TSLA', label: 'Tesla' }
];

const buttonRef = React.createRef();

export function App() {
  const [isLoading, updateIsLoading] = useState(false);
  const [selected, updateSelected] = useState(null);
  const [data, updateData] = useState(null);

  // const [csvData, updateCsvData] = useState(null);

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  };

  const handleOnFileLoad = (data) => {
    const updatedData = parseUploadedData(data);
    updateSelected(null);
    updateData(updatedData);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  };

  const handleOnRemoveFile = (data) => {
    updateData(null);
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  };

  const handleChange = (option) => {
    const { value } = option; // or e.target

    updateIsLoading(true);
    updateSelected(option);

    (async () => {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = `https://www.bloomberg.com/markets2/api/intraday/${value}%3AUS?days=7&interval=1&volumeInterval=1`;

      const res = (await fetch(`${proxyUrl}${targetUrl}`)).json()
      .then(data => {
        const updatedData = formatJSONtoCSV(data[0].price, data[0].volume);
        console.log(updatedData);
        updateData(updatedData);
      });
    })();
  };

  return (
    <div className="container">
      <TitleComponent />
      {data && <ResultsComponent data={data}/>}
      <div className="centreSelector">
        <Select
          value={selected}
          onChange={handleChange}
          options={options}
      />
      </div>

      { data && <ChartComponent data={data}/> }
      { data && <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
              marginTop: 20,
              height: 50
            }}
          >
            { data && <CSVDownloader selectedData={data} /> }
            <button
              type='button'
              onClick={handleOpenDialog}
              style={{ //pass other props, like styles
                boxShadow:"inset 0px 1px 0px 0px #e184f3",
                background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                backgroundColor:"#c123de",
                borderRadius:"6px",
                border:"1px solid #a511c0",
                display:"inline-block",
                cursor:"pointer","color":"#ffffff",
                fontSize:"15px",
                fontWeight:"bold",
                padding:"6px 24px",
                textDecoration:"none",
                textShadow:"0px 1px 0px #9b14b3",
                marginLeft: "25%",
                width:"10%"
                }}
            >
              Upload CSV File
            </button>
            {/* <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '10%',
                marginLeft: "2%"
              }}
            >
              {file && file.name}
            </div> */}
            <button
            style={{ //pass other props, like styles
              boxShadow:"inset 0px 1px 0px 0px #e184f3",
              background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
              backgroundColor:"#c123de",
              borderRadius:"6px",
              border:"1px solid #a511c0",
              display:"inline-block",
              cursor:"pointer","color":"#ffffff",
              fontSize:"15px",
              fontWeight:"bold",
              padding:"6px 24px",
              textDecoration:"none",
              textShadow:"0px 1px 0px #9b14b3",
              marginLeft: "25%",
              marginRight: "10%",
              width:"10%"
              }}
              onClick={handleRemoveFile}
            >
              Remove CSV
            </button>
          </aside>
        )}
      </CSVReader>}
      <ExplanationComponent />
    </div>
  );
}
