import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteTrip } from '../api/trip';

function TripCard({ tripObj, viewTrip, updateHome }) {
  const router = useRouter();
  console.log(tripObj);
  const handleDelete = () => {
    if (window.confirm('Are you sure you would like to delete this trip?')) {
      deleteTrip(tripObj.id)
        .then(() => {
          updateHome();
          if (!viewTrip) { router.push('/'); }
        });
    }
  };

  return (
    <div
      className="card"
      style={{
        width: '700px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="card-header">
        <div>
          <h5 style={{ margin: '0px' }}>{tripObj.name}</h5>
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
        <></>
        {viewTrip && (
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginRight: '1.5%' }}
          onClick={() => {
            router.push({
              pathname: '/trip/[id]',
              query: { id: tripObj.id },
            });
          }}
        >
          View
        </button>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginRight: '1.5%' }}
          onClick={() => {
            router.push({
              pathname: '/trip/edit/[id]',
              query: { id: tripObj.id },
            });
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

TripCard.defaultProps = {
  updateHome: () => {},
  viewTrip: PropTypes.bool,
};

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  viewTrip: PropTypes.bool,
  updateHome: PropTypes.func,
};

export default TripCard;
