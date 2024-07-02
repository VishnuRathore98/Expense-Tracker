import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput({ expenses }) {
  return (
    <>
      <ExpensesSummary />
      <ExpensesList />
    </>
  );
}
