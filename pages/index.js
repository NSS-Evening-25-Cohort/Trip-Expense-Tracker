import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: '8%',
      }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => { router.push('/AddTrip'); }}
        >Add A New Trip
        </button>
      </div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>
        <p>{user.bio}</p>
        <p>This will be the page where we see all the trips as cards</p>
        <p>To see the <b>View Trip Page</b> or the <b>Expense Form</b>, use &apos;/trip/1234&apos; or &apos;/AddExpense&apos; in the URL.</p>

      </div>
    </>
  );
}

export default Home;
