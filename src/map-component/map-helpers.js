import { mapStyles } from "./map-settings";
import createCustomInfoWindowComponent from "../custom-infowindow/custom-infowindow";

let currentInfoWindow = null;

const createCustomMap = (ref, center, zoom) => {
  const mapConfig= {
    center,
    zoom,
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.TOP_RIGHT
    }
  };

  const map = new window.google.maps.Map(ref.current, mapConfig);

  map.addListener('click', () => {
    if (currentInfoWindow)
      currentInfoWindow.close();
  });

  map.setCenter(center);
  return map;
};

const createCurrentPositionMarker = (map, center) => {
  new window.google.maps.Marker({
    position: center,
    map: map,
    title: 'Your Location',
    icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
  });
};

const createCustomMarkers = (map, markers) => {
  const mapMarkers = markers.map((marker) => {
    const address = marker.address;
    const fullAddress = `${address.streetName}, ${address.city}, ${address.state}`;
    return new window.google.maps.Marker({
      position: marker.position,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
      map,
      title: marker.title,
      address: fullAddress,
      category: marker.category,
      description: marker.description,
      markerDetails: marker
    });
  })
  return mapMarkers;
};

const createCustomInfoWindowForMarker = (map, markers) => {
  markers.forEach((marker) => {
    const handleClickPay = () => {
      console.log('Selected ', marker.title);
    };
    const handleClickDetails = () => {
      console.log('Showing details for: ', marker.markerDetails);
    }
    marker.addListener('click', () => {
      // Exists if an infoWindow is opened
      if (currentInfoWindow) currentInfoWindow.close();

      // Creates infoWindow
      const infoWindow = new window.google.maps.InfoWindow();
      // Creates custom content to infoWindow
      const content = createCustomInfoWindowComponent(
        marker,
        handleClickPay,
        handleClickDetails
      );
      // Add custom content to infoWindow
      infoWindow.setContent(content);

      infoWindow.open({ anchor: marker, map });
      currentInfoWindow = infoWindow;
    });
  });
};

export {
  createCustomMap,
  createCurrentPositionMarker,
  createCustomMarkers,
  createCustomInfoWindowForMarker
};
