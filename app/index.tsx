import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import { Expense } from '@/types'
import { colors } from '@/constants/color'
import EmptyState from '@/components/EmptyState'
import ExpenseItem from '@/components/ExpenseItem'
import { useExpenses } from '@/contexts/ExpenseContext'
import MonthYearPicker from '@/components/MonthYearPicker'
import TotalExpenseCard from '@/components/TotalExpenseCard'
import FloatingActionButton from '@/components/FloatingActionButton'

const ExpenseListScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()) // 0–11
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const router = useRouter()
  const { expenses, loading, deleteExpense, refreshExpenses } = useExpenses()

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshExpenses()
    setRefreshing(false)
  }

  const handleDeleteExpense = (expense: Expense) => {
    Alert.alert('Delete Expense', `Are you sure you want to delete "${expense.title}"?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteExpense(expense.id),
      },
    ])
  }

  const handleEditExpense = (expense: Expense) => {
    router.push({
      pathname: '/expense-form',
      params: { action: 'edit', expenseData: JSON.stringify(expense) },
    })
  }

  const handleAddExpense = () => {
    router.push({ pathname: '/expense-form', params: { action: 'add' } })
  }

  const filteredExpenses = expenses
    .filter((expense) => {
      const date = new Date(expense.date)
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (loading && filteredExpenses.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading expenses...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MonthYearPicker
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onChange={(month, year) => {
          setSelectedMonth(month)
          setSelectedYear(year)
        }}
      />
      {filteredExpenses.length === 0 ? (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.emptyContainer}>
            <TotalExpenseCard
              total={filteredExpenses.reduce((t, e) => t + e.amount, 0)}
            />
            <EmptyState />
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={filteredExpenses}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }: { item: Expense }) => (
            <ExpenseItem
              expense={item}
              onEdit={() => handleEditExpense(item)}
              onDelete={() => handleDeleteExpense(item)}
            />
          )}
          ListHeaderComponent={
            <TotalExpenseCard
              total={filteredExpenses.reduce((t, e) => t + e.amount, 0)}
            />
          }
        />
      )}

      <FloatingActionButton onPress={handleAddExpense} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Space for floating button
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
})

export default ExpenseListScreen
