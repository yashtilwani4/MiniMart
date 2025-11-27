import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFetch} from '../hooks/useFetch';
import {Product, Category} from '../types';
import {ProductCard} from '../components/ProductCard';
import {CategoryCard} from '../components/CategoryCard';
import {
  ProductCardSkeleton,
  CategorySkeleton,
} from '../components/LoadingSkeleton';
import {COLORS, FONTS, SIZES} from '../constants/theme';

type RootStackParamList = {
  Home: undefined;
  ProductDetails: {product: Product};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    data: categories,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useFetch<Category[]>('/categories');

  const {
    data: products,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useFetch<Product[]>('/products');

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchCategories(), refetchProducts()]);
    setRefreshing(false);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', {product});
  };

  const renderCategory = ({item}: {item: Category}) => (
    <CategoryCard category={item} onPress={() => {}} />
  );

  const renderProduct = ({item}: {item: Product}) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>MiniMart</Text>
          <Text style={styles.headerSubtitle}>Groceries in minutes</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          {categoriesLoading ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4, 5].map(i => (
                <CategorySkeleton key={i} />
              ))}
            </ScrollView>
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          )}
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Products</Text>
          {productsLoading ? (
            <View style={styles.productsGrid}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <ProductCardSkeleton key={i} />
              ))}
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {products?.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  categoriesList: {
    paddingBottom: SIZES.sm,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
