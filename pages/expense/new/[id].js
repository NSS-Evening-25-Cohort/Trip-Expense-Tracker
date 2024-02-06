import { useRouter } from 'next/router';
import ExpenseForm from '../../../components/ExpenseForm';

export default function NewExpense() {
  const router = useRouter();
  const { id } = router.query;

  return <ExpenseForm />;
}
