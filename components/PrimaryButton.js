import { Pressable, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { buttonStyles, colors } from '../styles/globalStyles'

const PrimaryButton = ({ children, onPress, variant = 'primary' }) => {
  const [isPressed, setIsPressed] = useState(false)

  const getButtonStyle = () => {
    if (variant === 'danger') {
      return buttonStyles.dangerButton
    } else if (variant === 'secondary') {
      return buttonStyles.secondaryButton
    }
    return buttonStyles.primaryButton
  }

  const getButtonTextStyle = () => {
    if (variant === 'danger') {
      return buttonStyles.dangerButtonText
    } else if (variant === 'secondary') {
      return buttonStyles.secondaryButtonText
    }
    return buttonStyles.primaryButtonText
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[getButtonStyle(), isPressed && variant === 'primary' && buttonStyles.primaryButtonPressed]}
    >
      <Text style={getButtonTextStyle()}>{children}</Text>
    </Pressable>
  )
}

export default PrimaryButton