# 🚀 MiniMart - Quick Setup Guide

Follow these steps to get the MiniMart app running on your machine.

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Mock API
Open a new terminal and run:
```bash
npm run mock-api
```
Keep this terminal running. You should see:
```
Resources
http://localhost:3000/categories
http://localhost:3000/products
http://localhost:3000/banners
```

### Step 3: Configure API URL

**For Android Emulator:**
Edit `src/constants/theme.ts` and change:
```typescript
export const API_BASE_URL = 'http://10.0.2.2:3000';
```

**For iOS Simulator:**
```typescript
export const API_BASE_URL = 'http://localhost:3000';
```

**For Physical Device:**
1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`
2. Update to:
```typescript
export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000';
// Example: 'http://192.168.1.100:3000'
```

### Step 4: Install iOS Pods (Mac only)
```bash
cd ios && pod install && cd ..
```

### Step 5: Run the App

**Start Metro:**
```bash
npm start
```

**Run on Android:**
Open a new terminal:
```bash
npm run android
```

**Run on iOS:**
Open a new terminal:
```bash
npm run ios
```

## ✅ Verification

Once the app launches, you should see:
1. ✅ Home screen with categories
2. ✅ Product grid with images
3. ✅ Bottom navigation tabs
4. ✅ Ability to add products to cart
5. ✅ Cart badge showing item count

## 🐛 Common Issues & Fixes

### Issue 1: "Network request failed"
**Solution:** 
- Verify mock API is running (`npm run mock-api`)
- Check API_BASE_URL in `src/constants/theme.ts`
- For Android emulator, use `10.0.2.2` not `localhost`

### Issue 2: "Unable to resolve module"
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue 3: Android build fails
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue 4: iOS build fails
**Solution:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Issue 5: Reanimated errors
**Solution:**
1. Check `babel.config.js` has `react-native-reanimated/plugin`
2. Clear cache: `npm start -- --reset-cache`
3. Rebuild app

## 📱 Testing on Physical Device

### Android:
1. Enable USB debugging on your device
2. Connect via USB
3. Run: `adb devices` to verify connection
4. Run: `npm run android`
5. Update API_BASE_URL to your computer's IP

### iOS:
1. Open `ios/MiniMart.xcworkspace` in Xcode
2. Select your device from the device dropdown
3. Click Run button
4. Update API_BASE_URL to your computer's IP

## 🎯 What to Test

1. **Home Screen:**
   - Categories scroll horizontally
   - Products load and display
   - Pull to refresh works

2. **Product Details:**
   - Tap any product
   - View details
   - Add to cart

3. **Cart:**
   - View cart items
   - Increase/decrease quantity
   - See delivery ETA
   - Check total calculation

4. **Search:**
   - Search for products
   - Filter results

5. **Animations:**
   - Product card press animation
   - Cart badge pulse
   - Quantity selector animations

## 🔧 Development Tips

### Hot Reload
- Press `r` in Metro terminal to reload
- Press `d` to open developer menu
- Shake device to open developer menu

### Debugging
1. Open developer menu
2. Select "Debug"
3. Open Chrome DevTools

### Viewing API Data
Visit in browser:
- http://localhost:3000/products
- http://localhost:3000/categories

### Modifying Products
Edit `mock-api/db.json` and save. Changes reflect immediately.

## 📚 Next Steps

1. **Customize Theme:**
   - Edit `src/constants/theme.ts`
   - Change colors, fonts, spacing

2. **Add More Products:**
   - Edit `mock-api/db.json`
   - Add new categories and products

3. **Enhance Features:**
   - Add user authentication
   - Implement real payment gateway
   - Add order history
   - Integrate push notifications

4. **Deploy:**
   - Build release APK/IPA
   - Submit to Play Store/App Store

## 🆘 Need Help?

1. Check README.md for detailed documentation
2. Review mock-api/instructions.txt for API setup
3. Check React Native documentation
4. Review error messages carefully

## 🎉 Success!

If you see the app running with products loading, congratulations! 🎊

You now have a fully functional quick-commerce app running locally.

---

**Happy Coding! 🚀**
