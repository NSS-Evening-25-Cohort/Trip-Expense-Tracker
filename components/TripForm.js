/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createNewTrip, updateTrip } from '../api/trip';

const initialState = {
  name: '',
  date: '',
  description: '',
};

function TripForm({ tripToEdit }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  // Sets initial form values when in edit mode
  useEffect(() => {
    if (tripToEdit) {
      setFormInput({
        name: tripToEdit.name || '',
        date: tripToEdit.date || '',
        description: tripToEdit.description || '',
      });
    }
  }, [tripToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = tripToEdit ? updateTrip : createNewTrip;
    // const dateFormatted = new Date(formInput.date);
    // formInput.date = dateFormatted;
    action({ ...formInput, userId: user.id, id: tripToEdit?.id })
      .then((tripData) => {
        if (tripToEdit) { router.push(`/trip/${tripToEdit.id}`); } else {
          router.push(`/trip/${tripData.id}`);
        }
      });
  };

  const formTitle = tripToEdit ? 'Update Trip' : 'Create Trip';

  return (
    <form id="tripForm" onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="text-center my-4"
      >
        <h2 style={{ marginBottom: '8%' }}>{formTitle}</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.name}
          onChange={handleChange}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.date}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{ marginBottom: '4%' }}
          className="btn btn-secondary"
        >
          {formTitle}
        </button>
      </div>
    </form>
  );
}

TripForm.propTypes = {
  tripToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }),
};

TripForm.defaultProps = {
  tripToEdit: null,
};

export default TripForm;
