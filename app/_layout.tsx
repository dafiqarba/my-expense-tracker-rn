import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/constants/color'
import { ExpenseProvider } from '@/contexts/ExpenseContext'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <ExpenseProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            paddingTop: -5,
          }}
        >
          <StatusBar style="dark"  />
          <Stack
            screenOptions={{
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '600',
              },
              headerTintColor: colors.white,
              headerStyle: {
                backgroundColor: colors.primary,
              },
            }}
          >
            <Stack.Screen name="index" options={{ title: 'My Expense Tracker' }} />
            <Stack.Screen
              name="expense-form"
              options={(route) => {
                const params = route.route?.params as { action?: string }
                const action = params?.action

                return {
                  title: action === 'add' ? 'Add Expense' : 'Edit Expense',
                }
              }}
            />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </ExpenseProvider>
  )
}
