// library imports

import { useBudget } from "../context/BudegtContext";
import { IBudgetContext, budget } from "../context/type";

// helper functions
export const calculateSpentByBudget = (budgetId: any, expenses: any) => {
  const budgetSpent = expenses?.reduce((acc: any, expense: any) => {
    console.log(budgetId, expense?.newExpenseBudget);
    // check if expense.id === budgetId I passed in
    if (expense?.newExpenseBudget !== budgetId) return acc;

    // add the current amount to my total
    return (acc += Number(expense.newExpenseAmount));
  }, 0);
  return budgetSpent;
};

const BudgetItem = ({ budget }: { budget: budget }) => {
  const { id, name, amount } = budget;
  const { expenceList } = useBudget() as IBudgetContext;
  const spent = calculateSpentByBudget(id, expenceList);
  console.log(">>>>>>>", (100 / amount) * spent);

  return (
    <div className="w-[40%] mt-6 shadow-lg p-3 ">
      <div className="flex felx-row justify-between">
        <h3 className="text-red-700">{name}</h3>
        <p className="text-red-700">{amount} Budgeted</p>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">
          Flowbite
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {(100 / amount) * spent}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(100 / amount) * spent}%` }}
        ></div>
      </div>
      <div className="flex flex-row justify-between">
        <small>{spent} spent</small>
        <small>{amount - spent} remaining</small>
      </div>
      {/* {showDelete ? ( */}
      <div className="flex-sm">
        <button type="submit" className="btn">
          <span>Delete Budget</span>
          {/* <TrashIcon width={20} /> */}
        </button>
      </div>
      {/* ) : (
        <div className="flex-sm"> */}
      {/* <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link> */}
      {/* </div>
      )} */}
    </div>
  );
};
export default BudgetItem;
