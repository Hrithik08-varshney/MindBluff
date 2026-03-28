import { Pressable, Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { buttonStyles, colors } from '../styles/globalStyles'

const PrimaryButton = ({ children, onPress, variant = 'primary', style }) => {
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

  // Check if children is a string (text) or JSX
  const isTextContent = typeof children === 'string'

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[getButtonStyle(), isPressed && variant === 'primary' && buttonStyles.primaryButtonPressed, style]}
    >
      {isTextContent ? (
        <Text style={getButtonTextStyle()}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export default PrimaryButton