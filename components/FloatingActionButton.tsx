import { useRef } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from '@/constants/color'

type FloatingActionButtonProps = {
  onPress: () => void
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { onPress } = props

  const scaleValue = useRef(new Animated.Value(1)).current

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePress = () => {
    animatePress()
    onPress()
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '300',
  },
})

export default FloatingActionButton
