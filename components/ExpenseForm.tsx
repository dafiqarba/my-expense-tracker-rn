import { CATEGORIES } from '@/constants/categories'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { formatDate } from '@/utils/date'
import { colors } from '@/constants/color'
import { CategoryType, FormSubmitAction } from '@/types'

type ExpenseFormProps = {
  title: string
  amount: string
  date: Date
  category: CategoryType
  showDatePicker: boolean
  action: FormSubmitAction
  errors: Record<string, string>

  onSave: () => void
  onCancel: () => void
  setTitle: (value: string) => void
  setAmount: (value: string) => void
  setCategory: (value: CategoryType) => void
  setShowDatePicker: (value: boolean) => void
  onDateChange: (event: any, date?: Date | undefined) => void
}

const ExpenseForm = (props: ExpenseFormProps) => {
  const {
    date,
    title,
    action,
    amount,
    errors,
    category,
    showDatePicker,
    onSave,
    setTitle,
    onCancel,
    setAmount,
    setCategory,
    onDateChange,
    setShowDatePicker,
  } = props

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          value={title}
          returnKeyType="next"
          onChangeText={setTitle}
          placeholder="Enter expense title"
          placeholderTextColor={colors.textLight}
          style={[styles.input, errors.title && styles.inputError]}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount *</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>Rp</Text>
          <TextInput
            value={amount}
            placeholder="0"
            returnKeyType="next"
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholderTextColor={colors.textLight}
            style={[styles.input, styles.amountInput, errors.amount && styles.inputError]}
          />
        </View>
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <View style={[styles.pickerContainer, errors.category && styles.inputError]}>
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={setCategory}
            itemStyle={styles.pickerItem}
          >
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date *</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
          <Text style={styles.saveButtonText}>
            {action === 'add' ? 'Save' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  picker: {
    height: 53,
  },
  pickerItem: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.white,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
})

export default ExpenseForm
