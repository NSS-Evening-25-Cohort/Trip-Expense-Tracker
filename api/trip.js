import { clientCredentials } from '../utils/client';

// GET USER TRIPS
const getTrips = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userId}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET SINGLE TRIP
const getSingleTrip = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips/${id}`)
    .then((response) => response.json())
    .then(resolve)
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

// UPDATE Trip
const updateTrip = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// DELETE TRIP
const deleteTrip = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/trips/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

export {
  getTrips,
  getSingleTrip,
  createNewTrip,
  updateTrip,
  deleteTrip,
};
