// components/NotificationButton.js
import { useState } from 'react';

const NotificationButton = () => {
  const [notificationPermission, setNotificationPermission] = useState('');

  const askNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: 'your-public-key' });

        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  return (
    <div>
      <p>Notification Permission: {notificationPermission}</p>
      <button onClick={askNotificationPermission}>
        Request Notification Permission
      </button>
      <button onClick={sendTestNotification}>
        Send Test Notification
      </button>
    </div>
  );
};

export default NotificationButton;
