import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { registerService } from '../../../services/registerService'; 
import { registervalidationSchema } from '@/validation/registerValidationSchema';
import { RegisterFormValues } from '@/interfaces/RegisterForm.interface';
import { useRouter } from 'next/navigation';

  /**
   * Registration form.
   * This form allows users to register in the application.
   * The form uses React Hook Form to handle the fields and validation.
   * Validation is done using Yup.
   * The form sends a POST request to the register API with the form data.
   * If the request is successful, a confirmation message is shown.
   * If the request fails, an error message is shown.
   * @returns A JSX element representing the registration form.
   */
const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
	formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registervalidationSchema),
  });
  const router = useRouter();
  /**
   * Handles the submission of the registration form.
   * This function is called when the user submits the form.
   * It sends a POST request to the register API with the form data.
   * If the request is successful, a confirmation message is shown in the console.
   * If the request fails, an error message is shown in the console and the error is set in the form.
   * @param data The form data
   */
  const onSubmit = async (data: RegisterFormValues) => {
    const payload = {
      email: data.email,
      first_name: data.firstname, 
      last_name: data.lastname,  
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    try {
      const result = await registerService(payload);
      console.log('Registro exitoso:', result);
	  router.push('/login');
    } catch (error: any) {
      console.error('Error al registrar:', error.message);
      setError('server', {
        type: 'manual',
        message: error.message || 'Error desconocido al registrar', 
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
        className="register-form__input"
      />

      <Input
        name="firstname"
        placeholder="Nombre"
        register={register}
        errors={errors}
        className="register-form__input"
      />
      <Input
        name="lastname"
        placeholder="Apellido"
        register={register}
        errors={errors}
        className="register-form__input"
      />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
        register={register}
        errors={errors}
        className="register-form__input"
      />
      <Input
        name="password_confirmation"
        type="password"
        placeholder="Confirmar contraseña"
        register={register}
        errors={errors}
        className="register-form__input"
      />
      {errors.server && (
        <div className="error-message">
          {errors.server.message} 
        </div>
      )}
      <Button 
	   text='Registrar'
	   isDisabled={(!isValid && isSubmitted) || isSubmitting || status === 'cargando'}
	   isSubmitting={isSubmitting}>Registrar</Button>
    </form>
  );
};

export default RegisterForm;
