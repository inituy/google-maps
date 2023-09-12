import { useState, useEffect, useRef } from "react";
import CustomAutocomplete from "../custom-autocomplete/custom-autocomplete";
import {
  createCustomMap,
  createCurrentPositionMarker,
  createCustomMarkers,
  createCustomInfoWindowForMarker
} from "./map-helpers";

function MyMapComponent({ center, zoom, markers }) {
  const ref = useRef();
  const [ map, setMap ] = useState();
  const [ mapMarkers, setMapMarkers ] = useState([]);

  const initMap = () => {
    const map = createCustomMap(ref, center, zoom);
    setMap(map);

    // Injects the search bar into the map
    const searchBar = document.getElementById('search-bar');
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(searchBar);

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

  const handleCenterMap = () => {
    map.setCenter(center);
    map.setZoom(zoom);
  };

  const showSelectedSuggestion = (marker) => {
    const selectedMarker = mapMarkers.find((mMarker) => mMarker.title === marker.title);
    map.setCenter(selectedMarker.position);
    map.setZoom(zoom);
    window.google.maps.event.trigger(selectedMarker, 'click');
  };

  return (
    <section className="map-parent">
      <div id="search-bar">
        <CustomAutocomplete
          markers={markers}
          showSelectedSuggestion={showSelectedSuggestion}
          centerMap={handleCenterMap}/>
      </div>
      <div className="map-container">
        <div ref={ref} id="map" />
      </div>
    </section>
  );
};

export default MyMapComponent;
