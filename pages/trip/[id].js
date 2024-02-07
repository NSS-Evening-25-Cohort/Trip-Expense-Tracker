// THIS PAGE IS FOR THE TRIP DETAILS VIEW
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ExpenseCard from '../../components/ExpenseCard';
import TripCard from '../../components/TripCard';
import { getSingleTrip, updateTrip } from '../../api/trip';

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
  const [refreshTrip, setRefreshTrip] = useState(0);

  useEffect(() => {
    getSingleTrip(id).then((tripData) => {
      const tripCopy = tripData;
      const expenses = tripData.expense_details;
      const updatedExpenses = expenses.map((item) => ({
        ...item,
        tripId: id,
      }));
      tripCopy.expense_details = updatedExpenses;
      setTrip(tripCopy);
      const totalCalcArray = tripData.expense_details
        .map((expense) => Number(expense.amount))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setTotalAmount(totalCalcArray);
    });
  }, [id, refreshTrip]);

  const handleClick = () => {
    router.push(`/expense/new/${trip.id}`);
  };

  const changeRefreshTrip = () => {
    setRefreshTrip((prevVal) => prevVal + 1);
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
        <div id="header" style={{ textAlign: 'center', marginBottom: '4%' }}>
          <h2>Your Trip:</h2>
        </div>
        <div id="tripCard" style={{ display: 'flex', justifyContent: 'center' }}>
          <TripCard tripObj={trip} viewTrip={false} amount={totalAmount} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClick}
          style={{ marginBottom: '4%' }}
        >
          {trip.expense_details.length === 0 ? 'Add your first expense' : 'Add an Expense'}
        </button>
        {/* -----------expsense--cards------ */}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trip.expense_details.map((item, index) => (
          <ExpenseCard
            key={item.id}
            expenseObj={item}
            refreshTrip={changeRefreshTrip}
          />
        ))}
      </div>
    </>
  );
}
