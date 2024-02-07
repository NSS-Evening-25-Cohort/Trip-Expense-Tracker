import { clientCredentials } from '../utils/client';

const getSingleExpense = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createNewExpense = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateExpense = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteExpense = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${id}`, {
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
  createNewExpense,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
