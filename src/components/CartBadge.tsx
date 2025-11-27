import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {useCartStore} from '../store/cartStore';
import {COLORS, FONTS, SIZES} from '../constants/theme';

export const CartBadge: React.FC = () => {
  const totalItems = useCartStore(state => state.getTotalItems());
  const scale = useSharedValue(1);

  useEffect(() => {
    if (totalItems > 0) {
      scale.value = withSequence(
        withSpring(1.3, {damping: 8}),
        withSpring(1, {damping: 8})
      );
    }
  }, [totalItems]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  if (totalItems === 0) return null;

  return (
    <Animated.View style={[styles.badge, animatedStyle]}>
      <Text style={styles.badgeText}>{totalItems}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xs,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
});
