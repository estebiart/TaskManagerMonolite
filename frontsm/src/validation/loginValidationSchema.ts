import * as Yup from 'yup';
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
  });