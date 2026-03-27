import { View, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { rateTitleStyles } from '../styles/rateTitleStyles'

const RateTitle = ({ title = 'Amazing Game', rating = 5 }) => {
  // Validate rating to ensure it's a valid positive integer
  const validatedRating = Math.max(0, Math.min(5, Math.floor(Number(rating) || 5)))

  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const glowAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous glow animation
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    glowLoop.start()

    return () => glowLoop.stop()
  }, [scaleAnim, opacityAnim, glowAnim])

  const scaleStyle = {
    transform: [{ scale: scaleAnim }],
  }

  const opacityStyle = {
    opacity: opacityAnim,
  }

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  })

  const renderStars = () => {
    return Array(validatedRating)
      .fill(0)
      .map((_, i) => (
        <Text key={i} style={rateTitleStyles.star}>
          ⭐
        </Text>
      ))
  }

  return (
    <View style={rateTitleStyles.container}>
      <Animated.View
        style={[
          rateTitleStyles.titleWrapper,
          scaleStyle,
          opacityStyle,
        ]}
      >
        <Animated.View
          style={[
            rateTitleStyles.glowBorder,
            {
              opacity: glowOpacity,
            },
          ]}
        />
        <Text style={rateTitleStyles.titleText}>{title}</Text>
        <View style={rateTitleStyles.ratingContainer}>
          {renderStars()}
          <Text style={rateTitleStyles.ratingText}>{validatedRating}.0</Text>
        </View>
      </Animated.View>
    </View>
  )
}

export default RateTitle
