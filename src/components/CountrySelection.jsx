import React, { useState } from 'react';

export const CountrySelection = ({ onSave }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const countryOptions = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'FR', name: 'France' },
    { code: 'UA', name: 'Ukraine' }
  ];
  const stateOptions = [
    { code: 'CO', name: 'Colorado' },
    { code: 'OR', name: 'Oregon' },
    { code: 'LA', name: 'Los Angeles' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
  ];


  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setErrorMessage('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setErrorMessage('');
  };

  const handleSave = () => {
    if (selectedCountry === '') {
      setErrorMessage('Please select a country.');
    } else if (selectedCountry === 'US' && selectedState === '') {
      setErrorMessage('Please select a state.');
    } else {
      const countryName = countryOptions.find(country => country.code === selectedCountry)?.name || '';
      const stateName = stateOptions.find(state => state.code === selectedState)?.name;
      onSave({ countryCode: selectedCountry, countryName, regionCode: selectedState, regionName: stateName ?? '' });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <h2>Select your country:</h2>
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countryOptions.map(country => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))}
          </select>
        </div>

        {selectedCountry === 'US' && (
          <div>
            <h2>Select your state:</h2>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">Select State</option>
              {stateOptions.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button onClick={handleSave}>Save</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
