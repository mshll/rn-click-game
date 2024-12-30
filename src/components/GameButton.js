import { Button } from 'tamagui';

const GameButton = ({ onPress, label, style, buttonColor, textColor, ...props }) => {
  return (
    <Button
      size="$6"
      backgroundColor={buttonColor}
      onPress={onPress}
      animation="bouncy"
      style={style}
      color={textColor}
      fontWeight="bold"
      chromeless
      display="flex"
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      minWidth="$12"
      {...props}
    >
      {label}
    </Button>
  );
};

export default GameButton;
