import { UnknownOutputParams } from 'expo-router'

export interface Expense {
  id: string
  title: string
  amount: number
  category: CategoryType
  date: string
  createdAt?: string
  updatedAt?: string
}

export type CategoryType =
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Shopping'
  | 'Health'
  | 'Other'

export interface CategoryInfo {
  label: string
  value: CategoryType
  color: string
  icon: string
}

export type FormSubmitAction = 'add' | 'edit'
export type RouteLocalParam = UnknownOutputParams & {
  action: FormSubmitAction
  expenseData?: string
}
