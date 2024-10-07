import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Item } from '../../../interfaces/Item.interface';
import { ItemFormProps } from './ItemForm.types';
import { Input } from '../../atoms/Input';
import { TextArea } from '../../atoms/TextArea';
import { Button } from '../../atoms/Button';


/**
 * Form to add items.
 * The form uses react-hook-form to handle the fields and validation.
 * Validation is done with Yup.
 * The form sends a POST request to the API to add items with the form data.
 * If the request is successful, a confirmation message is shown.
 * If the request fails, an error message is shown.
 * @returns A JSX that represents the form to add items.
 */
const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
  });

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting, isSubmitted, isValid } 
  } = useForm<Omit<Item, 'id'>>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit', 
  });

  /**
   * Handles the submission of the form.
   * This function is called when the user submits the form.
   * It sends a POST request to the API to add items with the form data.
   * If the request is successful, a confirmation message is shown.
   * If the request fails, an error message is shown.
   * @param data The form data
   */
  const handleFormSubmit = async (data: Omit<Item, 'id'>) => {
    await onSubmit(data);
    reset(); 
  };

  return (
    <form className='home__form' onSubmit={handleSubmit(handleFormSubmit)}>
      <Input 
        name="title"
        placeholder="Title"
        register={register}
        errors={errors}
        className="home__input"
      />
      
      <TextArea 
        name="body"
        placeholder="Body"
        register={register}
        errors={errors}
        className="home__textarea"
      />

      <Button
        isSubmitting={isSubmitting} 
        isDisabled={(!isValid && isSubmitted) || isSubmitting} 
      />
    </form>
  );
};

export default ItemForm;
