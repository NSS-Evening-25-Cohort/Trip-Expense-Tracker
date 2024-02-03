/* eslint-disable react/prop-types */
import React from 'react';
import {
  businessIcon,
  flightIcon,
  foodIcon,
  carIcon,
  lodgingIcon,
}
  from '../public/icons';

export default function ExpenseCard({ expenseObj }) {
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
          {expenseObj.categories.map((category) => (
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
        <p className="card-text">{expenseObj.description}</p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '3%',
          justifyContent: 'flex-start',
          padding: '4%',
        }}
      >
        <button type="button" className="btn btn-secondary">
          Edit
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
