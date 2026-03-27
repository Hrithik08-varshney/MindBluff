import { View, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { guessDisplayStyles } from '../styles/guessDisplayStyles'

const GuessDisplay = ({ guess = 50, label = 'Current Guess' }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Entry animation with scale and subtle rotation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    pulseLoop.start()

    return () => pulseLoop.stop()
  }, [pulseAnim, scaleAnim, rotateAnim])

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.7],
  })

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['10deg', '0deg'],
  })

  const scaleStyle = {
    transform: [
      { scale: scaleAnim },
      { rotate: rotation },
    ],
  }

  return (
    <View style={guessDisplayStyles.container}>
      <Animated.View
        style={[
          guessDisplayStyles.guessBox,
          scaleStyle,
        ]}
      >
        <Animated.View
          style={[
            guessDisplayStyles.pulseRing,
            {
              opacity: pulseOpacity,
            },
          ]}
        />
        <Text style={guessDisplayStyles.guessNumber}>
          {guess}
        </Text>
        <Text style={guessDisplayStyles.label}>{label}</Text>
      </Animated.View>
    </View>
  )
}

export default GuessDisplay
