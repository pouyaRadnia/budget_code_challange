import { expence } from "../context/type";
import ExpenseItem from "./ExpenceItem";

const Table = ({ expenses }: { expenses: expence[] }) => {
  console.log(expenses);
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="flex flex-row  p-3 m-4">
            {["Name", "Amount", "Date", "Budget", "delete"].map((i, index) => (
              <th className="w-[20%]" key={index}>
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: expence) => (
            <tr className="flex flex-row  p-3 m-4" key={expense.id}>
              <ExpenseItem expense={expense} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
