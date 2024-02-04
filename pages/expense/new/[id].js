import React from 'react';
import { useRouter } from 'next/router';
import ExpenseForm from '../../../components/ExpenseForm';

export default function AddAnExpensePage() {
  const router = useRouter();
  const { id } = router.query;

  return (<ExpenseForm tripId={id} />);
}
