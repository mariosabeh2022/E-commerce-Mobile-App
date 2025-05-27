import {useEffect} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (err) {
    console.error('Error getting FCM token:', err);
  }
};

const createNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  }
};

export const useNotifications = () => {
  useEffect(() => {
    requestUserPermission();
    getToken();
    createNotificationChannel();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received in foreground:', remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || '',
        android: {
          channelId: 'default',
        },
      });
    });

    return () => unsubscribe();
  }, []);
};
