import React, { useEffect, useState } from 'react';
import ItemComponent from '../../atoms/Item/Item';
import { fetchItems, items$, pagination$ } from '@/services/itemService';

const ItemList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [filters, setFilters] = useState<{ status?: string; priority?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await fetchItems(currentPage, filters.status, filters.priority);
      setTasks(fetchedTasks);
    };

    fetchData();
  }, [currentPage, filters]);

  useEffect(() => {
    const subscription = pagination$.subscribe(setPagination);
    return () => subscription.unsubscribe();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select
          name="status"
          onChange={handleFilterChange}
          value={filters.status || ''}
          className="p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-blue-200"
        >
          <option value="">Todos los Estados</option>
          <option value="completed">Completado</option>
          <option value="pending">Pendiente</option>
        </select>
        <select
          name="priority"
          onChange={handleFilterChange}
          value={filters.priority || ''}
          className="p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-blue-200"
        >
          <option value="">Todas las Prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {/* Lista de Tareas */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <ItemComponent key={task.id} item={task} />
        ))}
      </div>

      {/* Paginador */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: pagination.last_page }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`mx-1 px-4 py-2 rounded-md transition-colors duration-200 
              ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}
              ${currentPage === index + 1 ? 'cursor-default' : 'cursor-pointer'}
              ${currentPage === index + 1 ? '' : 'hover:bg-blue-100'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
