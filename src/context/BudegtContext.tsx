import { ReactNode, createContext, useContext, useReducer } from "react";
import {
  BudgetActionKind,
  IBudgetContext,
  IBudgetState,
  budget,
  createBudget,
  createExpence,
  deleteExpence,
  editExpence,
  expence,
} from "./type";

const BudegtContext = createContext<IBudgetContext | null>(null);

const inistalState: IBudgetState = {
  budgetList: [],
  expenceList: [],
};

const reducerFn = (
  state: IBudgetState,
  action: createBudget | createExpence | deleteExpence | editExpence
) => {
  const { type } = action;
  switch (type) {
    case BudgetActionKind.BUDGET_CREATED:
      return {
        ...state,
        budgetList: state.budgetList
          ? [...state.budgetList, action.payload]
          : [],
      };
    case BudgetActionKind.EXPENCE_CREATED:
      return {
        ...state,
        expenceList: state.expenceList
          ? [...state.expenceList, action.payload]
          : [],
      };
    case BudgetActionKind.DELETE_EXPENCE:
      return {
        ...state,
        expenceList: state.expenceList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case BudgetActionKind.EDIT_EXPENCE:
      return {
        ...state,
        expenceList: state.expenceList.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, newExpenseAmount: action.payload.newExpenseAmount }
            : expense
        ),
      };
  }
};

const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [{ budgetList, expenceList }, dispatch] = useReducer(
    reducerFn,
    inistalState
  );

  const createBudget = (value: {
    newBudget: string;
    newBudgetAmount: number;
  }) => {
    const newItem: budget = {
      name: value.newBudget,
      amount: Number(value.newBudgetAmount),
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    dispatch({ type: BudgetActionKind.BUDGET_CREATED, payload: newItem });
  };
  const createExpence = (value: {
    newExpense: string;
    newExpenseAmount: number;

    newExpenseBudget: number;
  }) => {
    const newItem: expence = {
      newExpense: value.newExpense,
      newExpenseAmount: Number(value.newExpenseAmount),
      newExpenseBudget: value.newExpenseBudget,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    dispatch({ type: BudgetActionKind.EXPENCE_CREATED, payload: newItem });
  };

  const deleteExpence = (id: string) => {
    dispatch({ type: BudgetActionKind.DELETE_EXPENCE, payload: id });
  };

  const editExpence = (value: { id: string; newExpenseAmount: number }) => {
    dispatch({ type: BudgetActionKind.EDIT_EXPENCE, payload: value });
  };

  return (
    <BudegtContext.Provider
      value={
        {
          createBudget,
          budgetList,
          createExpence,
          expenceList,
          deleteExpence,
          editExpence,
        } as IBudgetContext
      }
    >
      {children}
    </BudegtContext.Provider>
  );
};

function useBudget() {
  const context = useContext(BudegtContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { useBudget, BudgetProvider };
