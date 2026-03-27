import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import RateTitle from "../components/RateTitle";
import GuessDisplay from "../components/GuessDisplay";
import PrimaryButton from "../components/PrimaryButton";
import LyingAlert from "../components/LyingAlert";

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

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
      // Game over - user guessed the number
    }
  }, [currentGuess, userNumber, onGameOver]);

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
    setCurrentGuess(newGuess);
    setRounds((prev) => prev + 1);
  };

  const handleLower = () => nextGuessHandler("lower");
  const handleHigher = () => nextGuessHandler("higher");

  return (
    <View>
      <RateTitle title="Opponent's Guess" rating={4.5} />
      <GuessDisplay guess={currentGuess} label="Current Guess" />
      <View>
        <Text>Higher or Lower?</Text>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={handleLower}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>−</Text>
          </PrimaryButton>
          <PrimaryButton onPress={handleHigher}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>+</Text>
          </PrimaryButton>
        </View>
        <View>
          <Text>Log Rounds: {rounds}</Text>
        </View>
      </View>
      <LyingAlert
        visible={showLyingAlert}
        message={alertMessage}
        onDismiss={() => setShowLyingAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});

export default GameScreen;
