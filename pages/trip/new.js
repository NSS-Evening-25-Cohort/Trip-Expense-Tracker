// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
import TripForm from '../../components/TripForm';

export default function NewTrip() {
  const router = useRouter();
  const { id } = router.query;

  return <TripForm />;
}
