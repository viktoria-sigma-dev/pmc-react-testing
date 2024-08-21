import React, {useCallback, useEffect, useState} from "react";
import {EncodeAdPreferencesString} from "./components/EncodeAdPreferencesString";
import {DecodeAdPreferencesString} from "./components/DecodeAdPreferencesString";
import {CountrySelection} from "./components/CountrySelection";
import {GPCAvailability} from "./components/GPCAvailability";

function App() {
  const [adPreferencesValue, setAdPreferencesValue] = useState("");
  const [currentAdPreferencesValue, setCurrentAdPreferencesValue] = useState("");
  const [optedOutCompanies, setOptedOutCompanies] = useState(null);

  /* Emulate vendor.js. Listen preferences value from extension */
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === "ExtensionLoaded") {
        window.postMessage({type: 'GetAdPreferences'}, '*');
      }
      if (event.data.type === "AdPreferences") {
        console.log("React skeleton application, preferences received", event.data);
        setCurrentAdPreferencesValue(event.data.data);
      }
      if (event.data.type === "OptedOutCompanies") {
        console.log("React skeleton application, opted out companies received", event.data);
        setOptedOutCompanies(event.data.data ?? {successful: [], failed: []});
      }
    });
  }, []);

  /* Emulate vendor.js. Update preferences when tab becomes active START */
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      window.postMessage({type: 'GetAdPreferences'}, '*')
    }
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
  /* Emulate vendor.js. Update preferences when tab becomes active END */

  /* Emulate YAC Web Url. Emulate update preferences */
  const savePreferences = () => {
    setAdPreferencesValue("");
    window.postMessage({type: 'UpdateAdPreferences', data: adPreferencesValue}, '*');
  }

  /* Emulate YAC Web Url. Emulate return user country */
  const onCountrySelectionSave = (data) => {
    window.postMessage({type: 'SetUserLocation', data}, '*');
  }

  const requestOptedOutCompanies = () => {
    window.postMessage({ type: "GetOptedOutCompanies" }, "*");
  };

  return (
    <div className="App" style={{paddingBottom: "200px"}}>
      <div style={{backgroundColor: "#D6D9DC"}}>
        <p>Emulate vendor.js:</p>
        <p>Current (extension) ad preferences value: {currentAdPreferencesValue}</p>
        <div>
          <button onClick={requestOptedOutCompanies}>
            Request Opted-Out Companies
          </button>
          <br/>
          {optedOutCompanies && (
            <>
              <b>Successful DAA participants:&nbsp;</b>
              {optedOutCompanies.successful.length ? <span>{optedOutCompanies.successful.join(", ")}</span> : "-"}<br/>
              <b>Failed DAA participants:&nbsp;</b>
              {optedOutCompanies.failed.length ? <span>{optedOutCompanies.failed.join(", ")}</span> : "-"}
            </>
          )}
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <div style={{backgroundColor: "#EDF5FD"}}>
        <p>Emulate YAC web url:</p>
        <label htmlFor="value">New ad preferences value: </label>
        <input id="value" type="text" value={adPreferencesValue} onChange={(e) => setAdPreferencesValue(e.target.value)}/>
        <button onClick={savePreferences} disabled={!adPreferencesValue.length}>Submit ad preferences</button>
        <hr/>
        <CountrySelection
          onSave={onCountrySelectionSave}
        />
        <hr/>
        <GPCAvailability/>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <EncodeAdPreferencesString/>
      <br/><br/><br/><br/><br/><br/>
      <DecodeAdPreferencesString/>
      <br/><br/><br/><br/><br/><br/>
      <div style={{backgroundColor: 'rgb(255, 236, 224)', padding: '20px'}}>
        <iframe
          title="Widget1"
          src="https://d3tcjj8eoorxjp.cloudfront.net"
          width="300"
          height="400"
          style={{border: 'none'}}
        />
      </div>
    </div>
  );
}

export default App;
