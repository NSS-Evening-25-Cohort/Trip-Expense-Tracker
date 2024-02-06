import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleExpense } from '../../../api/expense';
import ExpenseForm from '../../../components/ExpenseForm';

export default function EditExpense() {
  const [editExpense, setEditExpense] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleExpense(id).then((data) => setEditExpense({ ...data, id: String(data.id) }));
  }, [id]);

  return <ExpenseForm ExpenseToEdit={editExpense} />;
}
