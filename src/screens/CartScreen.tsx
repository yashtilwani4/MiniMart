import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {MotiView} from 'moti';
import {useCartStore} from '../store/cartStore';
import {QuantitySelector} from '../components/QuantitySelector';
import {formatPrice} from '../utils/formatCurrency';
import {getDeliveryETA} from '../utils/deliveryEstimator';
import {COLORS, FONTS, SIZES, SHADOWS} from '../constants/theme';
import {CartItem} from '../types';

export const CartScreen: React.FC = () => {
  const {items, updateQuantity, getTotalPrice, getTotalItems, clearCart} =
    useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryETA = getDeliveryETA(totalItems);

  const handleIncrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity - 1);
  };

  const renderCartItem = ({item}: {item: CartItem}) => (
    <MotiView
      from={{opacity: 0, translateX: -50}}
      animate={{opacity: 1, translateX: 0}}
      exit={{opacity: 0, translateX: 50}}
      transition={{type: 'timing', duration: 300}}>
      <View style={styles.cartItem}>
        <Image source={{uri: item.image}} style={styles.itemImage} />

        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemUnit}>{item.unit}</Text>
          <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
        </View>

        <View style={styles.itemActions}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item.id, item.quantity)}
            onDecrease={() => handleDecrease(item.id, item.quantity)}
            size="small"
          />
          <Text style={styles.itemTotal}>
            {formatPrice(item.price * item.quantity)}
          </Text>
        </View>
      </View>
    </MotiView>
  );

  const EmptyCart = () => (
    <MotiView
      from={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      transition={{type: 'timing', duration: 400}}
      style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add products to get started with your order
      </Text>
    </MotiView>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <MotiView
        from={{opacity: 0, translateY: -20}}
        animate={{opacity: 1, translateY: 0}}
        transition={{type: 'timing', duration: 300}}
        style={styles.deliveryBanner}>
        <Text style={styles.deliveryIcon}>⚡</Text>
        <View>
          <Text style={styles.deliveryTitle}>{deliveryETA}</Text>
          <Text style={styles.deliverySubtitle}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
          </Text>
        </View>
      </MotiView>

      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <MotiView
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{type: 'timing', duration: 400}}
        style={styles.footer}>
        <View style={styles.billDetails}>
          <Text style={styles.billTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>{formatPrice(totalPrice)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={[styles.billValue, styles.freeText]}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Text style={styles.checkoutButtonPrice}>
            {formatPrice(totalPrice)}
          </Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearButton: {
    fontSize: FONTS.sizes.md,
    color: COLORS.error,
    fontWeight: '600',
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.lg,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.lg,
    borderRadius: SIZES.md,
    ...SHADOWS.small,
  },
  deliveryIcon: {
    fontSize: 32,
    marginRight: SIZES.md,
  },
  deliveryTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  deliverySubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  listContent: {
    padding: SIZES.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.sm,
    backgroundColor: COLORS.lightGray,
  },
  itemDetails: {
    flex: 1,
    marginLeft: SIZES.md,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SIZES.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xxxl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: SIZES.lg,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  billDetails: {
    marginBottom: SIZES.lg,
  },
  billTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  billLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  billValue: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  freeText: {
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.md,
  },
  totalLabel: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  checkoutButtonPrice: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
});
