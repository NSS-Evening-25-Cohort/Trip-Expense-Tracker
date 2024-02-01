import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import TripCard from '../components/TripCard';

const trips = [
  {
    uniquekey: '1',
    name: 'Business Trip to Florida',
    description: 'Went to golf with the boss',
    date: '11-20-24',
  },
  {
    uniquekey: '2',
    name: 'Family Trip to Hell...o World',
    description: 'Went to space with the family',
    date: '6-6-16',
  },
  {
    uniquekey: '3',
    name: 'Wut',
    description: 'Whys',
    date: '9-9-20',
  },
];

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const getAllTrips = () => {
    // call to API to get all trips untill then, dummyData

  };

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
        <div className="d-flex flex-wrap">
          {trips.map((trip) => (
            <TripCard key={trip.uniquekey} trip={trip} onUpdate={getAllTrips} />
          ))}
        </div>
        <p>To see the <b>View Trip Page</b> or the <b>Expense Form</b>, use &apos;/trip/1234&apos; or &apos;/AddExpense&apos; in the URL.</p>

      </div>
    </>
  );
}

export default Home;
