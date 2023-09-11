const mockedMarkers = [
  {
    position: { lat: -34.906, lng: -56.164 },
    address: {
      streetName: "General Artigas 1233",
      zipCode: 11200,
      city: "Montevideo"
    },
    title: "Pepe",
    description: "Good, description"
  },
  {
    position: { lat: -34.901, lng: -56.159 },
    address: {
      streetName: "Doctor Enrique Pouey 2588",
      zipCode: 11600,
      city: "Montevideo"
    },
    title: "Chao",
    description: "Not weird description"
  },
  {
    position: { lat: -34.910, lng: -56.159 },
    address: {
      streetName: "El Viejo Pancho 2511",
      zipCode: 11300,
      city: "Montevideo"
    },
    title: "Chi",
    description: "Weird description"
  }
];

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  //{
  //  featureType: "road",
  //  elementType: "labels",
  //  stylers: [{ visibility: "off" }],
  //},
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export {
  mockedMarkers,
  mapStyles
}
