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

  map.addListener('bounds_changed', () => {
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

const injectCustomElement = (map, elementId, position) => {
  const ControlPosition = {
    // indicates that the control should be placed along the top center of the map.
    'TOP_CENTER': window.google.maps.ControlPosition.TOP_CENTER,
    // indicates that the control should be placed along the top left of the map, with any sub-elements of the control "flowing" towards the top center.
    'TOP_LEFT': window.google.maps.ControlPosition.TOP_LEFT,
    // indicates that the control should be placed along the top right of the map, with any sub-elements of the control "flowing" towards the top center.
    'TOP_RIGHT': window.google.maps.ControlPosition.TOP_RIGHT,
    // indicates that the control should be placed along the top left of the map, but below any TOP_LEFT elements.
    'LEFT_TOP': window.google.maps.ControlPosition.LEFT_TOP,
    // indicates that the control should be placed along the top right of the map, but below any TOP_RIGHT elements.
    'RIGHT_TOP': window.google.maps.ControlPosition.RIGHT_TOP,
    // indicates that the control should be placed along the left side of the map, centered between the TOP_LEFT and BOTTOM_LEFT positions.
    'LEFT_CENTER': window.google.maps.ControlPosition.LEFT_CENTER,
    // indicates that the control should be placed along the right side of the map, centered between the TOP_RIGHT and BOTTOM_RIGHT positions.
    'RIGHT_CENTER': window.google.maps.ControlPosition.RIGHT_CENTER,
    // indicates that the control should be placed along the bottom left of the map, but above any BOTTOM_LEFT elements.
    'LEFT_BOTTOM': window.google.maps.ControlPosition.LEFT_BOTTOM,
    // indicates that the control should be placed along the bottom right of the map, but above any BOTTOM_RIGHT elements.
    'RIGHT_BOTTOM': window.google.maps.ControlPosition.RIGHT_BOTTOM,
    // indicates that the control should be placed along the bottom center of the map.
    'BOTTOM_CENTER': window.google.maps.ControlPosition.BOTTOM_CENTER,
    // indicates that the control should be placed along the bottom left of the map, with any sub-elements of the control "flowing" towards the bottom center.
    'BOTTOM_LEFT': window.google.maps.ControlPosition.BOTTOM_LEFT,
    // indicates that the control should be placed along the bottom right of the map, with any sub-elements of the control "flowing" towards the bottom center.
    'BOTTOM_RIGHT': window.google.maps.ControlPosition.BOTTOM_RIGHT,
  };

  const domElement = document.getElementById(elementId);
  map.controls[ControlPosition[position]].push(domElement);
};

const isInFullScreenMode = () => {
  return (
    !!document.fullscreenElement ||
    !!document.mozFullScreenElement ||
    !!document.webkitFullscreenElement ||
    !!document.msFullscreenElement
  )
};

export {
  createCustomMap,
  createCurrentPositionMarker,
  createCustomMarkers,
  createCustomInfoWindowForMarker,
  injectCustomElement,
  isInFullScreenMode
};
