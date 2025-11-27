import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {MotiView} from 'moti';
import {COLORS, FONTS, SIZES, SHADOWS} from '../constants/theme';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({icon, title, subtitle, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <View>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView
          from={{opacity: 0, translateY: -20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400}}
          style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Guest User</Text>
          <Text style={styles.userEmail}>guest@minimart.com</Text>
        </MotiView>

        <MotiView
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400, delay: 100}}
          style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="📦"
              title="My Orders"
              subtitle="View your order history"
              onPress={() => {}}
            />
            <MenuItem
              icon="📍"
              title="Saved Addresses"
              subtitle="Manage delivery addresses"
              onPress={() => {}}
            />
            <MenuItem
              icon="💳"
              title="Payment Methods"
              subtitle="Manage payment options"
              onPress={() => {}}
            />
          </View>
        </MotiView>

        <MotiView
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400, delay: 200}}
          style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="🔔"
              title="Notifications"
              subtitle="Manage notification settings"
              onPress={() => {}}
            />
            <MenuItem
              icon="🌙"
              title="Dark Mode"
              subtitle="Coming soon"
              onPress={() => {}}
            />
            <MenuItem
              icon="🌐"
              title="Language"
              subtitle="English"
              onPress={() => {}}
            />
          </View>
        </MotiView>

        <MotiView
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{type: 'timing', duration: 400, delay: 300}}
          style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="❓"
              title="Help & Support"
              subtitle="Get help with your orders"
              onPress={() => {}}
            />
            <MenuItem
              icon="📄"
              title="Terms & Conditions"
              onPress={() => {}}
            />
            <MenuItem
              icon="🔒"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <MenuItem
              icon="ℹ️"
              title="About"
              subtitle="Version 1.0.0"
              onPress={() => {}}
            />
          </View>
        </MotiView>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by MiniMart</Text>
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
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: SIZES.xxxl,
    marginTop: SIZES.lg,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.md,
    ...SHADOWS.small,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  userEmail: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  section: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: SIZES.md,
  },
  menuTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  menuSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 28,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.xxxl,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SIZES.xxxl,
  },
  footerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
});
