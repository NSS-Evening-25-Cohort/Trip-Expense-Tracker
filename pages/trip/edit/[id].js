//  *************** THIS FILE IS FOR EDITING A TRIP *****************

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrip } from '../../../api/trip';
import TripForm from '../../../components/TripForm';

export default function EditTrip() {
  const [editTrip, setEditTrip] = useState({ id: 0 });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTrip(id).then((data) => setEditTrip({ ...data, id: (data.id) }));
  }, [id]);

  return <TripForm tripToEdit={editTrip} />;
}
