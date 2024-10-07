"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState, AppDispatch } from '@/redux/store/store'; 
import { fetchItemsAsync, addItemAsync } from '@/redux/slices/itemSlice'; 
import { ItemList } from '../components/molecules/ItemList';
import { Item } from '../interfaces/Item.interface';
import { Typography } from '../components/atoms/Typography'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';


/**
 * Componente principal de la aplicacion que muestra una lista de tareas 
 * y permite agregar una nueva.
 *
 * @returns Un JSX.Element que representa el componente principal de la 
 * aplicacion.
 */
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items); 
  const [currentItem, setCurrentItem] = useState<Item | null>(null);


  useEffect(() => {
    dispatch(fetchItemsAsync()); 
  }, [dispatch]);

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
        <Typography 
          text="Registate o inicia Sesión" 
          tag="h1" 
          className="home__title" 
        />
        <Link href="/register">Ir a Registro</Link>
        <Link href="/login">Ir a Login</Link>
      </div>
      
      <div className='home__list'>
          <Typography 
            text="TODAS LAS TAREAS" 
            tag="h2" 
            className="home__list__title" 
          />
          <ItemList items={currentItem ? [currentItem] : items} />      
        </div>
    </div>
  );
};

export default Home;
