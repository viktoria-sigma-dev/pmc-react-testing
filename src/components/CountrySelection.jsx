import React, { useState } from 'react';

export const CountrySelection = ({ onSave }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      onSave({ country: selectedCountry, state: selectedState });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <h2>Select your country:</h2>
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        {selectedCountry === 'US' && (
          <div>
            <h2>Select your state:</h2>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">Select State</option>
              <option value="CO">Colorado</option>
              <option value="OR">Oregon</option>
              <option value="LA">Los Angeles</option>
            </select>
          </div>
        )}
      </div>

      <button onClick={handleSave}>Save</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
