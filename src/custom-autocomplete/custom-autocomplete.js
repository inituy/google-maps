import React, { useState } from 'react';
import './custom-autocomplete.css';

const CustomAutocomplete = ({
  markers,
  centerMap,
  showSelectedSuggestion
}) => {
  const [query, setQuery] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

  const handleInputChange = (e) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);

    // Filter the markers based on the user's input
    const matchingMarkers = markers.filter((marker) =>
      marker.address.streetName.toLowerCase().includes(inputQuery.toLowerCase()) ||
      marker.address.zipCode.toString().includes(inputQuery.toLowerCase())
    );

    setFilteredMarkers(matchingMarkers);
  };

  const handleCenterMap = () => {
    centerMap();
  };

  const renderSuggestions = () => {
    if (!filteredMarkers.length || !query.length) return;
    return (
      <ul className="autocomplete-list">
        {filteredMarkers.map((marker) => { 
          const address = marker.address;
          const fullAddress = `${address.streetName}, ${address.city}, ${address.state}`;
          const handleShowSelectedSuggestion = () => {
            showSelectedSuggestion(marker);
            setQuery('');
          };
          return(
            <li
              className="autocomplete-item"
              onClick={handleShowSelectedSuggestion}
              key={Math.random().toString()}>
                {fullAddress}
            </li>
          )})
        }
      </ul>
    );
  };

  return (
    <div className="custom-autocomplete">
      <input
        className="autocomplete-input"
        type="text"
        placeholder="Search by vendor name, zip code or address"
        value={query}
        onChange={handleInputChange} />
      <i className="center-map-icon" onClick={handleCenterMap}/>
      {renderSuggestions()}
    </div>
  );
};

export default CustomAutocomplete;
