// components/CheckLogin.js

import { useEffect, useState } from 'react';

const CheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking the cookie
    const userLoggedIn = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('userLoggedIn='));

    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <div>
      <h2>Check Login Status</h2>
      {isLoggedIn ? (
        <p>User is logged in</p>
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default CheckLogin;
