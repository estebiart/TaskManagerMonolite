import axios from 'axios';

export const refreshTokenService = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://127.0.0.1:8000/api/refresh', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; 
};
