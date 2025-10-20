CoreUI Mobile (React Native)

Overview
- React Native mobile app inspired by the CoreUI Free React Admin Template.
- Includes authentication mock, dashboard with stats and mini charts, users list with detail view, forms, tables, charts, notifications, widgets, colors and typography, icons, plus settings with light/dark mode.
- Added domain pages: Create Order, Orders Process, Stock Incoming, Stock Outgoing, Current Stock for Outlet, Primary and Subdistributor scenarios.

Tech stack
- Expo (managed workflow)
- React Native
- React Navigation (Drawer + Native Stack)
- Zustand for simple app state (auth + theme)

Getting started
1) Install dependencies
   - cd mobile
   - npm install

2) Run the app
   - npm start
   - Use the Expo DevTools to run on an Android/iOS device or simulator, or press w to launch the web version.

Android build (APK or AAB) via Expo EAS
- Prereqs: npm i -g eas-cli and an Expo account.
- Preview APK (internal distribution):
  cd mobile && npm run build:android:apk
  Download the artifact URL and save it to mobile/release/CoreUI-Mobile-preview.apk, then commit.
- Production AAB (Play Store):
  cd mobile && npm run build:android:aab

Project structure
mobile/
  - app.json             Expo config
  - eas.json             EAS build profiles (preview APK, production AAB)
  - babel.config.js      Babel config with Reanimated plugin
  - index.js             Entry that registers App
  - src/
    - App.js             Top-level app with NavigationContainer
    - navigation/        Root + Drawer navigators
    - screens/           Dashboard, Users, UserDetail, Settings, About, Login, Tables, Charts, Forms, Buttons, Colors, Typography, Icons, Notifications, Widgets, OrderCreate, OrderProcess, StockIncoming, StockOutgoing, StockCurrent
    - components/        Header, StatCard, MiniChart
    - store/             authStore, themeStore, inventoryStore, ordersStore (Zustand)
  - release/             Place built APK/AAB here for committing if desired

Scripts
- npm start   Launch Expo dev server
- npm run android / ios  Build and run on device/simulator (requires native toolchains)
- npm run web  Run web preview via Expo
- npm run build:android:apk  Cloud build preview APK via EAS
- npm run build:android:aab  Cloud build production AAB via EAS

Notes
- This app uses only lightweight custom components to approximate charts and cards from the CoreUI template, avoiding large native chart dependencies.
- Authentication is mocked for demonstration purposes. Replace authStore with a real backend integration as needed.
- Orders and stock features are in-memory only for demo purposes.
