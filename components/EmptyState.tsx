import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/constants/color'

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>💰</Text>
      </View>

      <Text style={styles.title}>No expenses yet</Text>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips:</Text>
        <Text style={styles.tipText}>• Pick a month to filter expenses</Text>
        <Text style={styles.tipText}>• Swipe left on expenses to delete</Text>
        <Text style={styles.tipText}>• Pull down to refresh your expense list</Text>
        <Text style={styles.tipText}>• Use categories to organize your spending</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  tipsContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
})

export default EmptyState
