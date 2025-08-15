import { colors } from './color'

export const CATEGORIES = [
  { label: 'Food & Dining', value: 'Food', color: colors.categoryFood },
  { label: 'Transportation', value: 'Transport', color: colors.categoryTransport },
  { label: 'Entertainment', value: 'Entertainment', color: colors.categoryEntertainment },
  { label: 'Shopping', value: 'Shopping', color: colors.categoryShopping },
  { label: 'Health & Medical', value: 'Health', color: colors.categoryHealth },
  { label: 'Other', value: 'Other', color: colors.categoryOther },
]

export const CATEGORIES_THUMBNAIL = {
  Food: { color: colors.categoryFood, icon: '🍽️' },
  Transport: { color: colors.categoryTransport, icon: '🚗' },
  Entertainment: { color: colors.categoryEntertainment, icon: '🎬' },
  Shopping: { color: colors.categoryShopping, icon: '🛍️' },
  Health: { color: colors.categoryHealth, icon: '🏥' },
  Other: { color: colors.categoryOther, icon: '📝' },
}
