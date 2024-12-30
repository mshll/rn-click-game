import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Constants for layout
const BUTTON_SIZE = 100; // Approximate size of the button
const SCORE_LABEL_HEIGHT = 80; // Height reserved for score label
const PADDING = 20;

// Color pairs (light background, darker button)
const colorPairs = [
  { bg: '$blue3', button: '$blue8' },
  { bg: '$green3', button: '$green8' },
  { bg: '$orange3', button: '$orange8' },
  { bg: '$purple3', button: '$purple8' },
  { bg: '$pink3', button: '$pink8' },
  { bg: '$yellow3', button: '$yellow8' },
  { bg: '$red3', button: '$red8' },
];

export const getRandomPosition = (insets) => {
  // Available space calculation
  const availableWidth = width - (BUTTON_SIZE + 50 + PADDING * 2 + insets.left + insets.right);
  const availableHeight = height - (BUTTON_SIZE + PADDING * 2 + insets.top + insets.bottom);

  // Minimum Y position to avoid score label
  const minY = insets.top + SCORE_LABEL_HEIGHT;

  return {
    top: Math.random() * (availableHeight - minY) + minY,
    left: Math.random() * availableWidth + (insets.left + PADDING),
  };
};

export const getRandomButtonType = (previousWasBad) => {
  // If previous was "Don't Click Me", force "Click Me"
  if (previousWasBad) {
    return 'good';
  }
  return Math.random() < 0.5 ? 'good' : 'bad';
};

export const getRandomColorPair = () => {
  return colorPairs[Math.floor(Math.random() * colorPairs.length)];
};
