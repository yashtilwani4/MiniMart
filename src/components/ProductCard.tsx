import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {MotiView} from 'moti';
import {Product} from '../types';
import {useCartStore} from '../store/cartStore';
import {QuantitySelector} from './QuantitySelector';
import {formatPrice} from '../utils/formatCurrency';
import {COLORS, FONTS, SIZES, SHADOWS} from '../constants/theme';

const {width} = Dimensions.get('window');

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const {items, addItem, updateQuantity} = useCartStore();
  const cartItem = items.find(item => item.id === product.id);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <MotiView
      from={{opacity: 0, translateY: 20}}
      animate={{opacity: 1, translateY: 0}}
      transition={{type: 'timing', duration: 300}}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: product.image}}
              style={styles.image}
              resizeMode="contain"
            />
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}% OFF</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.unit}>{product.unit}</Text>

            <View style={styles.footer}>
              <View>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                {product.discount && (
                  <Text style={styles.originalPrice}>
                    {formatPrice(
                      product.price / (1 - product.discount / 100)
                    )}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.actionContainer}>
          {cartItem ? (
            <QuantitySelector
              quantity={cartItem.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              size="small"
            />
          ) : (
            <MotiView
              from={{scale: 0.8}}
              animate={{scale: 1}}
              transition={{type: 'spring', damping: 15}}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCart}
                activeOpacity={0.8}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </View>
      </Animated.View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - SIZES.lg * 3) / 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  unit: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  price: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  actionContainer: {
    marginTop: SIZES.xs,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.sm,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
});
