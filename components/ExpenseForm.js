/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  businessIcon, carIcon, flightIcon, foodIcon, lodgingIcon,
} from '../public/icons';

const initialState = {
  amount: '',
  description: '',
  date: '',
  categories: [
    { name: 'business', checked: 'false' },
    { name: 'flights', checked: 'false' },
    { name: 'dining', checked: 'false' },
    { name: 'rentalCar', checked: 'false' },
    { name: 'lodging', checked: 'false' },
  ],
};

export default function ExpenseForm({ tripId }) {
  const [formInput, setFormInput] = useState(initialState);
  // const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleCheck = (e, index) => {
    const { target: { checked } } = e;
    setFormInput((prevValue) => {
      const newArray = [...prevValue.categories]; // Copy the categories array
      newArray[index] = { ...newArray[index], checked }; // Update the specific item at the index
      return { ...prevValue, categories: newArray }; // Return the updated formInput
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (

    <form id="expenseForm" onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="text-center my-4"
      >
        <h2 style={{ marginBottom: '8%' }}>Create Expense</h2>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.amount}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.description}
          onChange={handleChange}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          className="form-control"
          style={{ marginBottom: '6%' }}
          value={formInput.date}
          onChange={handleChange}
        />

        <div className="card" style={{ width: '18rem', marginBottom: '6%' }}>
          <div className="card-body">
            <h5 className="card-title">Assign a Category</h5>
            <div className="card-text">
              {formInput.categories.map((item, index) => (
                <div className="form-check" key={`category${index}`}>
                  <input
                    className="form-check-input"
                    key={`input${index}`}
                    type="checkbox"
                    value=""
                    id={`item${index}`}
                    onChange={(e) => {
                      handleCheck(e, index);
                    }}
                  />
                  <label
                    key={`label${index}`}
                    className="form-check-label"
                    htmlFor={`item${index}`}
                  >
                    {item.name === 'business' && (
                      <div key={item.name}>
                        {businessIcon}{' '}
                        Business
                      </div>
                    )}
                    {item.name === 'flights' && (
                      <div key={item.name}>
                        {flightIcon}{' '}
                        Flights
                      </div>
                    )}
                    {item.name === 'dining' && (
                      <div key={item.name}>
                        {foodIcon}{' '}
                        Dining
                      </div>
                    )}
                    {item.name === 'rentalCar' && (
                      <div key={item.name}>
                        {carIcon}{' '}
                        Rental Car
                      </div>
                    )}
                    {item.name === 'lodging' && (
                      <div key={item.name}>
                        {lodgingIcon}{' '}
                        Lodging
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit{' '}
        </button>
      </div>
    </form>
  );
}

ExpenseForm.propTypes = {
  tripId: PropTypes.string.isRequired,
};
