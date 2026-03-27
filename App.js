import { StyleSheet, Text, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameOver(false);
  };

  const gameOverHandler = () => {
    setGameOver(true);
  };

  if(gameOver) {
    return <GameOverScreen />;
  }

  if (userNumber) {
    return <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  return <StartGameScreen onStartGame={startGameHandler} />;
}

const styles = StyleSheet.create({});
