import axios from 'axios';

export const registerService = async (data: {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', data);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al registrar');
  }
};
