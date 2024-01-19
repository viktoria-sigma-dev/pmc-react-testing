import {useCallback, useEffect, useState} from "react";
import {EncodeAdPreferencesString} from "./components/EncodeAdPreferencesString";
import {DecodeAdPreferencesString} from "./components/DecodeAdPreferencesString";

function App() {
  const [adPreferencesValue, setAdPreferencesValue] = useState("");
  const [currentAdPreferencesValue, setCurrentAdPreferencesValue] = useState("");

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

  return (
    <div className="App" style={{paddingBottom: "200px"}}>
      <div style={{backgroundColor: "#D6D9DC"}}>
        <p>Emulate vendor.js:</p>
        <p>Current (extension) ad preferences value: {currentAdPreferencesValue}</p>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <div style={{backgroundColor: "#EDF5FD"}}>
        <p>Emulate YAC web url:</p>
        <label htmlFor="value">New ad preferences value: </label>
        <input id="value" type="text" value={adPreferencesValue} onChange={(e) => setAdPreferencesValue(e.target.value)}/>
        <button onClick={savePreferences} disabled={!adPreferencesValue.length}>Submit ad preferences</button>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <EncodeAdPreferencesString/>
      <br/><br/><br/><br/><br/><br/>
      <DecodeAdPreferencesString/>
    </div>
  );
}

export default App;
