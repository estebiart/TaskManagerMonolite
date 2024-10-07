"use client";
import { store } from '@/redux/store/store';
import React from 'react';
import { Provider } from 'react-redux';
import './globals.css';
import { AuthProvider } from '@/context/authContext';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

  /**
   * Checks if the user is authenticated.
   *
   * Verifies if the user data exists in the localStorage and if so,
   * loads it into the global state. If not authenticated, redirects to
   * the login page.
   *
   * @returns null
   */
const UserChecker: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');
    const userData = localStorage.getItem('user_data');

    if (token && userId && userData) {
      dispatch(setUser({ id: Number(userId), token, user: JSON.parse(userData) }));
    } else {
      router.push('/'); 
    }
  }, [dispatch, router]);

  return null; 
};

/**
 * The root layout component of the application. It wraps the children with the Redux
 * store and the authentication context provider. It also includes a component that
 * checks if the user is logged in and redirects to the home page if not.
 *
 * @param {{ children: React.ReactNode }} props The children to render.
 * @returns {React.ReactElement} The rendered root layout.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserChecker />
        <html lang="en">
          <body>{children}</body>
        </html>
      </AuthProvider>
    </Provider>
  );
};

export default RootLayout;
