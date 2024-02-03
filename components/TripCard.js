import React from 'react';
import PropTypes from 'prop-types';

function TripCard({ trip }) {
  return (
    <div
      className="card"
      style={{
        width: '700px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="card-header">
        <div>
          <h5 style={{ margin: 'none' }}>{trip.name}</h5>
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
            {/* Total: ${totalAmount.toLocaleString()} */}
          </h6>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{trip.date}</h5>
        <p className="card-text">{trip.description}</p>
        <button type="button" href="#" className="btn btn-secondary">
          Edit Trip
        </button>
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
