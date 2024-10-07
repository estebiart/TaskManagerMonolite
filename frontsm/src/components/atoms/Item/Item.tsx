import React from 'react';
import { ItemProps } from './ItemProps.types';

const ItemComponent: React.FC<ItemProps> = ({ item }) => {

  return (
    <div className='home__list__card' >
      <h3 className='home__card__title'>{item.title}</h3>
      <p>{item.description || "Descripción no disponible."}</p>
      <p>Fecha límite: {item.deadline}</p>
      <p>Estado: {item.status}</p>
      {item.priority && <p>Prioridad: {item.priority}</p>}
    </div>
  );
};

export default ItemComponent;
