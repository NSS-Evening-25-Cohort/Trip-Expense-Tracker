/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  businessIcon, carIcon, flightIcon, foodIcon, lodgingIcon,
} from '../public/icons';
import { createNewExpense, updateExpense } from '../api/expense';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  amount: '',
  description: '',
  date: '',
};

const initialCats = [
  { id: 1, name: 'dining', checked: false },
  { id: 2, name: 'business', checked: false },
  { id: 3, name: 'flights', checked: false },
  { id: 4, name: 'rentalCar', checked: false },
  { id: 5, name: 'lodging', checked: false },
];

export default function ExpenseForm({ tripId, expenseObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [cats, setCats] = useState(initialCats);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (expenseObj?.description) {
      const baseArray = expenseObj.description;
      const [description, catsData] = baseArray.split('Y&@P');
      const wrappedCats = `[${catsData}]`;
      const catsArray = JSON.parse(wrappedCats);
      setCats(catsArray);
      setFormInput({ ...expenseObj, description });
    }
  }, [expenseObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleCheck = (e, index) => {
    const { target: { checked } } = e;
    setCats((prevValue) => {
      const newArray = [...prevValue];
      newArray[index] = { ...newArray[index], checked };
      return newArray;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount } = formInput;
    const numAmount = Number(amount);
    const formattedNum = numAmount.toFixed(2);
    formInput.amount = formattedNum;
    const catString = cats.map((cat) => JSON.stringify(cat));
    const catString2 = catString.toString();
    const formattedDesc = `${formInput.description}Y&@P${catString2}`;
    formInput.description = formattedDesc;
    const payload = { ...formInput, trip: tripId, user: user.id };
    if (!expenseObj.description) {
      createNewExpense(payload).then(() => {
        router.push(`/trip/${tripId}`);
      });
    } else {
      const updatePayload = {
        id: expenseObj.id,
        name: formInput.name,
        amount: formInput.amount,
        description: formInput.description,
        date: formInput.date,
        trip: Number(expenseObj.tripId),
        user: user.id,
      };
      updateExpense(updatePayload, user.id).then((data) => {
        router.push(`/trip/${expenseObj.tripId}`);
      });
    }
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
        <h2 style={{ marginBottom: '8%' }}>{expenseObj.description ? 'Update Expense' : 'Create Expense'}</h2>
        <label htmlFor="amount">Name</label>
        <input
          type="name"
          name="name"
          id="name"
          className="form-control"
          style={{ marginBottom: '3%' }}
          value={formInput.name}
          onChange={handleChange}
          autoComplete="off"
          maxLength={23}
        />
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
              {cats.map((item, index) => (
                <div className="form-check" key={`category${index}`}>
                  <input
                    className="form-check-input"
                    key={`input${index}`}
                    type="checkbox"
                    checked={item.checked}
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
  tripId: PropTypes.number,
  expenseObj: PropTypes.shape({
    description: PropTypes.string,
  }),
};

ExpenseForm.defaultProps = {
  expenseObj: {
    id: 0,
  },
  tripId: undefined,
};
