export type budget = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  createdAt: number;
  amount: number;
};

export type expence = {
  newExpense: string;
  newExpenseAmount: number;
  newExpenseBudget: number;
  id: `${string}-${string}-${string}-${string}-${string}`;
  createdAt: number;
};

export interface IBudgetState {
  budgetList: budget[];
  expenceList: expence[];
}

export enum BudgetActionKind {
  BUDGET_CREATED,
  EXPENCE_CREATED,
  DELETE_EXPENCE,
  EDIT_EXPENCE,
}

export type createBudget = {
  type: BudgetActionKind.BUDGET_CREATED;
  payload: budget;
};
export type createExpence = {
  type: BudgetActionKind.EXPENCE_CREATED;
  payload: expence;
};
export type deleteExpence = {
  type: BudgetActionKind.DELETE_EXPENCE;
  payload: string;
};
export type editExpence = {
  type: BudgetActionKind.EDIT_EXPENCE;
  payload: { id: string; newExpenseAmount: number };
};

export interface IBudgetContext {
  createBudget: (value: { newBudget: string; newBudgetAmount: number }) => void;
  budgetList: budget[];
  createExpence: (value: {
    newExpense: string;
    newExpenseAmount: number;
    newExpenseBudget: number;
  }) => void;
  expenceList: expence[];
  deleteExpence: (id: string) => void;
  editExpence: (value: { id: string; newExpenseAmount: number }) => void;
}
