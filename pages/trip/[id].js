// THIS PAGE IS FOR THE TRIP DETAILS VIEW
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ExpenseCard from '../../components/ExpenseCard';
import TripCard from '../../components/TripCard';
import { getSingleTrip } from '../../api/trip';

// const expenses = [
//   {
//     name: 'Dinner at Fancytown',
//     amount: 23.5,
//     description: 'It was good',
//     date: '11-05-24',
//     categories: [
//       { name: 'business', id: '1' },
//       { name: 'dining', id: '2' },
//     ],
//     id: 1,
//   },
//   {
//     name: 'Flight to Florida',
//     amount: 400.5,
//     description: 'It was long',
//     date: '11-03-24',
//     categories: [
//       { name: 'business', id: '1' },
//       { name: 'flights', id: '5' },
//     ],
//     id: 2,
//   },
//   {
//     name: 'Hilton Hotel',
//     amount: 2500,
//     description: 'It was nice',
//     date: '11-03-24',
//     categories: [
//       { name: 'business', id: '1' },
//       { name: 'lodging', id: '3' },
//     ],
//     id: 3,
//   },
//   {
//     name: 'Rental Car',
//     amount: 250,
//     description: 'Hertz Rental',
//     date: '11-03-24',
//     categories: [
//       { name: 'business', id: '1' },
//       { name: 'rentalCar', id: '4' },
//     ],
//     id: 4,
//   },
//   {
//     name: 'Lunch',
//     amount: 40,
//     description: 'hamburger spot',
//     date: '11-04-24',
//     categories: [
//       { name: 'business', id: '1' },
//       { name: 'dining', id: '2' },
//     ],
//     id: 5,
//   },
// ];

// const trip = {
//   name: 'Business Trip to Florida',
//   description: 'Went to golf with the boss',
//   date: '11-20-24',
// };

const initialState = {
  name: '',
  date: '',
  description: '',
  expense_details: [],
  id: 0,
  user_details: '',
};

export default function ViewTrip() {
  const router = useRouter();
  const { id } = router.query;
  //   const [expenseArr, setExpenseArr] = useState(expenses);
  const [totalAmount, setTotalAmount] = useState(0);
  const [trip, setTrip] = useState(initialState);

  useEffect(() => {
    getSingleTrip(id).then((tripData) => {
      setTrip(tripData);
    });
    // const totalCalc = expenses.reduce((total, expense) => total + expense.amount, 0);
    // setTotalAmount((prevValue) => totalCalc);
  }, [id]);

  const handleClick = () => {
    router.push(`/expense/new/${trip.id}`);
  };

  return (
    <>
      {/* ------------trip--card---------------------------------- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '4%',
          marginBottom: '4%',
        }}
      >
        <div id="header" style={{ textAlign: 'center', marginBottom: '4%' }}><h2>Your Trip:</h2></div>
        <div id="tripCard" style={{ display: 'flex', justifyContent: 'center' }}><TripCard tripObj={trip} viewTrip={false} /></div>
      </div>
      {/* -----------expsense--cards------ */}
      <div style={{ textAlign: 'center' }}>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          {trip.expense_details.length === 0 ? 'Add your first expense' : 'Add an Expense'}
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trip.expense_details.map((item, index) => (
          <ExpenseCard key={item.id} expenseObj={item} />
        ))}
      </div>
    </>
  );
}
