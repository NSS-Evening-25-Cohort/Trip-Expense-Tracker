/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import TripCard from '../components/TripCard';
import { getTrips } from '../api/trip';

function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [userTrips, setUserTrips] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // Fetch user-specific trips when the user is authenticated
    if (user) {
      getTrips(user.id).then((data) => {
        if (Array.isArray(data)) {
          setUserTrips(data);
        }
      });
    }
  }, [user, refresh]);

  const handleAddNewTrip = () => {
    router.push('/trip/new');
  };

  const refreshHomePage = () => {
    setRefresh((prevVal) => prevVal + 1);
  };

  return (
    <>
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
        <div>
          <h1 style={{ textAlign: 'center', marginBottom: '4%' }}>Hello {user?.fbUser.displayName}! </h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddNewTrip}
          >
            {userTrips.length > 0 ? 'Add a New Trip' : 'Add your first trip...'}
          </button>
        </div>
      </div>
      <div id="card-display">
        {userTrips.map((trip) => (
          <div
            key={trip.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2%',
            }}
          >
            <TripCard
              tripObj={trip}
              viewTrip
              updateHome={refreshHomePage}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
