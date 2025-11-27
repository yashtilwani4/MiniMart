# 🚀 QUICK START - Run MiniMart App

## ✅ Current Status

✅ **Mock API is RUNNING** - Background process active at http://localhost:3000  
✅ **Dependencies INSTALLED** - All packages ready  
✅ **Code is READY** - No errors, production-ready  
✅ **API URL CONFIGURED** - Set for Android emulator  

---

## 🎯 Run the App (Choose Your Platform)

### Option 1: Android Emulator (Recommended)

**Prerequisites:**
- Android Studio installed
- Android emulator running (or physical device connected)

**Command:**
```bash
npm run android
```

The API URL is already configured for Android emulator! ✅

---

### Option 2: iOS Simulator (Mac Only)

**Step 1:** Update API URL

Edit `src/constants/theme.ts` line 64:
```typescript
export const API_BASE_URL = 'http://localhost:3000';
```

**Step 2:** Install iOS dependencies (first time only)
```bash
cd ios && pod install && cd ..
```

**Step 3:** Run the app
```bash
npm run ios
```

---

### Option 3: Physical Device

**Step 1:** Find your computer's IP address

Windows:
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

Mac/Linux:
```bash
ifconfig
```

**Step 2:** Update API URL

Edit `src/constants/theme.ts` line 64:
```typescript
export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000';
// Example: 'http://192.168.1.100:3000'
```

**Step 3:** Connect device and run
```bash
npm run android  # for Android
npm run ios      # for iOS
```

---

## 🎉 What Happens Next

1. Metro bundler will start
2. App will build and install on your device/emulator
3. App will launch automatically
4. You'll see the MiniMart home screen with products!

---

## 🧪 Test These Features

Once the app launches:

✅ **Home Screen**
- Scroll through 6 categories
- Browse 20 products
- Tap "ADD" on any product
- Watch the cart badge update

✅ **Product Details**
- Tap any product card
- View full details
- Add to cart
- Adjust quantity

✅ **Cart**
- Tap cart icon in bottom tab
- See all items
- Adjust quantities with +/- buttons
- Check delivery ETA ("Delivery in X mins")
- View total amount

✅ **Search**
- Tap search icon
- Type product name
- See filtered results

✅ **Animations**
- All buttons have smooth animations
- Cart badge pulses when updated
- Quantity selectors animate smoothly

---

## 🐛 Troubleshooting

### "Network request failed"
**Cause:** API URL doesn't match your setup  
**Fix:** Check `src/constants/theme.ts` line 64

For Android emulator: `http://10.0.2.2:3000` ✅ (already set)  
For iOS simulator: `http://localhost:3000`  
For physical device: `http://YOUR_IP:3000`

### "Unable to resolve module"
**Fix:**
```bash
npm start -- --reset-cache
```

### Build fails
**Android:**
```bash
cd android
gradlew clean
cd ..
npm run android
```

**iOS:**
```bash
cd ios
pod install
cd ..
npm run ios
```

### Mock API not responding
**Check if running:**
The mock API is already running in the background. You can verify by visiting:
http://localhost:3000/products in your browser

**If needed, restart it:**
```bash
npm run mock-api
```

---

## 📱 Expected Result

You should see:
- ✅ Beautiful green-themed UI (Blinkit style)
- ✅ 6 category circles at the top
- ✅ Grid of 20 products below
- ✅ Bottom navigation with 4 tabs
- ✅ Smooth animations everywhere

---

## 🎊 You're All Set!

The MiniMart app is **100% complete** and ready to use!

**Just run:** `npm run android` (or `npm run ios`)

---

## 📚 Need More Help?

Check these files:
- `README.md` - Complete documentation
- `FINAL_STATUS.txt` - Current status
- `RUN_COMMANDS.txt` - All commands
- `PROJECT_COMPLETE.md` - Full project overview

---

**Happy Shopping! 🛒**
