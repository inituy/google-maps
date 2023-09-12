const mockedMarkers = [
  {
    position: { lat: -34.906, lng: -56.164 },
    address: {
      streetName: "General Artigas 1233",
      zipCode: 11200,
      city: "Montevideo",
      state: 'New York'
    },
    title: "New Cool Stuff",
    description: "Good, description",
    category: 'Schools'
  },
  {
    position: { lat: -34.901, lng: -56.159 },
    address: {
      streetName: "Doctor Enrique Pouey 2588",
      zipCode: 11600,
      city: "Montevideo",
      state: 'Texas'
    },
    title: "History Unboxed",
    description: "Not weird description",
    category: 'Paraprofessionals'
  },
  {
    position: { lat: -34.910, lng: -56.159 },
    address: {
      streetName: "El Viejo Pancho 2511",
      zipCode: 11300,
      city: "Montevideo",
      state: 'Florida'
    },
    title: "Advance Game Controlers",
    description: "Weird description",
    category: 'Therapists'
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
