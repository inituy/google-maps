import { useState, useEffect, useRef } from "react";
import CustomAutocomplete from "../custom-autocomplete/custom-autocomplete";
import {
  createCustomMap,
  createCurrentPositionMarker,
  createCustomMarkers,
  createCustomInfoWindowForMarker,
  injectCustomElement,
  isInFullScreenMode
} from "./map-helpers";

function MyMapComponent({ center, zoom, markers }) {
  const ref = useRef();
  const [ map, setMap ] = useState();
  const [ mapMarkers, setMapMarkers ] = useState([]);
  const [ showFiltersButton, setShowFiltersButton ] = useState(false);

  const initMap = () => {
    const map = createCustomMap(ref, center, zoom);
    setMap(map);
    // Injects the search bar and filters button into the map
    injectCustomElement(map, 'search-bar-and-filter-btn-container', 'TOP_CENTER');
    // current user position
    createCurrentPositionMarker(map, center);
    // current custom markers
    const mapMarkers = createCustomMarkers(map, markers);
    setMapMarkers(mapMarkers);
    // current custom infoWindows
    createCustomInfoWindowForMarker(map, mapMarkers);
  };

  useEffect(() => {
    window.initMap = initMap();
  }, []);

  useEffect(() => {
    // Function to handle full-screen change
    const handleFullScreenChange = () => {
      const isFullScreen = isInFullScreenMode();
      if (isFullScreen)
        setShowFiltersButton(true);
      else
        setShowFiltersButton(false);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange); // Firefox
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange); // Chrome, Safari, and Opera
    document.addEventListener('msfullscreenchange', handleFullScreenChange); // IE/Edge

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);


  const handleCenterMap = () => {
    map.setCenter(center);
    map.setZoom(zoom);
  };

  const showSelectedSuggestion = (marker) => {
    const selectedMarker = mapMarkers.find((mMarker) => mMarker.title === marker.title);
    map.setCenter(selectedMarker.getPosition());
    map.setZoom(zoom);
    window.google.maps.event.trigger(selectedMarker, 'click');
  };


  const renderShowFiltersButton = () => {
    if (!showFiltersButton) return;
    return (
      <button
        id="filters-btn"
        onClick={() => console.log("Show filters now")}
        type="text">
          Hola
      </button>
    );
  };

  return (
    <section className="map-parent">
      <div id="search-bar-and-filter-btn-container">
        <CustomAutocomplete
          markers={markers}
          showSelectedSuggestion={showSelectedSuggestion}
          centerMap={handleCenterMap}/>
        {renderShowFiltersButton()}
      </div>
      <div className="map-container">
        <div ref={ref} id="map" />
      </div>
    </section>
  );
};

export default MyMapComponent;
