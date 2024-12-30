import { useState, useEffect } from 'react';
import { Text, View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import GameButton from '../components/GameButton';
import GameOverScreen from '../components/GameOverScreen';
import StartScreen from '../components/StartScreen';
import { getRandomPosition, getRandomButtonType, getRandomColorPair } from '../utils/gameUtils';

const HIGH_SCORE_KEY = 'game_high_score';

// Timeout constants (in milliseconds)
const INITIAL_GOOD_TIMEOUT = 1500; // "Click!" buttons timeout
const INITIAL_BAD_TIMEOUT = 1000; // "Don't!" buttons timeout
const MIN_GOOD_TIMEOUT = 600; // Minimum time for "Click!" buttons
const MIN_BAD_TIMEOUT = 600; // Minimum time for "Don't!" buttons
const TIMEOUT_REDUCTION_PER_SCORE = 25; // How much faster it gets per point

const calculateTimeout = (score, isGoodButton) => {
  const baseTimeout = isGoodButton ? INITIAL_GOOD_TIMEOUT : INITIAL_BAD_TIMEOUT;
  const minTimeout = isGoodButton ? MIN_GOOD_TIMEOUT : MIN_BAD_TIMEOUT;
  const maxReduction = baseTimeout - minTimeout;
  const reduction = Math.min(score * TIMEOUT_REDUCTION_PER_SCORE, maxReduction);
  return baseTimeout - reduction;
};

const GameScreen = () => {
  const insets = useSafeAreaInsets();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(() => getRandomPosition(insets));
  const [buttonType, setButtonType] = useState('good');
  const [colorPair, setColorPair] = useState(getRandomColorPair());
  const [timer, setTimer] = useState(null);

  // Load high score when component mounts
  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const savedHighScore = await SecureStore.getItemAsync(HIGH_SCORE_KEY);
        if (savedHighScore) {
          setHighScore(parseInt(savedHighScore, 10));
        }
      } catch (error) {
        console.warn('Error loading high score:', error);
      }
    };
    loadHighScore();
  }, []);

  // Save high score whenever it changes
  useEffect(() => {
    const saveHighScore = async () => {
      try {
        await SecureStore.setItemAsync(HIGH_SCORE_KEY, highScore.toString());
      } catch (error) {
        console.warn('Error saving high score:', error);
      }
    };
    if (highScore > 0) {
      saveHighScore();
    }
  }, [highScore]);

  const moveToNextButton = () => {
    const wasBadButton = buttonType === 'bad';
    setButtonPosition(getRandomPosition(insets));
    setButtonType(getRandomButtonType(wasBadButton));
    setColorPair(getRandomColorPair());
  };

  const startTimer = () => {
    if (timer) clearTimeout(timer);

    const timeout = calculateTimeout(score, buttonType === 'good');
    const newTimer = setTimeout(() => {
      if (buttonType === 'good') {
        // Game over if player didn't click "Click Me" in time
        setIsGameOver(true);
      } else {
        // Move to next button if it was "Don't Click Me"
        moveToNextButton();
      }
    }, timeout);
    setTimer(newTimer);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [buttonType, buttonPosition, isPlaying]);

  const handleButtonClick = () => {
    if (timer) clearTimeout(timer);

    if (buttonType === 'good') {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      moveToNextButton();
    } else {
      setIsGameOver(true);
    }
  };

  const handleStart = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setButtonType('good');
    setButtonPosition(getRandomPosition(insets));
    setColorPair(getRandomColorPair());
  };

  const handleRestart = () => {
    setIsPlaying(false);
  };

  const BaseView = ({ children }) => (
    <View
      flex={1}
      backgroundColor={colorPair.bg}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
      pressStyle={{ opacity: isPlaying ? 0.9 : 1 }}
      onPress={isPlaying ? () => setIsGameOver(true) : undefined}
    >
      {children}
    </View>
  );

  if (!isPlaying) {
    return (
      <BaseView>
        <StartScreen onStart={handleStart} highScore={highScore} colorPair={colorPair} />
      </BaseView>
    );
  }

  if (isGameOver) {
    return (
      <BaseView>
        <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} colorPair={colorPair} />
      </BaseView>
    );
  }

  return (
    <BaseView>
      <Text fontSize="$6" fontWeight="bold" position="absolute" top={insets.top + 20} alignSelf="center" color={colorPair.button}>
        Score: {score}
      </Text>

      <GameButton
        label={buttonType === 'good' ? 'Click!' : "Don't!"}
        buttonColor={colorPair.button}
        onPress={handleButtonClick}
        style={{
          position: 'absolute',
          top: buttonPosition.top,
          left: buttonPosition.left,
        }}
        textColor={colorPair.bg}
      />
    </BaseView>
  );
};

export default GameScreen;
