CoreUI Mobile (React Native)

Overview
- React Native mobile app inspired by the CoreUI Free React Admin Template.
- Includes authentication mock, dashboard with stats and mini charts, users list with detail view, and settings with light/dark mode.

Tech stack
- Expo (managed workflow)
- React Native
- React Navigation (Drawer + Native Stack)
- Zustand for simple app state (auth + theme)

Getting started
1) Install dependencies
   - npm install -g expo-cli (optional)
   - cd mobile
   - npm install

2) Run the app
   - npm start
   - Use the Expo DevTools to run on an Android/iOS device or simulator, or press w to launch the web version.

Project structure
mobile/
  - app.json             Expo config
  - babel.config.js      Babel config with Reanimated plugin
  - index.js             Entry that registers App
  - src/
    - App.js             Top-level app with NavigationContainer
    - navigation/        Root + Drawer navigators
    - screens/           Dashboard, Users, UserDetail, Settings, About, Login
    - components/        Header, StatCard, MiniChart
    - store/             authStore, themeStore (Zustand)

Scripts
- npm start   Launch Expo dev server
- npm run android / ios  Build and run on device/simulator (requires native toolchains)
- npm run web  Run web preview via Expo

Notes
- This app uses only lightweight custom components to approximate charts and cards from the CoreUI template, avoiding large native chart dependencies.
- Authentication is mocked for demonstration purposes. Replace authStore with a real backend integration as needed.
