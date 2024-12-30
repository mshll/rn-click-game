import { Text, YStack } from 'tamagui';
import GameButton from './GameButton';

const StartScreen = ({ onStart, highScore, colorPair }) => {
  return (
    <YStack
      flex={1}
      pt="$10"
      justifyContent="space-between"
      alignItems="center"
      gap="$6"
      animation="bouncy"
      enterStyle={{ opacity: 0, scale: 0.5 }}
      exitStyle={{ opacity: 0, scale: 0.5 }}
      opacity={1}
      scale={1}
    >
      <YStack gap="$6" alignItems="center" justifyContent="center" px="$4">
        <Text fontSize="$10" fontWeight="bold" color={colorPair.button}>
          Clickety Clack
        </Text>
        <Text fontSize="$6" color={colorPair.button}>
          High Score: {highScore}
        </Text>
      </YStack>

      <YStack gap="$6" alignItems="center" justifyContent="center" px="$4">
        <GameButton label="Play" buttonColor={colorPair.button} onPress={onStart} minWidth="$15" textColor={colorPair.bg} />
      </YStack>

      <YStack gap="$4" alignItems="center" justifyContent="center" px="$4" pb="$7">
        <Text textAlign="center" fontSize="$4" color={colorPair.button}>
          Click the buttons that say "Click!" and avoid the ones that say "Don't!". Be quick - the buttons disappear faster as you score higher. Don't
          click the background!
        </Text>
      </YStack>
    </YStack>
  );
};

export default StartScreen;
