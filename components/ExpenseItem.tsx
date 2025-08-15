import Animated, {
  SharedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { Expense } from '@/types'
import { colors } from '@/constants/color'
import { formatAmount } from '@/utils/number'
import { formatDateString } from '@/utils/date'
import { CATEGORIES_THUMBNAIL as CATEGORIES } from '@/constants/categories'

const RightActions = (
  progress: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete: () => void
) => {
  const deleteAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(drag.value, [0, -120], [120, 0], Extrapolation.CLAMP)
    const scale = interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP)

    return {
      transform: [{ translateX }, { scale }],
    }
  })

  return (
    <View style={styles.rightActions}>
      <Animated.View style={[styles.actionContainer, deleteAnimatedStyle]}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

type ExpenseItemProps = {
  expense: Expense
  onEdit: () => void
  onDelete: () => void
}

export default function ExpenseItem(props: ExpenseItemProps) {
  const { expense, onEdit, onDelete } = props

  const categoryInfo = CATEGORIES[expense.category] || CATEGORIES.Other

  const handleSwipeableWillOpen = (direction: 'left' | 'right') => {
    if (direction === 'left') onDelete()
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        rightThreshold={35}
        overshootRight={false}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        renderRightActions={(progress, translation) =>
          RightActions(progress, translation, onDelete)
        }
      >
        <TouchableOpacity style={styles.container} onPress={onEdit} activeOpacity={0.7}>
          <View
            style={[styles.categoryIndicator, { backgroundColor: categoryInfo.color }]}
          >
            <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>
                {expense.title}
              </Text>
              <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{expense.category}</Text>
              </View>
              <Text style={styles.date}>{formatDateString(expense.date)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '400',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: 110,
    marginBottom: 12,
  },
  actionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  deleteButton: {
    backgroundColor: colors.error,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginTop: 0,
    marginBottom: 0,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
})
