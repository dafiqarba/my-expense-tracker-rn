import { CategoryType, Expense } from "@/types";

export interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => Expense;
  updateExpense: (id: string, expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => Expense;
  deleteExpense: (id: string) => void;
  getTotalExpenses: () => number;
  getExpensesByCategory: () => Record<CategoryType, number>;
  refreshExpenses: () => Promise<void>;
}