import { Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { useExpenses } from '@/contexts/ExpenseContext'
import { CategoryType, Expense, RouteLocalParam } from '@/types'

type FormError =
  | {
      title?: string
      amount?: string
      category?: string
    }
  | Record<string, string>

const useAddEditForm = () => {
  const router = useRouter()
  const { addExpense, updateExpense } = useExpenses()
  const { action, expenseData } = useLocalSearchParams<RouteLocalParam>()

  // Parse the expense data
  const expense: Expense = expenseData ? JSON.parse(expenseData) : undefined

  // Form state
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food' as CategoryType)
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Validation state
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors: FormError = {}

    if (!title.trim()) newErrors.title = 'Title is required'

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }

    if (!category) newErrors.category = 'Category is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const applyAddOrEdit = (
    id: string,
    expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (action === 'add') {
      addExpense(expenseData)
      return
    }

    updateExpense(id, expenseData)
  }

  const handleSave = () => {
    if (!validateForm()) return

    const expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'> = {
      title: title.trim(),
      date: date.toISOString(),
      amount: parseFloat(amount),
      category: category as CategoryType,
    }

    try {
      applyAddOrEdit(expense?.id, expenseData)
      router.back()
    } catch (_error) {
      Alert.alert('Error', 'Failed to save expense. Please try again.')
    }
  }

  const handleCancel = () => router.back()

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate)
      setShowDatePicker(false)
    } else {
      setShowDatePicker(false)
    }
  }

  useEffect(() => {
    if (action === 'edit' && expense?.id) {
      setTitle(expense.title)
      setAmount(expense.amount.toString())
      setCategory(expense.category)
      setDate(new Date(expense.date))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  return {
    date,
    title,
    errors,
    amount,
    action,
    category,
    showDatePicker,
    setTitle,
    setAmount,
    handleSave,
    setCategory,
    handleCancel,
    handleDateChange,
    setShowDatePicker,
  }
}

export default useAddEditForm
