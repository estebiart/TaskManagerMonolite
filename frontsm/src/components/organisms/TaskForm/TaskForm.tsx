import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store/store'; 
import { addItemAsync } from '@/redux/slices/itemSlice';
import { Input } from '../../atoms/Input';
import { TextArea } from '../../atoms/TextArea'; 
import { Button } from '../../atoms/Button'; 
import { taskValidationSchema } from '@/validation/taskValidationSchema';
import { FormValues } from '@/interfaces/FormValues.interface';


/**
 * Form to add tasks.
 * The form uses react-hook-form to handle the fields and validation.
 * Validation is done with Yup.
 * The form sends a POST request to the API to add tasks with the form data.
 * If the request is successful, a confirmation message is shown.
 * If the request fails, an error message is shown.
 * @returns A JSX that represents the form to add tasks.
 */
const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.items);

  const userId = useSelector((state: RootState) => state.user.id); 
  const {
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting, isSubmitted, isValid }
  } = useForm<FormValues>({
    resolver: yupResolver(taskValidationSchema),
    mode: 'onSubmit',
  });

  /**
   * Handle the submission of the form.
   * The form sends a POST request to the API to add tasks with the form data.
   * The request is sent using the useDispatch hook from react-redux.
   * If the request is successful, a confirmation message is shown.
   * If the request fails, an error message is shown.
   * @param data The form data
   */
  const handleFormSubmit = async (data: FormValues) => {
    const taskData = {
      ...data,
      user_id: userId, 
    };
    await dispatch(addItemAsync(taskData)); 
    reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input 
        name="title"
        placeholder="Titulo"
        register={register}
        errors={errors}
        className="task-form__input"
      />
      
      <TextArea 
        name="description"
        placeholder="Descripcion"
        register={register}
        errors={errors}
        className="task-form__textarea"
      />

      <Input 
        name="deadline"
        type="date" 
        register={register}
        errors={errors}
        className="task-form__input"
      />

      <select {...register('status')}>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>

      <select {...register('priority')}>
        <option value="">Seleccione Prioridad</option>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <Button
	    text='Agregar Tarea'
        isSubmitting={isSubmitting} 
        isDisabled={(!isValid && isSubmitted) || isSubmitting || status === 'cargando'}
      >
        {status === 'cargando' ? 'Agregando...' : 'Agregar Tarea'}
      </Button>

      {status === 'completado' && <p>Tarea agregada exitosamente!</p>}
      {status === 'fallido' && <p>Error: {error}</p>}
    </form>
  );
};

export default TaskForm;

