import React, { useState } from 'react';

const ExpandablePanel = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  const togglePanel = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <button onClick={togglePanel}>{expanded ? 'Hide GPC available config' : 'Show GPC available config'}</button>
      {expanded && (
        <div className="panel-content">
          <h3>Current GPC configuration added to the PMC extension:</h3>
          {content}
        </div>
      )}
    </div>
  );
};

const KeyValueDisplay = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}: </strong>
          {Array.isArray(value) ? (
            <ul>
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>{value.toString()}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export const GPCAvailability = () => {
  const data = {
    "gpc": {
      "available": true,
      "availableForCountryCodes": ["US", "CA", "UA"],
      "confirmResidencyForRegionCodes": ["CO", "OR"]
    }
  };

  return (
    <ExpandablePanel content={
      <KeyValueDisplay data={data.gpc} />
    } />
  );
};
