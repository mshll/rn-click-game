import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import tamaguiConfig from './tamagui.config';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name="light">
          <StatusBar style="dark" />
          <GameScreen />
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
