/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

const initialState = { name: '', date: '', description: '' };

function TripForm() {
  const [formInput, setFormInput] = useState(initialState);
  // const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form id="tripForm" onSubmit={handleSubmit}>
      <div
        style={{
          backgroundColor: 'tomato',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="text-center my-4"
      >
        <h2 style={{ marginBottom: '8%' }}>Create Trip</h2>
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
          style={{ marginBottom: '6%' }}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control"
          style={{ marginBottom: '3%' }}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-secondary">
          Submit{' '}
        </button>
      </div>
    </form>
  );
}

TripForm.propTypes = {
  obj: propTypes.shape({
    name: propTypes.string,
    date: propTypes.string,
    description: propTypes.string,
  }),
};

TripForm.defaultProps = {
  obj: {
    name: '',
    date: '',
    description: '',
  },
};

export default TripForm;
