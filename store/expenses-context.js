import { createContext, useReducer } from "react";

// The below is the structure for context
export const ExpensesContext = createContext({
  expenses: [],
  setExpenses:(expenses)=>{},
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

// Below based on the user's selection we will use the appropriate action
function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // To add a new entry we need a new id, and append the new data with the old one
      // Creating new id
      const id = new Date().toString() + Math.random().toString();
      // Creating new array by adding new and old data
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      // To update we would need to get the old data by its id and then update it with the new one
      // Find id
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      // Find data with that id
      const updatableExpense = state[updatableExpenseIndex];
      // Replace that data with new updated one
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // Create new array with old data
      const updatedExpenses = [...state];
      // Update the required item
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      // Return the updated data
      return updatedExpenses;

    case 'SET':
        const inverted = action.payload.reverse();
        return inverted;

    case "DELETE":
      // To delete data we need to find it by index and then filter out all the data except whoes id matches.
      return state.filter((expense) => expense.id !== action.payload.id);

    default:
      // If any other action is performed just return the state data.
      return state;
  }
}

// Let's see why this guy is using object destructuring for {chidren}
export default function ExpenseContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

// Below is the dummy data that we will be using
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-07-07"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-07-05"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-07-04"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-07-03"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-07-02"),
  },
];
