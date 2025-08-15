import React, {
  JSX,
  ReactNode,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { CategoryType, Expense } from '@/types'
import { ExpenseContextType } from './ExpenseContext.type'

interface ExpenseProviderProps {
  children: ReactNode
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

const STORAGE_KEY = '@expense_tracker_data'

// Action types
type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_EXPENSES'; payload: Expense[] }
  | { type: 'SET_LOADING'; payload: boolean }

// Initial state
interface ExpenseState {
  expenses: Expense[]
  loading: boolean
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
}

// Reducer
const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false }

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      }

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      }

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      }

    default:
      return state
  }
}

// Helper function to generate unique ID
const generateId = (): string =>
  Date.now().toString() + Math.random().toString(36).substr(2, 9)

// Provider component
export const ExpenseProvider = ({ children }: ExpenseProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  // Load expenses from AsyncStorage on app start
  useEffect(() => {
    loadExpenses()
  }, [])

  // Save expenses to AsyncStorage whenever expenses change
  useEffect(() => {
    if (state.expenses.length > 0 || state.loading === false) {
      saveExpenses(state.expenses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.expenses])

  const loadExpenses = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedExpenses) {
        const expenses: Expense[] = JSON.parse(storedExpenses)
        dispatch({ type: 'SET_EXPENSES', payload: expenses })
      } else {
        dispatch({ type: 'SET_EXPENSES', payload: [] })
      }
    } catch (error) {
      console.error('Error loading expenses:', error)
      dispatch({ type: 'SET_EXPENSES', payload: [] })
    }
  }

  const saveExpenses = async (expenses: Expense[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    } catch (error) {
      console.error('Error saving expenses:', error)
    }
  }

  const addExpense = (
    expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>
  ): Expense => {
    const newExpense: Expense = {
      id: generateId(),
      ...expenseData,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense })
    return newExpense
  }

  const updateExpense = (
    id: string,
    expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>
  ): Expense => {
    const updatedExpense: Expense = {
      ...expenseData,
      id,
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense })
    return updatedExpense
  }

  const deleteExpense = (id: string): void => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id })
  }

  const getTotalExpenses = (): number => {
    return state.expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const getExpensesByCategory = (): Record<CategoryType, number> => {
    return state.expenses.reduce((acc, expense) => {
      const category = expense.category
      acc[category] = (acc[category] || 0) + expense.amount
      return acc
    }, {} as Record<CategoryType, number>)
  }

  const value: ExpenseContextType = {
    expenses: state.expenses,
    loading: state.loading,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getExpensesByCategory,
    refreshExpenses: loadExpenses,
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

// Custom hook to use the expense context
export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider')
  }
  return context
}
