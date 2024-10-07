import * as Yup from 'yup';
export const registervalidationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    firstname: Yup.string().required('Nombre es requerido'),
    lastname: Yup.string().required('Apellido es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es requerida'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirmación de contraseña es requerida'),
  });