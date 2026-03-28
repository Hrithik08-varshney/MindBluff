import { StyleSheet, Text, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [rounds, setRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameOver(false);
    setRounds(0);
  };

  const gameOverHandler = (roundsCount) => {
    setRounds(roundsCount);
    setGameOver(true);
  };

  const restartGameHandler = () => {
    setUserNumber(null);
    setGameOver(false);
    setRounds(0);
  };

  if(gameOver) {
    return <GameOverScreen rounds={rounds} userNumber={userNumber} onRestart={restartGameHandler} />;
  }

  if (userNumber) {
    return <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  return <StartGameScreen onStartGame={startGameHandler} />;
}

const styles = StyleSheet.create({});
