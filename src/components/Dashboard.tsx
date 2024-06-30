import { useBudget } from "../context/BudegtContext";
import { IBudgetContext } from "../context/type";
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpence";
import BudgetItem from "./BudgetItem";
import Table from "./Table";

export const Dashboard = () => {
  const { budgetList, expenceList } = useBudget() as IBudgetContext;
  return (
    <>
      <div className="flex flex-row justify-between py-5">
        <AddBudgetForm />

        {budgetList.length !== 0 && <AddExpenseForm />}
      </div>
      <div className="flex flex-row gap-5 flex-wrap w-full mt-10 justify-between">
        {budgetList?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>
      <div className="mt-5">
        <Table expenses={expenceList} />
      </div>
    </>
  );
};
