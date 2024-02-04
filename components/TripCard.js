import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function TripCard({ tripObj }) {
  const router = useRouter();
  return (
    <div
      className="card"
      style={{
        width: '700px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="card-header">
        <div>
          <h5 style={{ margin: 'none' }}>{tripObj.name}</h5>
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
        <h5 className="card-title">{tripObj.date}</h5>
        <p className="card-text">{tripObj.description}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            router.push({
              pathname: '/trip/edit/[id]',
              query: { id: tripObj.id },
            });
          }}
        >
          Edit Trip
        </button>
      </div>
    </div>
  );
}

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default TripCard;
