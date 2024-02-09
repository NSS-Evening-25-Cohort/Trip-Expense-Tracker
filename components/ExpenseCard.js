/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import {
  businessIcon,
  flightIcon,
  foodIcon,
  carIcon,
  lodgingIcon,
}
  from '../public/icons';
import { deleteExpense } from '../api/expense';

export default function ExpenseCard({ expenseObj, refreshTrip }) {
  const baseArray = expenseObj?.description;
  const [description, cats] = baseArray.split('Y&@P');
  const wrappedCats = `[${cats}]`;
  const catsArray = JSON.parse(wrappedCats);
  const catArrFiltered = catsArray.filter((cat) => cat.checked);
  const router = useRouter();

  return (
    <div className="card" style={{ width: '18rem', marginBottom: '2%' }}>
      {/* --------card--header----------- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyContent: 'right',
          whiteSpace: 'nowrap',
        }}
        className="card-header"
      >
        <div> {expenseObj.name}</div>
        <div
          style={{
            display: 'flex',
            gap: '5%',
            justifyContent: 'flex-end',
          }}
        >
          {catArrFiltered.map((category) => (
            <div key={category.id} style={{ textAlign: 'right' }}>
              {category.name === 'business' && businessIcon}
              {category.name === 'flights' && flightIcon}
              {category.name === 'dining' && foodIcon}
              {category.name === 'rentalCar' && carIcon}
              {category.name === 'lodging' && lodgingIcon}
            </div>
          ))}
        </div>
      </div>
      {/* ------card--body--------------- */}
      <div className="card-body">
        <p className="card-text" style={{ height: '150' }}>
          <i>{expenseObj.date}</i>
        </p>
        <h5 className="card-title">${expenseObj.amount}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '3%',
          justifyContent: 'flex-start',
          padding: '4%',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            router.push({
              pathname: `/expense/edit/${expenseObj.id}`,
              query: {
                param1: `${expenseObj.tripId}`,
              },
            });
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure you would like to delete this expense')) {
              deleteExpense(expenseObj.id)
                .then(() => { refreshTrip(); });
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
