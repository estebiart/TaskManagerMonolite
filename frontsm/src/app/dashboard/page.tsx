"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState, AppDispatch } from '@/redux/store/store'; 
import { fetchUserItemsAsync, addItemAsync } from '@/redux/slices/itemSlice'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import TaskForm from '@/components/organisms/TaskForm/TaskForm';
import { Item } from '@/interfaces/Item.interface';
import { Typography } from '@/components/atoms/Typography';
import { ItemList } from '@/components/molecules/ItemList';
import { LogoutButton } from '@/components/atoms/LogoutButton';


const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items); 
  const userId = useSelector((state: RootState) => state.user.id);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {

    if (userId) {
      dispatch(fetchUserItemsAsync(userId)); 
    }
  }, [dispatch, userId]);

  const handleAddItem = async (data: Omit<Item, 'id'>) => {
    try {
      const newItem = await dispatch(addItemAsync(data)).unwrap(); 
      setCurrentItem(newItem);
    } catch (error) {
      console.error("Error adding item:", error); 
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className='home'>
      <div className='home__container' data-aos="fade-up">
      <LogoutButton/>
        <Typography 
          text="Agregar nuevas tareas" 
          tag="h1" 
          className="home__title" 
        />
        <TaskForm /> 
      </div>
      
      <div className='home__list'>
        <Typography 
          text="Tus Tareas" 
          tag="h2" 
          className="home__list__title" 
        />
        <ItemList items={currentItem ? [currentItem] : items} />
      </div>
    </div>
  );
};

export default DashboardPage;
