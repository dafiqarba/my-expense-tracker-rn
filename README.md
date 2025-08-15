# Personal Expense Tracker - React Native (Expo Router)

A clean, simple, and intuitive mobile app for tracking personal expenses with a warm pastel brown theme. Built using React Native (Expo).

## Features

✨ **Core Functionality**

- Add, edit, and delete expenses
- Categorize expenses (Food, Transport, Entertainment, etc.)
- View total expenses summary
- Form validation with error handling
- Filter expense based on month and year

✨ **User Experience**

- Beautiful pastel brown color theme
- Swipe-to-delete functionality
- Pull-to-refresh on expense list
- Floating action button for quick access
- Empty state with helpful tips
- Smooth animations and transitions
- Responsive

✨ **Data Management**

- Local data persistence with AsyncStorage
- React Context for state management
- Real-time expense calculations
- Data validation and error handling

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm package manager
- Android Emulator or
- Expo Go app on your mobile device

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run on device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android) or
   - Press `a` for Android Emulator (Android Studio)

### Project Structure (Expo Router)

```
expense-tracker/
├── app/
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Main expense list (home)
│   └── expense-form.tsx         # Add expense screen
├── components/
│   ├── ExpenseItem.tsx          # Individual expense card
│   ├── ExpenseForm.tsx          # Add or edit form field
│   ├── FloatingActionButton.tsx # Add expense FAB
│   ├── EmptyState.tsx           # No expenses view
│   ├── TotalExpenseCard.tsx     # Summary card
│   └── MonthYearPicker.tsx      # Month and Year filter
├── context/
│   └── ExpenseContext.ts        # State management
├── constants/
│   └── categories.ts            # Categories constant
│   └── color.ts                 # Color theme
├── utils/
│   └── date.ts                  # Date Helper
│   └── number.ts                # Numeric Helper
├── hooks/
│   └── useAddEditForm           # Add and Edit expense hook
```
