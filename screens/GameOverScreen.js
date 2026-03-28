import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors, typography, spacing, borderRadius } from '../styles/globalStyles'
import PrimaryButton from '../components/PrimaryButton'

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={80} color={colors.success} />
      </View>

      {/* Game Over Title */}
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.subtitle}>I found your number!</Text>

      {/* Stats Container */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Your Number</Text>
          <Text style={styles.statValue}>{userNumber}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Rounds Taken</Text>
          <Text style={styles.statValue}>{rounds}</Text>
        </View>
      </View>

      {/* Message */}
      <Text style={styles.message}>
        {rounds <= 5
          ? '🎯 Incredible! I got it in just a few rounds!'
          : rounds <= 10
          ? '👍 Good game! I found your number!'
          : '🤔 That took a while, but I got there!'}
      </Text>

      {/* Back Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onRestart}>
          ← Play Again
        </PrimaryButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heroTitle,
    color: colors.success,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.darkGray,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.body,
    color: colors.darkGray,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.title,
    color: colors.primary,
  },
  message: {
    ...typography.heading,
    color: colors.charcoal,
    textAlign: 'center',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    lineHeight: 32,
  },
  buttonContainer: {
    width: '100%',
    marginTop: spacing.lg,
  },
})

export default GameOverScreen