
export interface Item {
  id: number;
  title: string;
  description?: string; 
  deadline: string; 
  status: 'pending' | 'in_progress' | 'completed'; 
  priority?: 'low' | 'medium' | 'high';
}

export interface AddItemPayload {
  title: string;
  description?: string; 
  deadline: string; 
  status: 'pending' | 'in_progress' | 'completed'; 
  priority?: 'low' | 'medium' | 'high'; 
}

export interface ItemState {
  items: Item[];
  status: 'inactivo' | 'cargando' | 'completado' | 'fallido';
  error: string | null;
}
