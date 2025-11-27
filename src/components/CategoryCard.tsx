import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {MotiView} from 'moti';
import {Category} from '../types';
import {COLORS, FONTS, SIZES} from '../constants/theme';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
}) => {
  return (
    <MotiView
      from={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{type: 'timing', duration: 300}}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.8}>
        <MotiView
          style={[styles.imageContainer, {backgroundColor: category.color}]}
          from={{scale: 1}}
          animate={{scale: 1}}
          transition={{type: 'spring'}}>
          <Image
            source={{uri: category.image}}
            style={styles.image}
            resizeMode="contain"
          />
        </MotiView>
        <Text style={styles.name} numberOfLines={1}>
          {category.name}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: SIZES.md,
    width: 80,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  image: {
    width: 45,
    height: 45,
  },
  name: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '500',
  },
});
