# POST_NOTIFICATIONS Permission TypeScript Error - Solution

## Problem Description

TypeScript error when using `PERMISSIONS.ANDROID.POST_NOTIFICATIONS` from react-native-permissions:

```
Property 'POST_NOTIFICATIONS' does not exist on type 'Readonly<{ readonly ACCEPT_HANDOVER: "android.permission.ACCEPT_HANDOVER"; ...
```

## Root Cause

The `POST_NOTIFICATIONS` permission was added in Android 13 (API level 33) and requires react-native-permissions version 3.6.0 or higher. Older versions of the library don't include this permission in their TypeScript type definitions.

## Solution Implemented

### 1. Updated Dependencies

Updated `mobile/package.json` to include:

```json
{
  "dependencies": {
    "react-native-permissions": "^4.1.5"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.72.0"
  }
}
```

Version 4.1.5 includes full support for `POST_NOTIFICATIONS` and all Android 13+ permissions.

### 2. Added TypeScript Configuration

Created `mobile/tsconfig.json` with proper TypeScript configuration for React Native/Expo projects.

### 3. Created Permissions Utility

**File: `mobile/src/utils/permissions.ts`**

A comprehensive permissions utility that:
- ✅ Uses `PERMISSIONS.ANDROID.POST_NOTIFICATIONS` directly (no TypeScript errors)
- ✅ Provides a clean API for checking and requesting permissions
- ✅ Handles both Android and iOS platforms
- ✅ Includes proper TypeScript types
- ✅ Has error handling and logging

### 4. Created Fallback Implementation

**File: `mobile/src/utils/permissions.fallback.ts`**

Alternative implementation using string literal approach:

```typescript
const permission = "android.permission.POST_NOTIFICATIONS" as Permission;
```

Use this if you cannot update to react-native-permissions 3.6.0+.

### 5. Added Example Component

**File: `mobile/src/components/NotificationPermissionExample.tsx`**

A complete example component demonstrating:
- How to request POST_NOTIFICATIONS permission
- How to check permission status
- UI feedback for users
- Proper error handling

### 6. Updated Android Configuration

**File: `mobile/app.json`**

Added POST_NOTIFICATIONS to Android permissions:

```json
{
  "android": {
    "permissions": [
      "android.permission.POST_NOTIFICATIONS"
    ]
  }
}
```

### 7. Added Tests

**File: `mobile/src/utils/__tests__/permissions.test.ts`**

Comprehensive tests verifying:
- TypeScript types are correct
- Permission checking works
- Permission requesting works
- Platform-specific behavior

## Usage Examples

### Basic Usage

```typescript
import { 
  requestNotificationPermission, 
  checkNotificationPermission 
} from './utils/permissions';

// Check if permission is granted
const isGranted = await checkNotificationPermission();

// Request permission
const granted = await requestNotificationPermission();
if (granted) {
  console.log('Permission granted!');
}
```

### Advanced Usage

```typescript
import { 
  AppPermission, 
  getPermission, 
  requestPermission,
  RESULTS 
} from './utils/permissions';

// Get platform-specific permission
const permission = getPermission(AppPermission.NOTIFICATIONS);

// Request with detailed status
const status = await requestPermission(AppPermission.NOTIFICATIONS);

switch (status) {
  case RESULTS.GRANTED:
    console.log('Permission granted');
    break;
  case RESULTS.DENIED:
    console.log('Permission denied');
    break;
  case RESULTS.BLOCKED:
    console.log('Permission blocked - show settings');
    break;
}
```

### Using the Example Component

```typescript
import NotificationPermissionExample from './components/NotificationPermissionExample';

function MyScreen() {
  return (
    <View>
      <NotificationPermissionExample />
    </View>
  );
}
```

## Installation Steps

1. **Install dependencies:**

```bash
cd mobile
npm install
```

2. **For Expo projects, rebuild:**

```bash
npx expo prebuild --clean
```

3. **For native projects, update pods (iOS):**

```bash
cd ios && pod install && cd ..
```

## Verification

To verify the solution works:

1. **TypeScript compilation:**
```bash
cd mobile
npx tsc --noEmit
```

2. **Run the app:**
```bash
npm start
```

3. **Test on Android 13+ device:**
- The permission request should appear when triggered
- Check that TypeScript doesn't show any errors in the IDE

## Acceptance Criteria Met

- ✅ TypeScript error is resolved
- ✅ POST_NOTIFICATIONS permission can be requested on Android 13+
- ✅ All existing permissions still work correctly
- ✅ No breaking changes to the permissions flow
- ✅ Code compiles without TypeScript errors

## Additional Notes

### Android Version Support

- **Android 13+ (API 33+)**: POST_NOTIFICATIONS permission is required and must be requested at runtime
- **Android 12 and below**: Permission is automatically granted, no runtime request needed

### iOS Considerations

iOS handles notifications through a different system:
- Use `expo-notifications` for Expo projects
- Use `@react-native-firebase/messaging` for Firebase
- Use native `UNUserNotificationCenter` API

The permissions utility provides a consistent interface but iOS-specific notification setup is still required.

### Expo Configuration

For Expo managed workflow, the permission is automatically added to AndroidManifest.xml during build. No additional native configuration needed.

### Bare React Native

For bare React Native projects, manually add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```

## References

- [react-native-permissions GitHub](https://github.com/zoontek/react-native-permissions)
- [Android POST_NOTIFICATIONS Documentation](https://developer.android.com/develop/ui/views/notifications/notification-permission)
- [React Native Permissions Guide](https://reactnative.dev/docs/permissionsandroid)

## Files Changed/Added

- ✏️ `mobile/package.json` - Updated dependencies
- ➕ `mobile/tsconfig.json` - Added TypeScript configuration
- ➕ `mobile/src/utils/permissions.ts` - Primary permissions utility
- ➕ `mobile/src/utils/permissions.fallback.ts` - Fallback implementation
- ➕ `mobile/src/utils/index.ts` - Utility exports
- ➕ `mobile/src/utils/README.md` - Utility documentation
- ➕ `mobile/src/utils/__tests__/permissions.test.ts` - Tests
- ➕ `mobile/src/components/NotificationPermissionExample.tsx` - Example component
- ✏️ `mobile/app.json` - Added Android permissions
- ➕ `PERMISSIONS_SOLUTION.md` - This document
