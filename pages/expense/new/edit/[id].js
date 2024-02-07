// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleTrip } from '../../../api/trip';
// import ExpenseForm from '../../../../components/ExpenseForm';

// export default function EditTrip() {
//   const [editTrip, setEditTrip] = useState({ id: 0 });
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     getSingleExpense(id).then((data) => setEditTrip({ ...data, id: (data.id) }));
//   }, [id]);

//   return <ExpenseForm expToEdit={expenseObj} />;
// }
