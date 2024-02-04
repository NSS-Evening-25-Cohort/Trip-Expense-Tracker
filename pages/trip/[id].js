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
  id: '',
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
    // initial component mount
    // const totalCalc = expenses.reduce((total, expense) => total + expense.amount, 0);
    // setTotalAmount((prevValue) => totalCalc);
  }, [id]);

  return (
    <div>
      {/* ------------trip--card---------------------------------- */}
      <div
        style={{
          marginTop: '6%',
          marginBottom: '6%',
        }}
      >
        <TripCard tripObj={trip} />
      </div>
      {/* -----------expsense--cards------ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trip.expense_details.map((item, index) => (
          <ExpenseCard key={item.id} expenseObj={item} />
        ))}
      </div>
    </div>
  );
}
