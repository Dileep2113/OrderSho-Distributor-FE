Release artifacts

This folder is intended to store generated Android APK/AAB artifacts for convenience.

How to generate an Android APK (cloud build via Expo EAS):
1. Install EAS CLI globally: npm i -g eas-cli
2. Authenticate: eas login (or ensure CI has EXPO_TOKEN configured)
3. From the mobile/ directory, run: npm run build:android:apk
   - This uses the 'preview' profile in eas.json which builds an APK for internal distribution.
4. After the build completes, download the artifact URL printed by EAS, and save it here as CoreUI-Mobile-preview.apk
5. Commit the file if binary artifacts are allowed in your repository.

Production store submission (AAB):
- Run: npm run build:android:aab
- This builds an Android App Bundle (AAB) suitable for Play Store.

Note: APK/AAB files are not generated in this repository automatically because they require external signing and cloud build infrastructure. Use EAS as described above.
