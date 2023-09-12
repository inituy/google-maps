import ReactDOM from 'react-dom';
import './custom-infowindow.css';

function CustomInfowindow({ marker, onClickPay, onClickDetails }) {
  return (
    <div className="info-container">
      <h4 className="title">{marker.title}</h4>
      <p className="category">{marker.category}</p>
      <p className="address">{marker.address}</p>
      <div className="buttons-container">
        <button
          className="pay-btn"
          type="text"
          onClick={onClickPay}>
            Pay vendor
        </button>
        <button
          className="details-btn"
          type="text"
          onClick={onClickDetails}>
            Details
        </button>
      </div>
    </div>
  )
};

function createCustomInfoWindowComponent(marker, onClickPay, onClickDetails) {
  const container = document.createElement('div');
  ReactDOM.render(
    <CustomInfowindow
      marker={marker}
      onClickPay={onClickPay}
      onClickDetails={onClickDetails} />,
    container
  );
  // Created it this way because the Google Maps JavaScript API's setContent method
  // expects a string or a DOM element as content, not a React component.
  // To resolve this issue, we convert the React component into a DOM element
  // before setting it as the InfoWindow content.
  return container;
}

export default createCustomInfoWindowComponent;
