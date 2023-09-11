import { useState, useEffect, useRef } from "react";
import { mapStyles } from "./map-settings";
import { generateInfoWindowContent } from "./utils";
import CustomAutocomplete from "../custom-autocomplete/custom-autocomplete";

function MyMapComponent({ center, zoom, markers }) {
  const ref = useRef();
  const [ map, setMap ] = useState();
  const [ mapMarkers, setMapMarkers ] = useState();

  const initMap = () => {
    let currentInfoWindow = null;

    // Creates map
    const mapConfig= {
      center,
      zoom,
      styles: mapStyles,
      mapTypeControl: false
    };

    const map = new window.google.maps.Map(ref.current, mapConfig);
    setMap(map);

    const searchBar = document.getElementById('search-bar');
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(searchBar);

    // current user position (shipping address)
    new window.google.maps.Marker({
      position: center,
      map: map,
      title: 'Your Location',
      icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
    });

    map.setCenter(center);

    map.addListener('click', () => {
      if (currentInfoWindow)
        currentInfoWindow.close();
    });

    // Creates map markers
    const mapMarkers = markers.map((marker) => {
      return new window.google.maps.Marker({
        position: marker.position,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
        map,
        title: marker.title,
        description: marker.description
      });
    })

    setMapMarkers(mapMarkers);

    // Creates an infoWindow for each marker
    mapMarkers.forEach((marker) => {
      marker.addListener('click', () => {
        // Exists if an infoWindow is opened
        if (currentInfoWindow) currentInfoWindow.close();

        // Creates infoWindow
        const infoWindow = new window.google.maps.InfoWindow();
        // Creates custom content to infoWindow
        const content = generateInfoWindowContent(marker)
        // Add custom content to infoWindow
        infoWindow.setContent(content);

        infoWindow.open({ anchor: marker, map });
        currentInfoWindow = infoWindow;
      });
    });
  };

  useEffect(() => {
    window.initMap = initMap();
  }, []);

  const handleCenterMap = () => {
    map.setCenter(center);
  };

  const showSelectedSuggestion = (marker) => {
    const selectedMarker = mapMarkers.find((mMarker) => mMarker.title === marker.title);
    map.setCenter(selectedMarker.position);
    window.google.maps.event.trigger(selectedMarker, 'click');
  };
  
  return (
    <>
      <div id="search-bar">
        <CustomAutocomplete
          map={map}
          markers={markers}
          showSelectedSuggestion={showSelectedSuggestion}
          centerMap={handleCenterMap}/>
      </div>
      <div style={{ height: 600 }} ref={ref} id="map" />
    </>
  );
};

export default MyMapComponent;
