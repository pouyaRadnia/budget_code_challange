import { useBudget } from "../context/BudegtContext";
import { IBudgetContext } from "../context/type";
import { useForm } from "react-hook-form";
import { ADD_EXPENCE } from "../types/addBudgetType";

// rrd imports

// library imports

const AddExpenseForm = () => {
  const { budgetList } = useBudget() as IBudgetContext;
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<ADD_EXPENCE>();
  const { createExpence } = useBudget() as IBudgetContext;
  const submit = (value: ADD_EXPENCE) => {
    createExpence(value);
    reset();
  };
  return (
    <div className="shadow-2xl  p-10 w-[40%]">
      <h2 className="text-left">
        Add New{" "}
        <span className="accent">
          {budgetList.length === 1 && `${budgetList.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <form
        className="flex flex-col gap-4 mt-3"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[40%]">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              id="newExpense"
              placeholder="e.g., Coffee"
              className="border p-2 rounded "
              required
              {...register("newExpense", {
                required: "Required field",
              })}
            />
          </div>
          <div className="flex flex-col gap-3 w-[40%]">
            <label htmlFor="newExpenseAmount" className="text-left">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              id="newExpenseAmount"
              className="border p-2 rounded "
              placeholder="e.g., 3.50"
              required
              {...register("newExpenseAmount", {
                required: "Required field",
              })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2" hidden={budgetList.length === 1}>
          <label className="text-left" htmlFor="newExpenseBudget">
            Budget Category
          </label>
          <select
            id="newExpenseBudget"
            required
            className="border p-2 rounded "
            {...register("newExpenseBudget", {
              required: "Required field",
            })}
          >
            {budgetList
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark">
          <>
            <span>Add Expense</span>
          </>
        </button>
      </form>
    </div>
  );
};
export default AddExpenseForm;
