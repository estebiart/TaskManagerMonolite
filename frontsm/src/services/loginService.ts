import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginService = async (payload: LoginPayload) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', payload);
    const { access_token, user } = response.data; 
    console.log("access_token:", access_token);
    
    return { access_token, user }; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error; 
  }
};
