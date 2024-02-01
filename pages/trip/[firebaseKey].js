import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  businessIcon, foodIcon, lodgingIcon, carIcon, flightIcon,
} from '../../public/icons';

const expenses = [
  {
    name: 'Dinner at Fancytown',
    amount: 23.5,
    description: 'It was good',
    date: '11-05-24',
    categories: ['business', 'dining'],
  },
  {
    name: 'Flight to Florida',
    amount: 400.5,
    description: 'It was long',
    date: '11-03-24',
    categories: ['business', 'flights'],
  },
  {
    name: 'Hilton Hotel',
    amount: 2500,
    description: 'It was nice',
    date: '11-03-24',
    categories: ['business', 'lodging'],
  },
  {
    name: 'Rental Car',
    amount: 250,
    description: 'Hertz Rental',
    date: '11-03-24',
    categories: ['business', 'rentalCar'],
  },
  {
    name: 'Lunch',
    amount: 40,
    description: 'hamburger spot',
    date: '11-04-24',
    categories: ['business', 'dining'],
  },
];

const trip = {
  name: 'Business Trip to Florida',
  description: 'Went to golf with the boss',
  date: '11-20-24',
};

export default function ViewTrip() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [expenseArr, setExpenseArr] = useState(expenses);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => { // initial component mount
    const totalCalc = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalAmount((prevValue) => totalCalc);
  }, []);

  return (
    <div>
      {/* ------------trip--card---------------------------------- */}
      <div className="card" style={{ marginBottom: '4%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="card-header">
          <div>
            <h5>{trip.name}</h5>
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
              Total: ${totalAmount.toLocaleString()}
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

      {/* // ----------expense--cards------------ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {expenseArr.map((item) => (
          <div className="card" style={{ width: '18rem' }}>
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
              <div> {item.name}</div>
              <div style={{
                display: 'flex',
                gap: '5%',
                justifyContent: 'flex-end',
              }}
              >
                {item.categories.map((category) => (
                  <div style={{ textAlign: 'right' }}>
                    {category === 'business' && businessIcon}
                    {category === 'flights' && flightIcon}
                    {category === 'dining' && foodIcon}
                    {category === 'rentalCar' && carIcon}
                    {category === 'lodging' && lodgingIcon}
                  </div>
                ))}
              </div>
            </div>
            {/* ------card--body--------------- */}
            <div className="card-body">
              <p className="card-text" style={{ height: '150' }}>
                <i>{item.date}</i>
              </p>
              <h5 className="card-title">${item.amount}</h5>
              <p className="card-text">{item.description}</p>

            </div>
            <div style={{
              display: 'flex', gap: '3%', justifyContent: 'flex-start', padding: '4%',
            }}
            >
              <button type="button" className="btn btn-secondary">Edit</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
