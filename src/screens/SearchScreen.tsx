import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MotiView} from 'moti';
import {useFetch} from '../hooks/useFetch';
import {Product} from '../types';
import {ProductCard} from '../components/ProductCard';
import {COLORS, FONTS, SIZES} from '../constants/theme';

type RootStackParamList = {
  ProductDetails: {product: Product};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const {data: products} = useFetch<Product[]>('/products');

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', {product});
  };

  const renderProduct = ({item}: {item: Product}) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Text
            style={styles.clearIcon}
            onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      {searchQuery.length === 0 ? (
        <MotiView
          from={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'timing', duration: 400}}
          style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Search for products</Text>
          <Text style={styles.emptySubtitle}>
            Find your favorite groceries and essentials
          </Text>
        </MotiView>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <MotiView
          from={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'timing', duration: 400}}
          style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>😕</Text>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching with different keywords
          </Text>
        </MotiView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    paddingVertical: SIZES.md,
  },
  clearIcon: {
    fontSize: 18,
    color: COLORS.textSecondary,
    padding: SIZES.xs,
  },
  listContent: {
    padding: SIZES.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
});
