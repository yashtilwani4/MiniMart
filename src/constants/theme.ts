export const COLORS = {
  primary: '#54B435',
  secondary: '#F8C630',
  background: '#FFFFFF',
  cardBackground: '#F9F9F9',
  text: '#2D2D2D',
  textSecondary: '#666666',
  border: '#E5E5E5',
  error: '#FF3B30',
  success: '#34C759',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 32,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// API Configuration
// For Android Emulator: use 'http://10.0.2.2:3000'
// For iOS Simulator: use 'http://localhost:3000'
// For Physical Device: use 'http://YOUR_IP_ADDRESS:3000'
export const API_BASE_URL = 'http://10.0.2.2:3000';
