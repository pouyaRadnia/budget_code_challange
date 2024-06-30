import { useForm } from "react-hook-form";
import { IBudgetContext } from "../context/type";
import { ADD_BUDGET } from "../types/addBudgetType";
import { useBudget } from "../context/BudegtContext";

const AddBudgetForm = () => {
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<ADD_BUDGET>();
  const { createBudget } = useBudget() as IBudgetContext;
  const submit = (value: ADD_BUDGET) => {
    createBudget(value);
    reset();
  };

  return (
    <div className="shadow-2xl p-10 w-[40%]">
      <h2 className="text-left">Create budget</h2>
      <form
        className="flex flex-col gap-4 mt-3"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="newBudget" className="text-left">
            Budget Name
          </label>
          <input
            type="text"
            // name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            className="border p-2 rounded"
            {...register("newBudget", {
              required: "Required field",
            })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="newBudgetAmount" className="text-left">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
            className="border p-2 rounded"
            {...register("newBudgetAmount", {
              required: "Required field",
            })}
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark">
          <>
            <span>Create budget</span>
          </>
        </button>
      </form>
    </div>
  );
};
export default AddBudgetForm;
