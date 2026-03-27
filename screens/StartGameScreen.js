import { View, Text, TextInput, SafeAreaView } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import {
  globalStyles,
  inputStyles,
  spacing,
  typography,
  colors,
} from "../styles/globalStyles";

const StartGameScreen = ({ onStartGame }) => {
  const [numberInput, setNumberInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleNumberChange = (value) => {
    if (value === "") {
      setNumberInput("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      setNumberInput(value);
    }
  };

  const handleReset = () => {
    setNumberInput("");
  };

  const handleConfirm = () => {
    const confirmNumber = +numberInput;

    if (isNaN(confirmNumber) || confirmNumber < 1 || confirmNumber > 100) {
      alert("Please enter a valid number between 1 and 100.");
      setNumberInput("");
      return;
    }
    if (numberInput.trim()) {
      onStartGame(confirmNumber);
      // TODO: Implement game logic with entered number
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={globalStyles.screenContainer}>
        {/* Header */}
        <View style={{ marginBottom: spacing.xxl }}>
          <Text style={typography.heroTitle}>MindBluff</Text>
          <Text
            style={[
              typography.body,
              { marginTop: spacing.md, color: colors.darkGray },
            ]}
          >
            Pick a number between 1 and 100
          </Text>
        </View>

        {/* Input Section */}
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Enter Your Number</Text>
          <TextInput
            style={[inputStyles.input, isFocused && inputStyles.inputFocused]}
            placeholder="Type a number 1-100..."
            placeholderTextColor={colors.gray}
            keyboardType="number-pad"
            maxLength={3}
            value={numberInput}
            onChangeText={handleNumberChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Buttons Section */}
        <View style={{ marginTop: spacing.xl }}>
          <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
          <View style={{ marginTop: spacing.md }}>
            <PrimaryButton onPress={handleReset} variant="secondary">
              Reset
            </PrimaryButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartGameScreen;
