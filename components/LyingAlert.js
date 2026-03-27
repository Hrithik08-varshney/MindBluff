import { View, Text, Animated, Easing, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { alertStyles } from '../styles/alertStyles'

const LyingAlert = ({ visible = false, onDismiss = () => {}, message = 'You are lying! The number is not lower than your guess.' }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const shakeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Entrance animation with shake
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start()
    } else {
      // Exit animation
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, scaleAnim, opacityAnim, shakeAnim])

  if (!visible) {
    return null
  }

  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-10, 0, 10],
  })

  return (
    <View style={alertStyles.container}>
      <Animated.View
        style={[
          alertStyles.alertBox,
          {
            opacity: opacityAnim,
            transform: [
              { scale: scaleAnim },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <View style={alertStyles.titleContainer}>
          <Text style={alertStyles.icon}>🚨</Text>
          <Text style={alertStyles.title}>You Are Lying!</Text>
        </View>

        <Text style={alertStyles.message}>{message}</Text>

        <View style={alertStyles.buttonContainer}>
          <Pressable
            style={[alertStyles.button, alertStyles.okButton]}
            onPress={onDismiss}
          >
            <Text style={alertStyles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}

export default LyingAlert
