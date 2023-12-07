import { useState } from 'react';

const Home = () => {
  const [subscription, setSubscription] = useState(null);

  const handleSubscribe = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const serviceWorker = await navigator.serviceWorker.register('/sw.js');
        const subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'your_public_key', // You need to generate your VAPID keys
        });
        setSubscription(subscription);    
         console.log('Subscription Endpoint:', subscription.endpoint);


        // Send the subscription to the server
        await fetch('http://localhost:4000/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    }
  };

  const handleUnsubscribe = async () => {
    if (subscription) {
      try {
        await subscription.unsubscribe();
        setSubscription(null);
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    }
  };

  return (
    <div>
      <h1>Next.js PWA with Push Notifications</h1>
      {subscription ? (
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
      ) : (
        <button onClick={handleSubscribe}>Subscribe</button>
      )}
    </div>
  );
};

export default Home;
