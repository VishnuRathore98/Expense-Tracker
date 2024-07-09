import axios from "axios";

const FIREBASE_URL =
  "";

export async function getExpenses() {
  const response = await axios.get(FIREBASE_URL + "expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const responseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(responseObj);
  }

  return expenses;
}

export async function addExpense(expenseData) {
  const response = await axios.post(
    FIREBASE_URL + "expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function updateExpense(id, expenseData) {
  await axios.put(FIREBASE_URL + `expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  await axios.delete(FIREBASE_URL + `expenses/${id}.json`);
}
