// helper imports

import { useState } from "react";
import { useBudget } from "../context/BudegtContext";
import { IBudgetContext, expence } from "../context/type";
import { TrashIcon } from "@heroicons/react/24/outline";
const ExpenseItem = ({ expense }: { expense: expence }) => {
  const { budgetList, deleteExpence, editExpence } =
    useBudget() as IBudgetContext;
  const [amount, setAmount] = useState(expense.newExpenseAmount);

  const budget = budgetList.filter(
    (item) => String(item.id) === String(expense.newExpenseBudget)
  );

  const deletHandler = () => {
    deleteExpence(expense.id);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };
  const handleEdit = () => {
    const value = {
      id: String(expense.id),
      newExpenseAmount: Number(amount),
    };
    editExpence(value);
  };
  return (
    <>
      <td className="w-[20%] text-center">{expense.newExpense}</td>
      <td className="w-[20%] text-center">
        {" "}
        <input
          type="text"
          value={amount}
          onBlur={handleEdit}
          onChange={handleChange}
          className="border rounded"
        />
      </td>
      <td className="w-[20%] text-center">{expense.createdAt}</td>

      <td className="w-[20%] text-center">
        <form>
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.newExpense} expense`}
          >
            {budget?.[0]?.name}
          </button>
        </form>
      </td>
      <td className="w-[20%] flex justify-center">
        <div className="text-center">
          <TrashIcon onClick={deletHandler} width={20} />
        </div>
      </td>
    </>
  );
};
export default ExpenseItem;
