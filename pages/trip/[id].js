// THIS PAGE IS FOR THE TRIP DETAILS VIEW
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ExpenseCard from '../../components/ExpenseCard';
import TripCard from '../../components/TripCard';
import { getSingleTrip } from '../../api/trip';

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
