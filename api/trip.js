import { clientCredentials } from '../utils/client';

// GET USER TRIPS
const getTrips = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE TRIP
const createNewTrip = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { createNewTrip, getTrips };
