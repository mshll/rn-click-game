import { Text, YStack } from 'tamagui';
import GameButton from './GameButton';

const GameOverScreen = ({ score, onRestart, highScore, colorPair }) => {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="$4"
      animation="bouncy"
      enterStyle={{ opacity: 0, scale: 0.5 }}
      exitStyle={{ opacity: 0, scale: 0.5 }}
      opacity={1}
      scale={1}
    >
      <Text fontSize="$10" fontWeight="bold" color={colorPair.button}>
        Game Over!
      </Text>

      <Text fontSize="$7" marginVertical="$4" color={colorPair.button}>
        Final Score: {score}
      </Text>

      {isNewHighScore && (
        <Text fontSize="$5" color={colorPair.button} marginBottom="$4">
          🎉 New High Score! 🎉
        </Text>
      )}

      <GameButton label="Back to Start" buttonColor={colorPair.button} onPress={onRestart} minWidth="$15" textColor={colorPair.bg} />
    </YStack>
  );
};

export default GameOverScreen;
