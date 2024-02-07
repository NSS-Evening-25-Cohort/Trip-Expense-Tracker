import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ExpenseForm from '../../../components/ExpenseForm';
import { getSingleExpense } from '../../../api/expense';

export default function EditExpense() {
  const [expenseObj, setExpenseObj] = useState({ id: 0 });
  const router = useRouter();
  const { id } = router.query;
  const { param1 } = router.query;

  useEffect(() => {
    getSingleExpense(id).then((data) => {
      setExpenseObj({ ...data, id: (data.id), tripId: param1 });
    });
  }, [id, param1]);

  return <ExpenseForm expenseObj={expenseObj} />;

//   return <>{ id }</>;
}
