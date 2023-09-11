import MyMapComponent from './base-map-component';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { mockedMarkers } from './map-settings'
import './map-styles.css';

const render = (status) => {
  switch (status) {
    case Status.LOADING: return <h3>{status} ..</h3>;
    case Status.FAILURE: return <h3>{status} ..</h3>;
    case Status.SUCCESS: return <MyMapComponent />
    default:
      break;
  }
};

function MapComponent() {
  const center = { lat: -34.901, lng: -56.164 };
  const zoom = 14;

  return (
    <div>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <MyMapComponent
          center={center}
          zoom={zoom}
          markers={mockedMarkers} />
      </Wrapper>
    </div>
  );
}

export default MapComponent;
