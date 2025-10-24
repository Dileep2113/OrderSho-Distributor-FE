import { Platform } from 'react-native';
import { 
  PERMISSIONS, 
  RESULTS, 
  Permission, 
  check, 
  request,
  PermissionStatus
} from 'react-native-permissions';

/**
 * Permission types for the app
 */
export enum AppPermission {
  NOTIFICATIONS = 'NOTIFICATIONS',
  CAMERA = 'CAMERA',
  LOCATION = 'LOCATION',
}

/**
 * Get the platform-specific permission constant
 */
export const getPermission = (permission: AppPermission): Permission => {
  switch (permission) {
    case AppPermission.NOTIFICATIONS:
      if (Platform.OS === 'android') {
        // POST_NOTIFICATIONS is available in react-native-permissions 3.6.0+
        // for Android 13+ (API level 33+)
        return PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
      } else if (Platform.OS === 'ios') {
        // iOS uses a different approach for notifications through the native module
        // This is a placeholder - iOS notifications are handled differently
        return PERMISSIONS.IOS.MEDIA_LIBRARY; // Placeholder
      }
      break;
    
    case AppPermission.CAMERA:
      return Platform.OS === 'android' 
        ? PERMISSIONS.ANDROID.CAMERA 
        : PERMISSIONS.IOS.CAMERA;
    
    case AppPermission.LOCATION:
      return Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    
    default:
      throw new Error(`Unknown permission: ${permission}`);
  }
  
  throw new Error(`Permission not supported on platform: ${Platform.OS}`);
};

/**
 * Check if a permission has been granted
 */
export const checkPermission = async (permission: AppPermission): Promise<boolean> => {
  try {
    const platformPermission = getPermission(permission);
    const result = await check(platformPermission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

/**
 * Request a permission from the user
 */
export const requestPermission = async (permission: AppPermission): Promise<PermissionStatus> => {
  try {
    const platformPermission = getPermission(permission);
    const result = await request(platformPermission);
    return result;
  } catch (error) {
    console.error('Error requesting permission:', error);
    return RESULTS.UNAVAILABLE;
  }
};

/**
 * Request notification permission specifically
 * Returns true if granted, false otherwise
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    // Only request on Android 13+ (API level 33+)
    if (Platform.OS === 'android') {
      const result = await requestPermission(AppPermission.NOTIFICATIONS);
      return result === RESULTS.GRANTED;
    }
    
    // For iOS, notifications are handled through a different API
    // You would typically use @react-native-firebase/messaging or expo-notifications
    return true;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Check if notification permission is granted
 */
export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      return await checkPermission(AppPermission.NOTIFICATIONS);
    }
    
    // For iOS, assume granted (handle through native notification API)
    return true;
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

export { RESULTS, PermissionStatus };
