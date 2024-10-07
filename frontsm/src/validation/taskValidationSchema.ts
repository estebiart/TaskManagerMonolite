import * as Yup from 'yup';
export const taskValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().nullable(),
    deadline: Yup.string().required('Deadline is required'), 
    state: Yup.string().required('Status is required').oneOf(['pending', 'in_progress', 'completed']),
    priority: Yup.string().nullable().oneOf(['low', 'medium', 'high']),
  });