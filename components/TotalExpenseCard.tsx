import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/constants/color'
import { formatAmount } from '@/utils/number'

type TotalExpenseCardProps = {
  total: number
}

export default function TotalExpenseCard(props: TotalExpenseCardProps) {
  const { total } = props

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📊</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Total Expenses</Text>
          <Text style={styles.amount}>{formatAmount(total)}</Text>
        </View>
      </View>

      <View style={styles.decorativeElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.transparentWhite2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.transparentWhite8,
    fontWeight: '500',
    marginBottom: 4,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: colors.transparentWhite1,
  },
  circle1: {
    width: 80,
    height: 80,
    top: -20,
    right: -20,
  },
  circle2: {
    width: 60,
    height: 60,
    top: 40,
    right: 60,
  },
  circle3: {
    width: 40,
    height: 40,
    bottom: -10,
    right: 20,
  },
})
