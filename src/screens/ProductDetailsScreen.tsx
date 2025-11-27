import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {MotiView} from 'moti';
import {Product} from '../types';
import {useCartStore} from '../store/cartStore';
import {QuantitySelector} from '../components/QuantitySelector';
import {formatPrice} from '../utils/formatCurrency';
import {COLORS, FONTS, SIZES, SHADOWS} from '../constants/theme';

type RootStackParamList = {
  ProductDetails: {product: Product};
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const {product} = route.params;

  const {items, addItem, updateQuantity} = useCartStore();
  const cartItem = items.find(item => item.id === product.id);

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView
          from={{opacity: 0, translateY: -20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400}}>
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
        </MotiView>

        <MotiView
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400, delay: 100}}
          style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.discount && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.price / (1 - product.discount / 100))}
              </Text>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Product Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Unit:</Text>
            <Text style={styles.infoValue}>{product.unit}</Text>
          </View>
        </MotiView>
      </ScrollView>

      <MotiView
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{type: 'timing', duration: 400, delay: 200}}
        style={styles.footer}>
        {cartItem ? (
          <QuantitySelector
            quantity={cartItem.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
            <Text style={styles.addButtonPrice}>{formatPrice(product.price)}</Text>
          </TouchableOpacity>
        )}
      </MotiView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONTS.sizes.xxxl,
    color: COLORS.text,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  discountBadge: {
    position: 'absolute',
    top: SIZES.lg,
    left: SIZES.lg,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.sm,
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
    marginTop: SIZES.sm,
  },
  name: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  unit: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  rating: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginRight: SIZES.md,
  },
  stockBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stockText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  price: {
    fontSize: FONTS.sizes.huge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SIZES.md,
  },
  originalPrice: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  infoLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  footer: {
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  addButtonPrice: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
});
