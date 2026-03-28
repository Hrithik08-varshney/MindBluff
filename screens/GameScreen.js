import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import RateTitle from "../components/RateTitle";
import GuessDisplay from "../components/GuessDisplay";
import PrimaryButton from "../components/PrimaryButton";
import LyingAlert from "../components/LyingAlert";
import { colors, typography, spacing } from "../styles/globalStyles";

const generateRandomBetween = (min, max, exclude) => {
  // Prevent infinite recursion when range is invalid
  if (min >= max) {
    return min;
  }

  // If the range is too small and we can't avoid the excluded value
  if (max - min <= 1) {
    // Return the non-excluded value if it exists
    if (min !== exclude) return min;
    if (max !== exclude) return max;
    // If both values equal exclude, just return min (shouldn't happen in normal game flow)
    return min;
  }

  let rndNum = Math.floor(Math.random() * (max - min)) + min;
  
  // Only exclude if exclude is not null (null means we're in narrowing phase)
  if (rndNum === exclude && exclude !== null) {
    // Try next value
    if (rndNum + 1 < max) return rndNum + 1;
    // Try previous value
    if (rndNum - 1 >= min) return rndNum - 1;
    // Fallback (shouldn't reach here)
    return min !== exclude ? min : max;
  }
  
  return rndNum;
};

const GameScreen = ({ userNumber, onGameOver }) => {
  const [minBoundary, setMinBoundary] = useState(1);
  const [maxBoundary, setMaxBoundary] = useState(100);

  const initalGuess = generateRandomBetween(
    1,
    100,
    userNumber,
  );
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [rounds, setRounds] = useState(0);
  const [showLyingAlert, setShowLyingAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [guessHistory, setGuessHistory] = useState([
    {
      round: 0,
      guess: initalGuess,
      status: "initial",
      description: "Initial guess"
    }
  ]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(rounds);
      // Game over - user guessed the number
    }
  }, [currentGuess, userNumber, onGameOver, rounds]);

  const nextGuessHandler = (direction) => {
    // Prevent handler from running if game is already over
    if (currentGuess === userNumber) {
      return;
    }

    let newMin = minBoundary;
    let newMax = maxBoundary;

    if (direction === "lower") {
      if (currentGuess < userNumber) {
        // Wrong direction - the guess is already lower than user number
        setAlertMessage("The number is actually higher! Stop lying! 👎");
        setShowLyingAlert(true);
        return;
      }
      newMax = currentGuess;
      setMaxBoundary(currentGuess);
    } else {
      if (currentGuess > userNumber) {
        // Wrong direction - the guess is already higher than user number
        setAlertMessage("The number is actually lower! Stop lying! 👎");
        setShowLyingAlert(true);
        return;
      }
      newMin = currentGuess + 1;
      setMinBoundary(currentGuess + 1);
    }

    // Use the NEW boundaries instead of the old state values
    // Pass null as exclude so we can guess the userNumber during narrowing phase
    const newGuess = generateRandomBetween(
      newMin,
      newMax,
      null,
    );
    const newRound = rounds + 1;
    setCurrentGuess(newGuess);
    setRounds(newRound);
    
    // Add to history
    const directionText = direction === "lower" ? "Lower" : "Higher";
    setGuessHistory((prev) => [
      ...prev,
      {
        round: newRound,
        guess: newGuess,
        status: "guess",
        description: `Tried ${directionText}`
      }
    ]);
  };

  const handleLower = () => nextGuessHandler("lower");
  const handleHigher = () => nextGuessHandler("higher");

  // Calculate rating based on number of guesses
  const calculateRating = () => {
    if (rounds <= 3) return 5; // Excellent
    if (rounds <= 6) return 4.5; // Very Good
    if (rounds <= 9) return 4; // Good
    if (rounds <= 12) return 3.5; // Average
    if (rounds <= 15) return 3; // Below Average
    return 2.5; // Poor
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <RateTitle title="Opponent's Guess" rating={calculateRating()} />
          <GuessDisplay guess={currentGuess} label="Current Guess" />
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>Higher or Lower?</Text>
            <View style={styles.buttonsContainer}>
              <PrimaryButton onPress={handleLower}>
                <Ionicons name="remove" size={28} color={colors.white} />
              </PrimaryButton>
              <PrimaryButton onPress={handleHigher}>
                <Ionicons name="add" size={28} color={colors.white} />
              </PrimaryButton>
            </View>
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>
                <Ionicons name="list" size={18} color={colors.primary} /> Game History
              </Text>
              <FlatList
                data={guessHistory}
                renderItem={({ item }) => (
                  <View style={styles.historyEntry}>
                    <View style={styles.historyLeft}>
                      <View style={styles.roundBadge}>
                        <Text style={styles.roundBadgeText}>{item.round}</Text>
                      </View>
                      <View>
                        <Text style={styles.guessValue}>{item.guess}</Text>
                        <Text style={styles.historyDescription}>{item.description}</Text>
                      </View>
                    </View>
                    <Ionicons 
                      name={item.status === "initial" ? "arrow-forward" : "checkmark-outline"} 
                      size={20} 
                      color={item.status === "initial" ? colors.accent : colors.primary}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={styles.historyScroll}
                contentContainerStyle={styles.historyListContent}
                scrollIndicatorInsets={{ right: 1 }}
              />
            </View>
          </View>
        </View>
      </View>
      
      <Modal 
        visible={showLyingAlert} 
        transparent={true} 
        animationType="fade"
        onRequestClose={() => setShowLyingAlert(false)}
      >
        <LyingAlert
          visible={showLyingAlert}
          message={alertMessage}
          onDismiss={() => setShowLyingAlert(false)}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
  },
  promptContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  promptText: {
    ...typography.heading,
    color: colors.primary,
    marginBottom: spacing.md,
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  historyContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    width: '100%',
  },
  historyTitle: {
    ...typography.bodyBold,
    color: colors.primary,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  historyScroll: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: spacing.md,
    width: '100%',
    maxHeight: 250,
  },
  historyListContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  historyEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roundBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  roundBadgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  guessValue: {
    ...typography.bodyBold,
    color: colors.charcoal,
    fontSize: 16,
  },
  historyDescription: {
    ...typography.small,
    color: colors.darkGray,
    marginTop: 2,
  },
});

export default GameScreen;
