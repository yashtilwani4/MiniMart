import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {COLORS, FONTS, SIZES, SHADOWS} from '../constants/theme';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'small' | 'medium';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'medium',
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePress = (action: 'increase' | 'decrease') => {
    scale.value = withSpring(1.1, {damping: 10}, () => {
      scale.value = withSpring(1);
    });
    action === 'increase' ? onIncrease() : onDecrease();
  };

  const isSmall = size === 'small';

  return (
    <Animated.View
      style={[
        styles.container,
        isSmall && styles.containerSmall,
        animatedStyle,
      ]}>
      <TouchableOpacity
        style={[styles.button, isSmall && styles.buttonSmall]}
        onPress={() => handlePress('decrease')}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, isSmall && styles.buttonTextSmall]}>
          −
        </Text>
      </TouchableOpacity>

      <View style={[styles.quantityContainer, isSmall && styles.quantitySmall]}>
        <Text style={[styles.quantity, isSmall && styles.quantityTextSmall]}>
          {quantity}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isSmall && styles.buttonSmall]}
        onPress={() => handlePress('increase')}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, isSmall && styles.buttonTextSmall]}>
          +
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.sm,
    ...SHADOWS.small,
  },
  containerSmall: {
    borderRadius: 6,
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmall: {
    width: 28,
    height: 28,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  buttonTextSmall: {
    fontSize: FONTS.sizes.lg,
  },
  quantityContainer: {
    minWidth: 40,
    paddingHorizontal: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantitySmall: {
    minWidth: 32,
    paddingHorizontal: SIZES.xs,
  },
  quantity: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  quantityTextSmall: {
    fontSize: FONTS.sizes.md,
  },
});
