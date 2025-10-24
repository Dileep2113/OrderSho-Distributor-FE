# Permissions Utility

This directory contains utilities for handling permissions in the React Native app, specifically addressing the POST_NOTIFICATIONS permission for Android 13+.

## Files

- **permissions.ts** - Primary implementation using `PERMISSIONS.ANDROID.POST_NOTIFICATIONS` (requires react-native-permissions 4.1.5+)
- **permissions.fallback.ts** - Fallback implementation using string literal `"android.permission.POST_NOTIFICATIONS" as Permission`
- **index.ts** - Exports the permissions utilities

## Solution Overview

### Problem
The `POST_NOTIFICATIONS` permission was added in Android 13 (API level 33) and requires react-native-permissions version 3.6.0 or higher. Using an older version results in TypeScript errors:

```
Property 'POST_NOTIFICATIONS' does not exist on type 'Readonly<{ readonly ACCEPT_HANDOVER: "android.permission.ACCEPT_HANDOVER"; ...
```

### Primary Solution (Implemented)

Updated `react-native-permissions` to version 4.1.5 which includes full support for `POST_NOTIFICATIONS`:

```typescript
import { PERMISSIONS } from 'react-native-permissions';

// This now works without TypeScript errors
const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
```

### Fallback Solution (Alternative)

If you cannot update the library, use the string literal approach in `permissions.fallback.ts`:

```typescript
const permission = "android.permission.POST_NOTIFICATIONS" as Permission;
```

## Usage

### Request Notification Permission

```typescript
import { requestNotificationPermission } from './utils/permissions';

const granted = await requestNotificationPermission();
if (granted) {
  console.log('Notification permission granted!');
}
```

### Check Notification Permission

```typescript
import { checkNotificationPermission } from './utils/permissions';

const isGranted = await checkNotificationPermission();
console.log('Permission status:', isGranted);
```

### Using the Example Component

See `components/NotificationPermissionExample.tsx` for a complete example:

```typescript
import NotificationPermissionExample from './components/NotificationPermissionExample';

// In your screen component
<NotificationPermissionExample />
```

## Android Configuration

For Android 13+ (API level 33+), you need to add the permission to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```

Note: This permission is automatically handled by Expo when using EAS Build.

## iOS Considerations

iOS handles notifications differently through the native notification API. The utility provides a consistent interface but iOS-specific implementation should use:
- `expo-notifications` for Expo projects
- `@react-native-firebase/messaging` for Firebase Cloud Messaging
- Native iOS notification APIs

## Requirements

- react-native-permissions: ^4.1.5 (or ^3.6.0 minimum for POST_NOTIFICATIONS)
- Android SDK 33+ for POST_NOTIFICATIONS
- React Native 0.70+

## References

- [react-native-permissions Documentation](https://github.com/zoontek/react-native-permissions)
- [Android POST_NOTIFICATIONS](https://developer.android.com/develop/ui/views/notifications/notification-permission)
- [React Native Permissions Guide](https://reactnative.dev/docs/permissionsandroid)
