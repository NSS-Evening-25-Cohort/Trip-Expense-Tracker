import React from 'react';
import PropTypes from 'prop-types';

function TripCard({ trip }) {
  // const deleteThistrip = () => {
  //   if (window.confirm(`Delete ${trip.title}?`)) {
  //     deleteTrip(trip.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <div className="card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="card-header">
        <div>
          <h5>{trip && trip.name ? trip.name : 'Unnamed Trip'}</h5>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: '15%',
          }}
        >
          <h6 style={{ marginBottom: '0%', fontSize: '20px' }}>
            Total: Some Moneis spent
          </h6>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{trip.date}</h5>
        <p className="card-text">{trip.description}</p>
        {/* <a href="#" className="btn btn-secondary">
        </a> */}
        Edit Trip
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default TripCard;
