import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice'; 
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {

      dispatch(clearUser());
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_data');
	  router.push('/login');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
