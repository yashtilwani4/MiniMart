# 🛒 MiniMart - Quick Commerce Mobile App

A fully functional, production-ready React Native quick-commerce mobile application inspired by Blinkit. Built with TypeScript, Zustand state management, React Navigation, and beautiful Reanimated animations.

![React Native](https://img.shields.io/badge/React_Native-0.73-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Zustand](https://img.shields.io/badge/Zustand-4.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🏠 Home Screen
- Fetch categories and products from mock API
- Horizontal scrollable categories
- Product grid with 2-column layout
- Product cards with image, name, price, and Add button
- Smooth Reanimated press animations
- Floating cart badge with item count
- Pull-to-refresh functionality

### 📦 Product Details Screen
- Large product image display
- Product information (title, price, rating, description)
- Stock availability indicator
- Discount badges
- Animated Add to Cart button
- Quantity selector with smooth animations
- Category and unit information

### 🛒 Cart Screen
- Real-time cart management with Zustand
- Add/remove/update quantity functionality
- Animated quantity selectors
- Real-time total amount calculation
- Delivery ETA estimator ("Delivery in 18 mins")
- Bill details breakdown
- Empty cart state with beautiful UI
- Clear all items functionality

### 🔍 Search Screen
- Real-time product search
- Filter products by name
- Beautiful empty states
- Same product grid layout as home

### 👤 Profile Screen
- User profile display
- Account management options
- Preferences settings
- Support and help section
- Beautiful menu items with icons

### 🎨 UI/UX Features
- Blinkit-inspired clean design
- Rounded cards and modern aesthetics
- Smooth animations using Reanimated v3 and Moti
- Loading skeletons for better UX
- Responsive layout
- Bottom tab navigation
- Stack navigation for details

### ⚡ Animations
- Product card scale-on-press
- Add button bounce effect
- Cart badge pulse animation
- Screen transitions
- Quantity selector animations
- Shimmer loading effects

## 🛠️ Tech Stack

- **React Native** 0.73.2 - Mobile framework
- **TypeScript** 5.3 - Type safety
- **Zustand** 4.4 - State management with persistence
- **React Navigation** 6.x - Navigation (Stack + Bottom Tabs)
- **React Native Reanimated** 3.6 - Smooth animations
- **Moti** 0.28 - Declarative animations
- **Axios** - HTTP client
- **JSON Server** - Mock REST API
- **AsyncStorage** - Local data persistence

## 📁 Project Structure

```
MiniMart/
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # Reusable components
│   │   ├── CartBadge.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ProductCard.tsx
│   │   └── QuantitySelector.tsx
│   ├── constants/           # App constants and theme
│   │   └── theme.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useFetch.ts
│   ├── navigation/         # Navigation configuration
│   │   ├── BottomTabs.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── CartScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProductDetailsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SearchScreen.tsx
│   ├── store/              # Zustand stores
│   │   └── cartStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── deliveryEstimator.ts
│       └── formatCurrency.ts
├── mock-api/               # Mock backend
│   ├── db.json
│   └── instructions.txt
├── App.tsx                 # Root component
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio

### Installation

1. **Clone or create the project:**
   ```bash
   cd MiniMart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (Mac only):**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

1. **Start the Mock API Server:**
   ```bash
   npm run mock-api
   ```
   The API will run at `http://localhost:3000`

2. **Update API URL (if needed):**
   
   Edit `src/constants/theme.ts`:
   
   - **Android Emulator:** `http://10.0.2.2:3000`
   - **iOS Simulator:** `http://localhost:3000`
   - **Physical Device:** `http://YOUR_IP_ADDRESS:3000`

3. **Start Metro Bundler:**
   ```bash
   npm start
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```

5. **Run on iOS:**
   ```bash
   npm run ios
   ```

## 🎯 Key Features Explained

### Delivery ETA Estimator

The app includes a smart delivery time calculator with the following logic:
- **Base time:** 10-15 minutes (random)
- **Item-based delay:** +1 minute per 3 items in cart
- **Random delay:** +2-5 minutes for realistic estimation

Located in: `src/utils/deliveryEstimator.ts`

### Cart Management with Zustand

- Persistent cart state using AsyncStorage
- Add, remove, and update item quantities
- Real-time total calculations
- Automatic cart badge updates

Located in: `src/store/cartStore.ts`

### Animations

The app uses two animation libraries:

1. **React Native Reanimated** - For performant native animations
   - Quantity selector animations
   - Product card press effects
   - Cart badge pulse

2. **Moti** - For declarative animations
   - Screen entrance animations
   - Loading skeletons
   - Fade and scale effects

## 📱 API Endpoints

The mock API provides the following endpoints:

```
GET /categories          - List all categories
GET /products            - List all products
GET /products?category=Fruits  - Filter by category
GET /banners             - List banners
```

## 🎨 Customization

### Theme Colors

Edit `src/constants/theme.ts` to customize:
- Primary color
- Secondary color
- Text colors
- Spacing
- Font sizes
- Shadows

### Adding Products

Edit `mock-api/db.json` to add/modify:
- Products
- Categories
- Banners

## 🔧 Troubleshooting

### Cannot connect to API

1. Check if mock API is running: `npm run mock-api`
2. Verify API_BASE_URL in `src/constants/theme.ts`
3. For Android emulator, use `10.0.2.2` instead of `localhost`
4. For physical device, use your computer's local IP

### Animation issues

1. Make sure Reanimated plugin is in `babel.config.js`
2. Clear cache: `npm start -- --reset-cache`
3. Rebuild the app

### Build errors

1. Clean and rebuild:
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

## 📦 Building for Production

### Android

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/`

### iOS

1. Open `ios/MiniMart.xcworkspace` in Xcode
2. Select "Product" > "Archive"
3. Follow App Store submission process

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Blinkit's UI/UX
- Icons from Flaticon
- Built with React Native and TypeScript

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the mock API instructions

---

**Made with ❤️ by MiniMart Team**

Happy Coding! 🚀
