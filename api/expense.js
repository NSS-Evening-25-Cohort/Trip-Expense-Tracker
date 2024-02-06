import { clientCredentials } from '../utils/client';

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

const addCategory = (expenseId, catId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${expenseId}/add_expense_category/${catId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const addCategory = (expenseId, catId)
// => fetch(`${clientCredentials.databaseURL}/expenses/${expenseId}/add_expense_category/${catId}`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }).then((response) => response.json());

// const createExpenseCat = (payload, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/expense_category_view`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

export {
  createNewExpense, addCategory,
  //  createExpenseCat
};
