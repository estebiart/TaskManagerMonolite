import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { loginService } from '@/services/loginService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import { LoginFormValues } from '@/interfaces/LoginForm.interface';
import { loginValidationSchema } from '@/validation/loginValidationSchema';

  /**
   * A component for handling user login.
   * It renders a form with email and password inputs,
   * and a submit button that calls the loginService
   * to authenticate the user and dispatch the setUser
   * action to the Redux store if the login is successful.
   * @returns A JSX element representing the login form
   */
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const dispatch = useDispatch(); 
  const router = useRouter();

  /**
   * Handle the login form submission.
   * It calls the loginService to authenticate the user and then
   * dispatch the setUser action to the Redux store if the login is successful.
   * If the login fails, it sets an error message in the form.
   * @param data The form data
   */
  const onSubmit = async (data: LoginFormValues) => {
    try {
		const result = await loginService(data);
		dispatch(setUser({ id: result.user.id, token: result.access_token, user: result.user }));
		localStorage.setItem('access_token', result.access_token);
		localStorage.setItem('user_id', result.user.id.toString());
		localStorage.setItem('user_data', JSON.stringify(result.user));
		router.push('/dashboard');
    } catch (error: any) {
		console.error('Error al iniciar sesión:', error.message);
		setError('server', {
			type: 'manual',
			message: error.message || 'Error desconocido al iniciar sesión',
		});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        placeholder="Email"
        register={register}
        errors={errors}
        className="login-form__input"
      />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
        register={register}
        errors={errors}
        className="login-form__input"
      />
      {errors.server && (
        <div className="error-message">
          {errors.server.message}
        </div>
      )}
      <Button
	    text='Iniciar Sesión'
        isDisabled={(!isValid && isSubmitted) || isSubmitting}
        isSubmitting={isSubmitting}/>
    </form>
  );
};

export default LoginForm;
