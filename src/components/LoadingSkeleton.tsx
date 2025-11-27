import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {COLORS, SIZES} from '../constants/theme';

const {width} = Dimensions.get('window');

export const ProductCardSkeleton: React.FC = () => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, {duration: 1500}), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
    return {opacity};
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, animatedStyle]} />
      <Animated.View style={[styles.title, animatedStyle]} />
      <Animated.View style={[styles.price, animatedStyle]} />
      <Animated.View style={[styles.button, animatedStyle]} />
    </View>
  );
};

export const CategorySkeleton: React.FC = () => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, {duration: 1500}), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
    return {opacity};
  });

  return (
    <View style={styles.categoryCard}>
      <Animated.View style={[styles.categoryImage, animatedStyle]} />
      <Animated.View style={[styles.categoryText, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - SIZES.lg * 3) / 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  title: {
    height: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: SIZES.xs,
  },
  price: {
    height: 14,
    width: '50%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: SIZES.sm,
  },
  button: {
    height: 32,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.sm,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.xs,
  },
  categoryText: {
    width: 60,
    height: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
  },
});
