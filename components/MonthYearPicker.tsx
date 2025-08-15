import React from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native'

import { colors } from '@/constants/color'

interface MonthYearPickerProps {
  selectedMonth: number // 0–11
  selectedYear: number
  onChange: (month: number, year: number) => void
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MonthYearPicker = (props: MonthYearPickerProps) => {
  const { selectedMonth, selectedYear, onChange } = props

  const [monthModalVisible, setMonthModalVisible] = React.useState(false)
  const [yearModalVisible, setYearModalVisible] = React.useState(false)

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  // Generate years list (past 10 years for example)
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  const handleMonthSelect = (monthIndex: number) => {
    // Prevent selecting future month in current year
    if (selectedYear === currentYear && monthIndex > currentMonth) return
    onChange(monthIndex, selectedYear)
    setMonthModalVisible(false)
  }

  const handleYearSelect = (year: number) => {
    // Adjust month if current year and month is ahead
    let newMonth = selectedMonth
    if (year === currentYear && selectedMonth > currentMonth) {
      newMonth = currentMonth
    }
    onChange(newMonth, year)
    setYearModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {/* Month Card */}
      <TouchableOpacity style={styles.card} onPress={() => setMonthModalVisible(true)}>
        <Text style={styles.cardText}>{months[selectedMonth]}</Text>
      </TouchableOpacity>

      {/* Year Card */}
      <TouchableOpacity style={styles.card} onPress={() => setYearModalVisible(true)}>
        <Text style={styles.cardText}>{selectedYear}</Text>
      </TouchableOpacity>

      {/* Month Modal */}
      <Modal visible={monthModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => {
                const disabled = selectedYear === currentYear && index > currentMonth
                return (
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => !disabled && handleMonthSelect(index)}
                    style={[styles.modalItem, disabled && styles.disabledItem]}
                  >
                    <Text style={[styles.modalText, disabled && styles.disabledText]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
            <TouchableOpacity onPress={() => setMonthModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal visible={yearModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleYearSelect(item)}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setYearModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 12, padding: 8 },
  card: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardText: { fontSize: 16, fontWeight: '800', color: colors.surface },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  modalItem: { padding: 12 },
  modalText: { fontSize: 16, color: colors.textPrimary },
  disabledItem: { backgroundColor: colors.background },
  disabledText: { color: colors.textDisabled },
  closeText: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: 12,
    fontWeight: '600',
  },
})

export default MonthYearPicker
